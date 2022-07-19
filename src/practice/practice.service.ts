
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException
} from '@nestjs/common';
//user imports
import { getYearDate } from 'src/lib/helper';
import PracticeInput from './dto/practice-input.dto';
import { Practice } from './entities/practice.entity';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticesPayload } from './dto/practices-payload.dto';
import { UsersService } from 'src/users/services/users.service';
import { CreatePracticeInput } from './dto/create-practice.input';
import { StaffService } from 'src/providers/services/staff.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { FacilityService } from 'src/facilities/services/facility.service';
import { RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { File } from '../aws/dto/file-input.dto';
import { AttachmentsService } from 'src/attachments/services/attachments.service';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Practice)
    private practiceRepository: Repository<Practice>,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => StaffService))
    private readonly staffService: StaffService,
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService
  ) { }

  /**
   * Creates practice
   * @param createPracticeInput 
   * @returns practice 
   */
  async createPractice(createPracticeInput: CreatePracticeInput): Promise<Practice> {
    try {
      //check if already user exists
      const user = await this.usersService.findOneByEmail(createPracticeInput.registerUserInput.email)
      if (user) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'User associated with this email already exists',
        });
      }
      //creating practice
      const practiceInstance = this.practiceRepository.create(createPracticeInput.createPracticeItemInput)
      //create a facility 
      const facility = await this.facilityService.addFacility(createPracticeInput)
      practiceInstance.facilities = [facility]
      //save the practice
      const practice = await this.practiceRepository.save(practiceInstance)
      const allRoles = await this.usersService.findAllRoles()
      const doctorRole = allRoles.find((item) => item.role === 'doctor')
      const adminRole = allRoles.find((item) => item.role === 'practice-admin')
      //create a user or provider based on its role type under this facility
      if (createPracticeInput.registerUserInput.roleType === doctorRole.role) {
        const registerUserInput: RegisterUserInput = { ...createPracticeInput.registerUserInput }
        const doctor = await this.doctorService.addDoctor(createPracticeInput, facility.id, practice.id)
        if (createPracticeInput.registerUserInput.isAdmin) {
          await this.usersService.updateUserRole({ id: doctor.user.id, roles: [adminRole.role, registerUserInput.roleType] })
        }
      } else {
        const registerUserInput: RegisterUserInput = { ...createPracticeInput.registerUserInput }
        const staff = await this.staffService.addStaff(registerUserInput, facility.id, practice.id)
        if (createPracticeInput.registerUserInput.isAdmin) {
          await this.usersService.updateUserRole({ id: staff.user.id, roles: [adminRole.role, registerUserInput.roleType] })
        }
      }
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all practices
   * @param practiceInput 
   * @returns all practices 
   */
  async findAllPractices(practiceInput: PracticeInput): Promise<PracticesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Practice>(this.practiceRepository, practiceInput)
      return {
        pagination: {
          ...paginationResponse
        },
        practices: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Practice> {
    const practice = await this.practiceRepository.findOne(id);
    if (practice) {
      return practice
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Practice not found',
    });
  }


  /**
   * Gets practice
   * @param id 
   * @returns practice 
   */
  async getPractice(id: string): Promise<PracticePayload> {
    const practice = await this.findOne(id);
    if (practice) {
      return { practice }
    }
  }

  /**
   * Updates practice
   * @param updatePracticeInput 
   * @returns practice 
   */
  async updatePractice(updatePracticeInput: UpdatePracticeInput): Promise<Practice> {
    try {
      const practice = await this.practiceRepository.save(updatePracticeInput)
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes practice
   * @param { id } 
   */
  async removePractice({ id }: RemovePractice) {
    try {
      await this.practiceRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * All practices
   * @returns  
   */
  async allPractices(id?: string) {
    return await this.practiceRepository.find({ select: ['id', 'name'], where: id ? { id } : {} })
  }

  /**
   * Gets active practices
   * @returns active practices 
   */
  async getActivePractices(): Promise<number> {
    return await this.practiceRepository.count({ where: { active: true } })
  }


  /**
   * Gets inactive practices
   * @returns inactive practices 
   */
  async getInactivePractices(): Promise<number> {
    return await this.practiceRepository.count({ where: { active: false } })
  }

  async getMonthsPractice(date: number): Promise<Practice[]> {
    try {
      const { endDate, startDate } = getYearDate(date)
      const data = await this.practiceRepository
        .createQueryBuilder('practice')
        .where('practice.createdAt >= :after', { after: startDate })
        .andWhere('practice.createdAt < :before', { before: endDate })
        .getMany();
      return data
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }

  /**
* Updates practice media
* @param file 
* @param updateAttachmentMediaInput 
* @returns practice media 
*/
  async updatePracticeMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PracticePayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.PRACTICE
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const practice = await this.practiceRepository.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { practice }
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Uploads practice media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns practice media 
   */
  async uploadPracticeMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PracticePayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.PRACTICE;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const practice = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { practice };
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets practice media
   * @param id 
   * @returns  
   */
  async getPracticeMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes practice media
   * @param id 
   * @returns  
   */
  async removePracticeMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
}
