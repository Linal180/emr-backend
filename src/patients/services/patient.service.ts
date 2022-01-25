import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { ContactService } from 'src/providers/services/contact.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import { File } from '../../aws/dto/file-input.dto';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreatePatientInput } from '../dto/create-patient.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientProvider } from '../dto/update-patient-provider.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { RemovePatient } from '../dto/update-patientItem.input';
import { Patient } from '../entities/patient.entity';
import { EmployerService } from './employer.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
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
      //create patient 
      const patientInstance = await this.patientRepository.create(createPatientInput.createPatientItemInput)
      //get facility 
      const facility = await this.facilityService.findOne(createPatientInput.createPatientItemInput.facilityId)
      patientInstance.facility = facility
      //get doctor 
      const doctor = await this.doctorService.findOne(createPatientInput.createPatientItemInput.usualProviderId)
      //adding usual provider with patient
      patientInstance.usualProvider = [doctor]
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
    try {
      const patientInstance = await this.findOne(updatePatientProvider.patientId)
      const doctor = await this.doctorService.findOne(updatePatientProvider.providerId)
      const updatedProviders = patientInstance.usualProvider
      updatedProviders.push(doctor)
      patientInstance.usualProvider = updatedProviders;
      return await this.patientRepository.save(patientInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  async getUsualProvider(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async GetPatient(id: string): Promise<PatientPayload> {
    const patient = await this.findOne(id);
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
        await this.usersService.remove(patient.user.id)
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

    async getPatientMedia(id: string) {
      try {
        return await this.attachmentsService.getMedia(id)
      }
      catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  

}
