import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
//user import
import { AttachmentsService } from 'src/attachments/services/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { UsersService } from 'src/users/services/users.service';
import { UtilsService } from 'src/util/utils.service';
import { FacilityService } from '../../facilities/services/facility.service';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
import { CreateStaffInput } from '../dto/create-staff.input';
import StaffInput from '../dto/staff-input.dto';
import { DisableStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';
import { Staff } from '../entities/staff.entity';
import { File } from 'src/aws/dto/file-input.dto';
import { DoctorService } from './doctor.service';
import { PracticeService } from 'src/practice/practice.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly connection: Connection,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => PracticeService))
    private readonly practiceService: PracticeService,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService,
  ) { }

  /**
   * Creates staff
   * @param createStaffInput 
   * @returns staff 
   */
  async createStaff(createStaffInput: CreateStaffInput): Promise<Staff> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { staffInput } = createStaffInput
      const { practiceId } = staffInput
      // register staff as user 
      const user = await this.usersService.create(createStaffInput.staffInput)
      //get facility 
      const facility = await this.facilityService.findOne(createStaffInput.staffInput.facilityId)
      // Staff Creation
      const providers = await this.doctorService.getDoctors(createStaffInput.providers)
      const staffInstance = this.staffRepository.create(createStaffInput.staffInput)
      //get practice
      if (practiceId) {
        const practice = await this.practiceService.findOne(practiceId)
        staffInstance.practice = practice
      }
      staffInstance.providers = providers
      staffInstance.user = user;
      staffInstance.facility = facility;
      staffInstance.facilityId = facility.id
      const staff = await queryRunner.manager.save(staffInstance);
      await this.usersService.saveUserId(staff.id, user);
      await queryRunner.commitTransaction();
      return staff
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates staff
   * @param UpdateStaffInput 
   * @returns staff 
   */
  async updateStaff(updateStaffInput: UpdateStaffInput): Promise<Staff> {
    try {
      const { updateStaffItemInput, providers } = updateStaffInput
      const { id, ...rest } = updateStaffItemInput
      const staff = await this.utilsService.updateEntityManager(Staff, id, rest, this.staffRepository)
      const staffInstance = await this.findOne(id)
      if (!staffInstance) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Staff not found or disabled',
        });
      }
      const userInstance = await this.usersService.findUserByUserId(staffInstance?.id)
      //update primary contact in user's model 
      if (userInstance?.id) {
        const { email, facilityId, phone } = updateStaffItemInput
        await this.usersService.updateUserInfo({ id: userInstance?.id, email, facilityId, phone })
      }
      // get providers
      if (providers) {
        const providerInstances = await this.doctorService.getDoctors(providers)
        staffInstance.providers = providerInstances
        return this.staffRepository.save(staffInstance)
      }
      return staff
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Adds staff
   * @param registerUserInput 
   * @param facilityId 
   * @returns staff 
   */
  async addStaff(registerUserInput: RegisterUserInput, facilityId: string, practiceId: string): Promise<Staff> {
    try {
      // register staff as user 
      const user = await this.usersService.create({ ...registerUserInput, facilityId })
      //get facility 
      const facility = await this.facilityService.findOne(facilityId)
      // Staff Creation
      const staffInstance = this.staffRepository.create({ ...registerUserInput, practiceId })
      staffInstance.user = user;
      staffInstance.facility = facility;
      staffInstance.facilityId = facility.id
      const staff = await this.staffRepository.save(staffInstance)
      await this.usersService.saveUserId(staff.id, user);
      return staff
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all staff
   * @param staffInput 
   * @returns all staff 
   */
  async findAllStaff(staffInput: StaffInput): Promise<AllStaffPayload> {
    try {
      const [first] = staffInput.searchString ? staffInput.searchString.split(' ') : ''
      const paginationResponse = await this.paginationService.willPaginate<Staff>(this.staffRepository, { ...staffInput, associatedTo: 'Staff', associatedToField: { columnValue: first, columnName: 'firstName', columnName2: 'lastName', columnName3: 'email', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        allstaff: paginationResponse.data,
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
  async findOne(id: string): Promise<Staff> {
    return await this.staffRepository.findOne(id);
  }

  /**
   * Gets staff
   * @param id 
   * @returns staff 
   */
  async getStaff(id: string): Promise<Staff> {
    const staff = await this.findOne(id);
    if (staff) {
      return staff
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Staff not found or disabled',
    });
  }

  /**
   * Finds oneby username
   * @param username 
   * @returns oneby username 
   */
  async findOnebyUsername(username: string): Promise<Staff> {
    return await this.staffRepository.findOne({ username });
  }

  /**
   * Finds staff by practice id
   * @param practiceId 
   * @returns staff by practice id 
   */
  async findStaffByPracticeId(practiceId: string): Promise<Staff[]> {
    return await this.staffRepository.find({ practiceId });
  }

  /**
   * Removes staff
   * @param { id } 
   */
  async removeStaff({ id }: RemoveStaff) {
    try {
      const staff = await this.findOne(id)
      if (staff) {
        await this.staffRepository.delete(id)
        const user = await this.usersService.findUserByUserId(staff?.id)
        await this.usersService.remove(user?.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Staff not found or disabled',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Disables staff
   * @param { id } 
   */
  async disableStaff({ id }: DisableStaff) {
    try {
      await this.usersService.deactivateUser(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one by email
   * @param email 
   * @returns one by email 
   */
  async findOneByEmail(email: string): Promise<Staff> {
    return await this.staffRepository.findOne({ email: email });
  }

  /**
   * Uploads staff media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns staff media 
   */
  async uploadStaffMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<Staff> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.STAFF;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const staff = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return staff
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
   * Removes staff media
   * @param id 
   * @returns  
   */
  async removeStaffMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates staff media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns staff media 
   */
  async updateStaffMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<Staff> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.DOCTOR
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const staff = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return staff
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
   * Gets staff media
   * @param id 
   * @returns  
   */
  async getStaffMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
