import { ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
//user imports
import { File } from 'src/aws/dto/file-input.dto';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { CreatePracticeInput } from 'src/practice/dto/create-practice.input';
import { UsersService } from 'src/users/services/users.service';
import { UtilsService } from 'src/util/utils.service';
import { FacilityService } from '../../facilities/services/facility.service';
import { AllDoctorPayload } from '../dto/all-doctor-payload.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import DoctorInput from '../dto/doctor-input.dto';
import { DoctorPayload } from '../dto/doctor-payload.dto';
import { UpdateDoctorInput } from '../dto/update-doctor.input';
import { DisableDoctor, RemoveDoctor } from '../dto/update-doctorItem.input';
import { Doctor } from '../entities/doctor.entity';
import { BillingAddressService } from './billing-address.service';
import { ContactService } from './contact.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
import { createToken } from 'src/lib/helper';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => BillingAddressService))
    private readonly billingAddressService: BillingAddressService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService,
    private readonly mailerService: MailerService,
  ) { }

  /**
   * Creates doctor
   * @param createDoctorInput 
   * @returns doctor 
   */
  async createDoctor(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email } = createDoctorInput.createContactInput
      let prevDoctor = null
      if (email) {
        prevDoctor = await this.findOneByEmail(email)
      }
      if (prevDoctor) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'Provider is already exist with this email'
        })
      } else {
        // register doctor as user -
        const user = await this.usersService.create({ ...createDoctorInput.createDoctorItemInput, email, roleType: 'doctor' })
        //get facility 
        const facility = await this.facilityService.findOne(createDoctorInput.createDoctorItemInput.facilityId)
        // Doctor Creation
        const doctorInstance = this.doctorRepository.create({ ...createDoctorInput.createDoctorItemInput, email })
        doctorInstance.user = user;
        doctorInstance.facility = facility;
        doctorInstance.facilityId = facility.id
        doctorInstance.practiceId = facility.practiceId
        //adding contact
        if (createDoctorInput.createContactInput) {
          const contact = await this.contactService.createContact(createDoctorInput.createContactInput)
          doctorInstance.contacts = [contact]
        }
        //adding billing address details
        if (createDoctorInput.createBillingAddressInput) {
          const billingAddress = await this.billingAddressService.createBillingAddress(createDoctorInput.createBillingAddressInput)
          doctorInstance.billingAddress = [billingAddress]
        }
        const doctor = await queryRunner.manager.save(doctorInstance);
        await this.usersService.saveUserId(doctor.id, user);
        await queryRunner.commitTransaction();

        return doctor
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates doctor
   * @param updateDoctorInput 
   * @returns doctor 
   */
  async updateDoctor(updateDoctorInput: UpdateDoctorInput): Promise<Doctor> {
    try {
      const { email } = updateDoctorInput.updateContactInput
      const { id } = updateDoctorInput.updateDoctorItemInput
      const { email: providerEmail } = await this.findOne(id)
      const user = await this.usersService.findUserByUserId(id)
      const userExist = await this.usersService.findOneByEmail(email)

      let prevDoctor = null
      const isNewEmail = !!email && email !== providerEmail


      if (isNewEmail) {
        prevDoctor = await this.findOneByEmail(email)
      }

      if (prevDoctor || (userExist && userExist?.email !== user?.email)) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'Provider is already exist with this email'
        })
      } else {
        const doctor = await this.doctorRepository.save({ ...updateDoctorInput.updateDoctorItemInput, email })
        //updating contact details
        await this.contactService.updateContact(updateDoctorInput.updateContactInput)
        //updating billing details
        await this.billingAddressService.updateBillingAddress(updateDoctorInput.updateBillingAddressInput)
        //update primary contact in user's model 
        const user = await this.usersService.findUserByUserId(updateDoctorInput.updateDoctorItemInput.id)
        await this.usersService.updateUserInfo({ phone: updateDoctorInput.updateContactInput.phone, email, id: user.id })

        if (isNewEmail) {
          let isAdmin = false
          let isInvite = 'INVITATION_TEMPLATE_ID';
          let userInstance = await this.usersService.update({ ...user, email, emailVerified: false });
          if (!userInstance.token) {
            userInstance = await this.usersService.update({ ...userInstance, token: createToken() });
          }
          const token = userInstance.token || createToken()
          this.mailerService.sendEmailForgotPassword(userInstance.email, user.id, userInstance.email, '', isAdmin, userInstance.token, isInvite)
        }
        return doctor
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addDoctor(createPracticeInput: CreatePracticeInput, facilityId: string, practiceId: string): Promise<Doctor> {
    try {
      // register doctor as user 
      const user = await this.usersService.create({ ...createPracticeInput.registerUserInput, facilityId, roleType: 'doctor' })
      //get facility 
      const facility = await this.facilityService.findOne(facilityId)
      //get contact 
      const contact = await this.contactService.createContact(createPracticeInput.createContactInput)
      // Doctor Creation    
      const doctorInstance = this.doctorRepository.create({ ...createPracticeInput.registerUserInput, practiceId })
      doctorInstance.user = user;
      doctorInstance.contacts = [contact];
      doctorInstance.facility = facility;
      doctorInstance.facilityId = facility.id
      doctorInstance.practiceId = facility.practiceId
      const doctor = await this.doctorRepository.save(doctorInstance)
      await this.usersService.saveUserId(doctor.id, user);
      return doctor
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Params doctor service
   * @param doctorInput 
   * @returns all doctor 
   */
  async findAllDoctor(doctorInput: DoctorInput): Promise<AllDoctorPayload> {
    try {
      const [first] = doctorInput.searchString ? doctorInput.searchString.split(' ') : ''
      const paginationResponse = await this.paginationService.willPaginate<Doctor>(this.doctorRepository, { ...doctorInput, associatedTo: 'Doctor', associatedToField: { columnValue: first, columnName: 'firstName', columnName2: 'lastName', columnName3: 'email', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        doctors: paginationResponse.data,
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
  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneOrFail(id);
    if (doctor) {
      return doctor
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Doctor not found or disabled',
    });
  }


  /**
   * Gets doctor
   * @param id 
   * @returns doctor 
   */
  async getDoctor(id: string): Promise<Doctor> {
    return await this.findOne(id);
  }


  /**
   * Gets doctors
   * @param providerIds 
   * @returns doctors 
   */
  async getDoctors(providerIds: string[]): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      where: {
        id: In(providerIds)
      }
    });
  }

  /**
   * Finds one
   * @param email
   * @returns doctor 
   */
  async findOneByEmail(email: string): Promise<Doctor> {
    return await this.doctorRepository.findOne({ email });
  }

  /**
   * Removes doctor
   * @param { id } 
   */
  async removeDoctor({ id }: RemoveDoctor) {
    try {
      const doctor = await this.doctorRepository.findOne(id)
      if (doctor) {
        await this.doctorRepository.delete(id)
        await this.usersService.remove(doctor.user.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Doctor not found or disabled',
      });

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Disables doctor
   * @param { id } 
   */
  async disableDoctor({ id }: DisableDoctor) {
    try {
      await this.usersService.deactivateUser(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Uploads doctor media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns doctor media 
   */
  async uploadDoctorMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<DoctorPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.DOCTOR;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const doctor = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { doctor };
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
   * Removes doctor media
   * @param id 
   * @returns  
   */
  async removeDoctorMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets doctor media
   * @param id 
   * @returns  
   */
  async getDoctorMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates doctor media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns doctor media 
   */
  async updateDoctorMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<DoctorPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.DOCTOR
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const doctor = await this.doctorRepository.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { doctor }
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
}
