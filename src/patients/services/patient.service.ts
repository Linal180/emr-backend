import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExternalAppointmentInput } from 'src/appointments/dto/create-external-appointment.input';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { ContactService } from 'src/providers/services/contact.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Connection, Repository } from 'typeorm';
import { File } from '../../aws/dto/file-input.dto';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreatePatientInput } from '../dto/create-patient.input';
import { PatientInfoInput } from '../dto/patient-info.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientProvider } from '../dto/update-patient-provider.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { RemovePatient } from '../dto/update-patientItem.input';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Patient } from '../entities/patient.entity';
import { EmployerService } from './employer.service';
import { UserRole } from '../../users/entities/role.entity'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(DoctorPatient)
    private doctorPatientRepository: Repository<DoctorPatient>,
    private readonly paginationService: PaginationService,
    private readonly connection: Connection,
    private readonly employerService: EmployerService,
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    private readonly attachmentsService: AttachmentsService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates patient
   * @param createPatientInput 
   * @returns patient 
   */
  async createPatient(createPatientInput: CreatePatientInput): Promise<Patient> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //create user against patient
      const user = await this.usersService.create({ ...createPatientInput.createPatientItemInput, password: "admin@123", roleType: UserRole.PATIENT })
      console.log('User>>>', user)
      //create patient 
      const patientInstance = await this.patientRepository.create(createPatientInput.createPatientItemInput)
      patientInstance.patientRecord = await this.utilsService.generateString(8);
      //get facility 
      const facility = await this.facilityService.findOne(createPatientInput.createPatientItemInput.facilityId)
      patientInstance.facility = facility
      //get doctor 
      const doctor = await this.doctorService.findOne(createPatientInput.createPatientItemInput.usualProviderId)
      //creating doctorPatient Instance 
      const doctorPatientInstance = await this.doctorPatientRepository.create({
        doctorId: doctor.id,
        currentProvider: true,
      })
      doctorPatientInstance.doctor = doctor
      doctorPatientInstance.doctorId = doctor.id
      //adding usual provider with patient
      patientInstance.doctorPatients = [doctorPatientInstance]
      //create patient contact 
      const contact = await this.contactService.createContact(createPatientInput.createContactInput)
      //create patient emergency contact 
      const emergencyContact = await this.contactService.createContact(createPatientInput.createEmergencyContactInput)
      //create patient next of kin contact 
      const nextOfKinContact = await this.contactService.createContact(createPatientInput.createNextOfKinContactInput)
      //create patient guarantor contact 
      const guarantorContact = await this.contactService.createContact(createPatientInput.createGuarantorContactInput)
      //create patient guardian contact 
      const guardianContact = await this.contactService.createContact(createPatientInput.createGuardianContactInput)
      //create patient employer contact 
      const employerContact = await this.employerService.createEmployer(createPatientInput.createEmployerInput)
      patientInstance.employer = [employerContact]
      patientInstance.contacts = [contact, emergencyContact, nextOfKinContact, guarantorContact, guardianContact]
      patientInstance.user = user;
      const patient = await queryRunner.manager.save(patientInstance);
      doctorPatientInstance.patient = patient
      doctorPatientInstance.patientId = patient.id
      await queryRunner.commitTransaction();
      await this.doctorPatientRepository.save(doctorPatientInstance)
      const updatedUser = await this.usersService.saveUserId(patient.id, user);
      console.log('updatedUser>>>', updatedUser)
      return patient
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
 * Updates patient
 * @param updatePatientInput 
 * @returns patient 
 */
  async updatePatient(updatePatientInput: UpdatePatientInput): Promise<Patient> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //save patient basic info
      await this.patientRepository.save(updatePatientInput.updatePatientItemInput)
      //fetch patient
      const patientInstance = await this.patientRepository.findOne(updatePatientInput.updatePatientItemInput.id)
      //get facility 
      const facility = await this.facilityService.findOne(updatePatientInput.updatePatientItemInput.facilityId)
      patientInstance.facility = facility
      //update patient contact 
      const contact = await this.contactService.updateContact(updatePatientInput.updateContactInput)
      //update patient emergency contact 
      const emergencyContact = await this.contactService.updateContact(updatePatientInput.updateEmergencyContactInput)
      //update patient next of kin contact 
      const nextOfKinContact = await this.contactService.updateContact(updatePatientInput.updateNextOfKinContactInput)
      //update patient guarantor contact 
      const guarantorContact = await this.contactService.updateContact(updatePatientInput.updateGuarantorContactInput)
      //update patient guardian contact 
      const guardianContact = await this.contactService.updateContact(updatePatientInput.updateGuardianContactInput)
      //update patient employer contact 
      const employerContact = await this.employerService.updateEmployer(updatePatientInput.updateEmployerInput)
      patientInstance.employer = [employerContact]
      patientInstance.contacts = [contact, emergencyContact, nextOfKinContact, guarantorContact, guardianContact]
      const patient = await queryRunner.manager.save(patientInstance);
      await queryRunner.commitTransaction();
      return patient
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates patient provider
   * @param updatePatientProvider 
   * @returns patient provider 
   */
  async updatePatientProvider(updatePatientProvider: UpdatePatientProvider): Promise<Patient> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //get patient
      const patient = await this.findOne(updatePatientProvider.patientId)
      if (patient) {
        //get previous Provider of patient
        const previousProvider = await this.doctorPatientRepository.findOne({ where: [{ doctorId: updatePatientProvider.providerId, patientId: updatePatientProvider.patientId, currentProvider: true }] })
        if (previousProvider) {
          return patient
        }
        //get currentProvider
        const currentProvider = await this.doctorPatientRepository.findOne({ where: [{ patientId: updatePatientProvider.patientId, currentProvider: true }] })
        if (currentProvider) {
          await this.doctorPatientRepository.save({ id: currentProvider.id, currentProvider: false })
        }
        const doctorPatientInstance = await this.doctorPatientRepository.create({ doctorId: updatePatientProvider.providerId, currentProvider: true, patientId: updatePatientProvider.patientId })
        await queryRunner.manager.save(doctorPatientInstance);
        await queryRunner.commitTransaction();
        return patient
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Patient not found',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Patients info
   * @param patientInfoInput 
   * @returns info 
   */
  async patientInfo(patientInfoInput: PatientInfoInput): Promise<Patient> {
    //get patient info
    const patientInstance = await this.patientRepository.findOne(patientInfoInput.patientInfoItemInput.id)
    //create patient contact 
    const contact = await this.contactService.createContact(patientInfoInput.createContactInput)
    //create patient emergency contact 
    const emergencyContact = await this.contactService.createContact(patientInfoInput.createEmergencyContactInput)
    patientInstance.contacts = [contact, emergencyContact]
    return await this.patientRepository.save(patientInstance)
  }

  /**
   * Finds all patients
   * @param patientInput 
   * @returns all patients 
   */
  async findAllPatients(patientInput: PatientInput): Promise<PatientsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Patient>(this.patientRepository, patientInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patients: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Usuals provider
   * @param id 
   * @returns provider 
   */
  async usualProvider(id: string): Promise<DoctorPatient[]> {
    const usualProvider = await this.doctorPatientRepository.find({
      where: {
        patientId: id
      },
      order: { createdAt: "ASC" },
      relations: ["doctor"]
    })
    console.log("usualProvider", usualProvider);
    return usualProvider
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  /**
   * Gets usual provider
   * @param id 
   * @returns usual provider 
   */
  async getUsualProvider(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  /**
   * Adds patient
   * @param createPatientItemInput 
   * @returns patient 
   */
  async addPatient(createExternalAppointmentInput: CreateExternalAppointmentInput): Promise<Patient> {
    const patientInstance = this.patientRepository.create(createExternalAppointmentInput.createPatientItemInput)
    patientInstance.patientRecord = await this.utilsService.generateString(10);
    const usualProvider = await this.doctorService.findOne(createExternalAppointmentInput.createPatientItemInput.usualProviderId)
    //creating doctorPatient Instance 
    const doctorPatientInstance = await this.doctorPatientRepository.create({
      doctorId: usualProvider.id,
      currentProvider: true,
    })
    doctorPatientInstance.doctor = usualProvider
    doctorPatientInstance.doctorId = usualProvider.id
    //adding usual provider with patient
    patientInstance.doctorPatients = [doctorPatientInstance]
    const guardianContact = await this.contactService.createContact(createExternalAppointmentInput.createGuardianContactInput)
    patientInstance.contacts = [guardianContact]
    const patient = await this.patientRepository.save(patientInstance)
    doctorPatientInstance.patient = patient
    doctorPatientInstance.patientId = patient.id
    await this.doctorPatientRepository.save(doctorPatientInstance)
    return patient
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async GetPatient(id: string): Promise<PatientPayload> {
    const patient = await this.findOne(id);
    console.log("patient", patient);
    if (patient) {
      return { patient }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient not found',
    });
  }

  /**
   * Removes patient
   * @param { id } 
   */
  async removePatient({ id }: RemovePatient) {
    try {
      const patient = await this.findOne(id)
      if (patient) {
        await this.patientRepository.delete(patient.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Patient not found or disabled',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Uploads patient media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns request media 
   */
  async uploadPatientMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.PATIENT;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      const patient = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { patient };
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
  * Updates patient media
  * @param file 
  * @param updateAttachmentMediaInput 
  * @returns patient media 
  */
  async updatePatientMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<PatientPayload> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.PATIENT
      const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
      const patient = await this.patientRepository.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return { patient }
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
 * Removes patient media
 * @param id 
 * @returns  
 */
  async removePatientMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets patient media
   * @param id 
   * @returns  
   */
  async getPatientMedia(id: string) {
    try {
      return await this.attachmentsService.getMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
