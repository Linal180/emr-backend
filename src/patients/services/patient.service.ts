import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Connection, getConnection, Repository } from 'typeorm';
import {
  forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, ConflictException,
  PreconditionFailedException
} from '@nestjs/common';
//inputs
import { PatientInfoInput } from '../dto/patient-info.input';
import { RemovePatient } from '../dto/update-patientItem.input';
import { PatientInviteInput } from '../dto/patient-invite.input';
import { CreatePatientInput } from '../dto/create-patient.input';
import { UpdatePatientProfileInput } from '../dto/update-patient-profile.input';
import { GetFacilityPatientsInput } from 'src/facilities/dto/facility-input.dto';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { UpdatePatientPolicyHolderInput } from '../dto/update-patient-policyHolder.input';
import { UpdatePatientInput, UpdatePatientNoteInfoInputs } from '../dto/update-patient.input';
import { CreateExternalAppointmentInput } from 'src/appointments/dto/create-external-appointment.input';
import { PatientProviderInputs, UpdatePatientProvider, UpdatePatientProviderRelationInputs } from '../dto/update-patient-provider.input';
//entities
import { Patient } from '../entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
import { DoctorPatient, DoctorPatientRelationType } from '../entities/doctorPatient.entity';
//services
import { EmployerService } from './employer.service';
import { UtilsService } from 'src/util/utils.service';
import { MailerService } from 'src/mailer/mailer.service';
import { UsersService } from 'src/users/services/users.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ContactService } from 'src/providers/services/contact.service';
import { FacilityService } from '../../facilities/services/facility.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
//constants or enums
import { ATTACHMENT_TITLES, USER_TYPES } from '../../lib/constants'
import { createToken, paginateResponse } from 'src/lib/helper';
//dto's
import { File } from '../../aws/dto/file-input.dto';
import PatientInput from '../dto/patient-input.dto';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';


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
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService,
    private readonly utilsService: UtilsService,
    private readonly mailerService: MailerService
  ) { }

  patientMartialStatuses = [
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "S",
      "display": "Never Married",
      dbValue: "single"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "M",
      "display": "Married",
      dbValue: "maried"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "W",
      "display": "Widowed",
      dbValue: "Widowed"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "L",
      "display": "Legally Separated",
      dbValue: "Separated"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "D",
      "display": "Divorced",
      dbValue: "Divorced"
    },
  ]

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
      const { createContactInput } = createPatientInput
      const { email } = createContactInput || {}
      //create patient 
      let prevPatient = null;
      if (email) {
        prevPatient = await this.GetPatientByEmail(email);
      }
      if (!prevPatient) {
        const { dob } = createPatientInput?.createPatientItemInput || {}
        const transformedDob = dob ? moment(dob).format('MM-DD-YYYY') : ''
        const patientInstance = await this.patientRepository.create({ ...createPatientInput.createPatientItemInput, email, dob: transformedDob })
        patientInstance.patientRecord = await this.utilsService.generateString(8);
        //get facility 
        if (createPatientInput?.createPatientItemInput?.facilityId) {
          const facility = await this.facilityService.findOne(createPatientInput.createPatientItemInput.facilityId)
          if (facility) {
            patientInstance.facility = facility
            patientInstance.facilityId = facility.id
            patientInstance.practiceId = facility.practiceId
          }
        }

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

        //get doctor
        if (createPatientInput?.createPatientItemInput?.usualProviderId) {
          const doctor = await this.doctorService.findOne(createPatientInput.createPatientItemInput.usualProviderId)
          //creating doctorPatient Instance 
          const doctorPatientInstance = await this.doctorPatientRepository.create({
            currentProvider: true,
            relation: DoctorPatientRelationType.PRIMARY_PROVIDER
          })
          doctorPatientInstance.doctor = doctor
          doctorPatientInstance.patient = patient
          await this.doctorPatientRepository.save(doctorPatientInstance)
        }
        const updatedPatient = await queryRunner.manager.save(patient);
        return updatedPatient

      }

      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'patient is ready exist with this email'
      })

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
      const {
        updatePatientItemInput, updateContactInput, updateEmergencyContactInput, updateNextOfKinContactInput,
        updateGuarantorContactInput, updateGuardianContactInput, updateEmployerInput
      } = updatePatientInput
      const { id: patientId, usualProviderId, facilityId, email: patientEmail, dob, ...patientInfoToUpdate } = updatePatientItemInput
      const { email } = updateContactInput || {}

      let prevPatient = null;
      const patientInstance = await this.patientRepository.findOne(patientId)
      const patientUser = await this.usersService.findUserByUserId(patientId)
      let userExist = await this.usersService.findOneByEmail(email)
      const isNewEmail = !!email && email !== patientInstance?.email

      if (isNewEmail) {
        prevPatient = await this.GetPatientByEmail(email);
      }

      if (prevPatient || (userExist && userExist?.email !== patientUser?.email)) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          error: 'Email already taken'
        })
      } else {
        let user = await this.usersService.findUserByUserId(patientId)
        //save patient basic info
        const transformedDob = dob ? moment(dob).format("MM-DD-YYYY") : ''
        await this.utilsService.updateEntityManager(Patient, patientId, { ...patientInfoToUpdate, email, dob: transformedDob }, this.patientRepository)
        //get facility 
        const patientInstance = await this.patientRepository.findOne(patientId)

        if (facilityId) {
          const facility = await this.facilityService.findOne(facilityId)

          if (facility) {
            patientInstance.facility = facility
            patientInstance.facilityId = facility.id
            patientInstance.practiceId = facility.practiceId
          }

          if (user) {
            await this.usersService.updateFacility(facility, user)
          }
        }
        //update patient contact 
        const contacts = []
        if (updateContactInput) {
          const contact = await this.contactService.updateContact(updateContactInput)
          contacts.push(contact)
        }
        //update patient emergency contact 
        if (updateEmergencyContactInput) {
          const emergencyContact = await this.contactService.updateContact(updateEmergencyContactInput)
          contacts.push(emergencyContact)
        }
        //update patient next of kin contact 
        if (updateNextOfKinContactInput) {
          const nextOfKinContact = await this.contactService.updateContact(updateNextOfKinContactInput)
          contacts.push(nextOfKinContact)
        }
        //update patient guarantor contact 
        if (updateGuarantorContactInput) {
          const guarantorContact = await this.contactService.updateContact(updateGuarantorContactInput)
          contacts.push(guarantorContact)
        }
        //update patient guardian contact 
        if (updateGuardianContactInput) {
          const guardianContact = await this.contactService.updateContact(updateGuardianContactInput)
          contacts.push(guardianContact)
        }
        //update patient employer contact 
        if (updateEmployerInput) {
          const employerContact = await this.employerService.updateEmployer(updateEmployerInput)
          patientInstance.employer = [employerContact]
        }
        patientInstance.contacts = contacts
        //update patient's provider
        let doctor: Doctor | null = null
        if (usualProviderId) {
          doctor = await this.doctorService.findOne(usualProviderId)
          // const doctor = await this.doctorService.findOne(updatePatientInput.updatePatientItemInput.usualProviderId)
          //updating usual provider with patient
          const doctorPatientInst = await this.doctorPatientRepository.findOne({ patientId: patientId, doctorId: usualProviderId })
          if (doctorPatientInst) {
            doctorPatientInst.relation = DoctorPatientRelationType.PRIMARY_PROVIDER
            await this.doctorPatientRepository.update({ patientId: patientId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER }, { relation: DoctorPatientRelationType.OTHER_PROVIDER })
            await this.doctorPatientRepository.save(doctorPatientInst)
          } else {
            const doctorPatientInstance = await this.doctorPatientRepository.create({ relation: DoctorPatientRelationType.PRIMARY_PROVIDER })
            doctorPatientInstance.patient = patientInstance
            doctorPatientInstance.doctor = doctor
            await this.doctorPatientRepository.update({ patientId: patientId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER }, { relation: DoctorPatientRelationType.OTHER_PROVIDER })
            await this.doctorPatientRepository.save(doctorPatientInstance)
          }
        }
        //send email on updating the email
        if (isNewEmail && user) {
          const userInstance = await this.usersService.update({ ...user, email, emailVerified: false });
          const token = createToken();

          this.mailerService.sendEmailForgotPassword({
            token,
            isAdmin: true,
            userId: userInstance?.id,
            email: userInstance?.email,
            isInvite: 'PATIENT_PORTAL_INVITATION_TEMPLATE_ID',
            providerName: `${doctor?.firstName || ''} ${doctor?.lastName || ''}`,
            fullName: `${patientInstance?.firstName || ''} ${patientInstance?.lastName || ''}`,
          })

        }
        patientInstance.email = email
        const patient = await queryRunner.manager.save(patientInstance);
        await queryRunner.commitTransaction();
        return patient
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates patient by form builder
   * @param updatePatientInput 
   * @returns patient by form builder 
   */
  async updatePatientByFormBuilder(updatePatientInput: UpdatePatientInput): Promise<Patient> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {
        updatePatientItemInput, updateContactInput, updateEmergencyContactInput, updateNextOfKinContactInput,
        updateGuarantorContactInput, updateGuardianContactInput, updateEmployerInput
      } = updatePatientInput
      const { id: patientId, usualProviderId, facilityId, dob, ...patientInfoToUpdate } = updatePatientItemInput

      //save patient basic info
      const transformedDob = dob ? moment(dob).format('MM-DD-YYYY') : ''
      await this.utilsService.updateEntityManager(Patient, patientId, { ...patientInfoToUpdate, dob: transformedDob }, this.patientRepository)
      //fetch patient
      const patientInstance = await this.patientRepository.findOne(patientId)


      //get facility 
      if (facilityId) {
        const facility = await this.facilityService.findOne(facilityId)

        if (facility) {
          patientInstance.facility = facility
          patientInstance.facilityId = facility.id
          patientInstance.practiceId = facility.practiceId
        }

        const user = await this.usersService.findUserByUserId(patientId)
        if (user) {
          await this.usersService.updateFacility(facility, user)
        }
      }
      await this.contactService.removePatientContacts({ id: patientId })
      //update patient contact 
      const contacts = []
      if (updateContactInput) {
        const contact = await this.contactService.updateContact(updateContactInput)
        contacts.push(contact)
      }
      //update patient emergency contact 
      if (updateEmergencyContactInput) {
        const emergencyContact = await this.contactService.updateContact(updateEmergencyContactInput)
        contacts.push(emergencyContact)
      }
      //update patient next of kin contact 
      if (updateNextOfKinContactInput) {
        const nextOfKinContact = await this.contactService.updateContact(updateNextOfKinContactInput)
        contacts.push(nextOfKinContact)
      }
      //update patient guarantor contact 
      if (updateGuarantorContactInput) {
        const guarantorContact = await this.contactService.updateContact(updateGuarantorContactInput)
        contacts.push(guarantorContact)
      }
      //update patient guardian contact 
      if (updateGuardianContactInput) {
        const guardianContact = await this.contactService.updateContact(updateGuardianContactInput)
        contacts.push(guardianContact)
      }
      //update patient employer contact 
      if (updateEmployerInput) {
        const employer = await this.employerService.getEmployerByPatient(patientInstance.id)
        if (employer) {
          const employerContact = await this.employerService.updateEmployer({ ...updateEmployerInput, id: employer.id })
          patientInstance.employer = [employerContact]
        }
      }
      patientInstance.contacts = contacts
      if (usualProviderId) {
        const doctor = await this.doctorService.findOne(usualProviderId)
        // const doctor = await this.doctorService.findOne(updatePatientInput.updatePatientItemInput.usualProviderId)
        //updating usual provider with patient
        const doctorPatientInst = await this.doctorPatientRepository.findOne({ patientId: patientId, doctorId: usualProviderId })
        if (doctorPatientInst) {
          doctorPatientInst.relation = DoctorPatientRelationType.PRIMARY_PROVIDER
          await this.doctorPatientRepository.update({ patientId: patientId }, { relation: DoctorPatientRelationType.OTHER_PROVIDER })
          await this.doctorPatientRepository.save(doctorPatientInst)
        } else {
          const doctorPatientInstance = await this.doctorPatientRepository.create({ relation: DoctorPatientRelationType.PRIMARY_PROVIDER })
          doctorPatientInstance.patient = patientInstance
          doctorPatientInstance.doctor = doctor
          await this.doctorPatientRepository.update({ patientId: patientId }, { relation: DoctorPatientRelationType.OTHER_PROVIDER })
          await this.doctorPatientRepository.save(doctorPatientInstance)
        }
      }
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
   * Updates patient profile
   * @param updatePatientProfileInput 
   * @returns patient profile 
   */
  async updatePatientProfile(updatePatientProfileInput: UpdatePatientProfileInput): Promise<Patient> {
    try {
      const patientInstance = await this.findOne(updatePatientProfileInput.updatePatientProfileItemInput.id)
      //user registration input
      if (patientInstance) {
        await this.utilsService.updateEntityManager(Patient, updatePatientProfileInput.updatePatientProfileItemInput.id, updatePatientProfileInput.updatePatientProfileItemInput, this.patientRepository)
        const contact = await this.contactService.updateContact(updatePatientProfileInput.updateContactInput)
        patientInstance.contacts = [contact]
        return await this.patientRepository.save({ ...patientInstance, ...updatePatientProfileInput.updatePatientProfileItemInput })
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Patient not found',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient profile
   * @param updatePatientPolicyHolderInput 
   * @returns patient profile 
   */
  async updatePatientPolicyHolder(updatePatientPolicyHolderInput: UpdatePatientPolicyHolderInput) {
    try {
      const patientInstance = await this.findOne(updatePatientPolicyHolderInput.id)
      //user registration input
      if (patientInstance) {
        await this.utilsService.updateEntityManager(Patient, updatePatientPolicyHolderInput.id, updatePatientPolicyHolderInput, this.patientRepository)
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Sends invite to patient
   * @param patientInviteInput 
   * @returns invite to patient 
   */
  async sendInviteToPatient(patientInviteInput: PatientInviteInput): Promise<Patient> {
    try {
      const patientInstance = await this.findOne(patientInviteInput.id)
      const patientProviders = await this.usualProvider(patientInstance.id)
      const usualProvider = patientProviders?.find(({ relation }) => relation === DoctorPatientRelationType.PRIMARY_PROVIDER)
      //get patient role
      const allRoles = await this.usersService.findAllRoles()
      const patientRole = allRoles?.find(({ role }) => role === 'patient')
      //user registration input
      if (patientInstance && patientInstance?.email) {
        const { doctor } = usualProvider || {}
        const { firstName, lastName } = doctor || {}
        const { role } = patientRole || {}

        const inviteTemplateId = 'PATIENT_PORTAL_INVITATION_TEMPLATE_ID';

        const userAlreadyExist = await this.usersService.findOneByEmail(patientInstance.email)

        if (!userAlreadyExist) {
          const user = await this.usersService.create({
            firstName: patientInstance.firstName, lastName: patientInstance.lastName, email: patientInstance.email,
            password: "admin@123", roleType: role, adminId: patientInviteInput.adminId,
            facilityId: patientInstance.facilityId
          })
          patientInstance.user = user
          const patient = await this.patientRepository.save(patientInstance)
          await this.usersService.saveUserId(patient?.id, user);
          this.mailerService.sendEmailForgotPassword({
            isAdmin: true,
            userId: user?.id,
            email: user?.email,
            token: user?.token,
            isInvite: inviteTemplateId,
            fullName: `${patientInstance?.firstName || ''} ${patientInstance?.lastName || ''}`,
            providerName: `${firstName || ''} ${lastName || ''}`,
          })
          return patient
        } else {

          const token = createToken();
          userAlreadyExist.token = token;
          await this.usersService.save(userAlreadyExist);

          this.mailerService.sendEmailForgotPassword({
            token,
            isAdmin: true,
            isInvite: inviteTemplateId,
            userId: userAlreadyExist?.id,
            email: userAlreadyExist?.email,
            providerName: `${firstName || ''} ${lastName || ""}`,
            fullName: `${patientInstance?.firstName || ''} ${patientInstance?.lastName || ""}`,
          })

          return patientInstance
        }
      } else if (patientInstance && !patientInstance?.email) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Patient does not have email',
        });
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Patient not found',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
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
      const { patientId, providerId, relation, otherRelation } = updatePatientProvider
      //get patient
      const patient = await this.findOne(patientId)
      if (patient) {
        const previousProvider = await this.doctorPatientRepository.findOne({ where: [{ patientId: patientId, doctorId: providerId }] })
        if (previousProvider) {
          await this.doctorPatientRepository.delete({ id: previousProvider?.id })
        }
        const previousRelationProvider = await this.doctorPatientRepository.findOne({ where: [{ patientId: patientId, relation }] })
        if (previousRelationProvider) {
          await this.doctorPatientRepository.delete({ id: previousRelationProvider?.id })
        }
        const doctorPatientInstance = await this.doctorPatientRepository.create({
          doctorId: providerId, patientId: patientId, otherRelation: otherRelation, relation: relation
        })
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
   * Updates patient provider relation
   * @param updatePatientProviderRelationInputs 
   * @returns  
   */
  async updatePatientProviderRelation(updatePatientProviderRelationInputs: UpdatePatientProviderRelationInputs) {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id, relation, otherRelation } = updatePatientProviderRelationInputs
      //get patient
      const patient = await this.doctorPatientRepository.findOne(id)
      if (patient) {
        const { patientId } = patient
        //get primary provider
        if (relation === DoctorPatientRelationType.PRIMARY_PROVIDER) {
          const previousProvider = await this.doctorPatientRepository.findOne({ where: [{ patientId: patientId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER }] })
          if (previousProvider) {
            await this.doctorPatientRepository.save({ id: previousProvider.id, relation: DoctorPatientRelationType.OTHER_PROVIDER })
          }
        }
        await this.doctorPatientRepository.save({ id: id, relation: relation, otherRelation: otherRelation })
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
      const [first] = patientInput.searchString ? patientInput.searchString.split(' ') : ''
      const paginationResponse = await this.paginationService.willPaginate<Patient>(this.patientRepository, { ...patientInput, associatedTo: 'Patient', associatedToField: { columnValue: first, columnName: 'firstName', columnName2: 'lastName', columnName3: 'email', filterType: 'stringFilter' } })
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
   * Updates patient note info
   * @param updatePatientNoteInfoInputs 
   */
  async updatePatientNoteInfo(updatePatientNoteInfoInputs: UpdatePatientNoteInfoInputs): Promise<Patient> {
    try {
      return await this.utilsService.updateEntityManager(Patient, updatePatientNoteInfoInputs.id, updatePatientNoteInfoInputs, this.patientRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Fetchs all fhir patients
   * @param paginationInput 
   * @returns  
   */
  async fetchAllFhirPatients(paginationInput: PaginationInput) {
    const take = paginationInput.limit || 10
    const page = paginationInput.page || 1;
    const skip = (page - 1) * take;
    const patientsInfo = await this.patientRepository.findAndCount({
      relations: [
        'contacts',
        'doctorPatients',
        'facility',
        'employer',
      ]
      , skip
      , take
    })
    const [result, total] = patientsInfo

    const transformedPatients = result.map((patient) => this.getTransformedPatient(patient))

    return paginateResponse([transformedPatients, total], page, paginationInput.limit)
  }

  /**
   * Fetchs all patients
   * @param patientInput 
   * @returns all patients 
   */
  async fetchAllPatients(patientInput: PatientInput): Promise<PatientsPayload> {
    try {
      const { limit, page } = patientInput.paginationOptions
      const { dob, appointmentDate, doctorId, facilityId, practiceId, searchString } = patientInput

      let baseQuery = getConnection()
        .getRepository(Patient)
        .createQueryBuilder('patient')
        .skip((page - 1) * limit)
        .take(limit)

      if (appointmentDate) {
        baseQuery = baseQuery
          .innerJoin(Appointment, 'patientWithCertainAppointment', `patient.id = "patientWithCertainAppointment"."patientId" ${appointmentDate ? 'AND "patientWithCertainAppointment"."scheduleStartDateTime"::date = :scDate' : ''}`, { scDate: `%${appointmentDate}%` })
      }

      if (doctorId) {
        baseQuery = baseQuery
          .innerJoin(DoctorPatient, 'patientWithCertainDoctor', `patient.id = "patientWithCertainDoctor"."patientId" ${doctorId ? 'AND "patientWithCertainDoctor"."doctorId" = :doctorId' : ''}`, { doctorId: doctorId })
      }

      const [patients, totalCount] = await baseQuery
        .innerJoin(Contact, 'patientContact', `patientContact.patient = patient.id AND patientContact.primaryContact is true`)
        .where(dob ? 'patient.dob = :dob' : '1=1', { dob: moment(new Date(dob)).format("MM-DD-YYYY") })
        .andWhere(practiceId ? 'patient.practiceId = :practiceId' : '1 = 1', { practiceId: practiceId })
        .andWhere(facilityId ? 'patient.facilityId = :facilityId' : '1 = 1', { facilityId: facilityId })
        .andWhere(searchString ? new Brackets(qb => {
          qb.where('patient.firstName ILIKE :search', { search: `%${searchString}%` }).
            orWhere('patient.lastName ILIKE :search', { search: `%${searchString}%` }).
            orWhere('patient.email ILIKE :search', { search: `%${searchString}%` }).
            orWhere('patient.patientRecord ILIKE :search', { search: `%${searchString}%` }).
            orWhere('patient.ssn ILIKE :search', { search: `%${searchString}%` })
            .orWhere('patient.dob ILIKE :searchDob', { searchDob: moment(searchString).format("MM-DD-YYYY") })
            .orWhere('patientContact.phone ILIKE :patientPhone', { patientPhone: `%${searchString}%` })
        }) : '1=1')
        .orderBy('patient.createdAt', 'DESC')
        .getManyAndCount()

      const totalPages = Math.ceil(totalCount / limit)

      return {
        patients: patients,
        pagination: {
          totalCount,
          page,
          limit,
          totalPages,
        },
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
    try {
      const usualProvider = await this.doctorPatientRepository.find({
        where: {
          patientId: id
        },
        order: { createdAt: "ASC" },
        relations: ["doctor"]
      })
      return usualProvider
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Gets primary provider
   * @param id 
   * @returns primary provider 
   */
  async getPrimaryProvider(id: string): Promise<Doctor> {
    try {
      const usualProvider = await this.doctorPatientRepository.findOne({
        where: {
          patientId: id, relation: DoctorPatientRelationType.PRIMARY_PROVIDER
        },
        order: { createdAt: "ASC" },
        relations: ["doctor"]
      })
      return usualProvider?.doctor
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Gets provider
   * @param patientProviderInputs 
   * @returns provider 
   */
  async getProvider(patientProviderInputs: PatientProviderInputs): Promise<DoctorPatient> {
    try {
      const usualProvider = await this.doctorPatientRepository.findOne({
        where: {
          patientId: patientProviderInputs.patientId,
          doctorId: patientProviderInputs.providerId
        },
        order: { createdAt: "ASC" },
        relations: ["doctor"]
      })
      return usualProvider
    }
    catch (error) {
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
   * @returns patient k
   */
  async addPatient(createExternalAppointmentInput: CreateExternalAppointmentInput): Promise<Patient> {
    const { dob } = createExternalAppointmentInput.createPatientItemInput
    const transformedDob = dob ? moment(dob).format("MM-DD-YYYY") : ''
    const patientInstance = this.patientRepository.create({ ...createExternalAppointmentInput.createPatientItemInput, dob: transformedDob })
    patientInstance.patientRecord = await this.utilsService.generateString(10);
    let doctorPatientInstance
    if (createExternalAppointmentInput.createPatientItemInput.usualProviderId) {
      const usualProvider = await this.doctorService.findOne(createExternalAppointmentInput.createPatientItemInput.usualProviderId)
      //creating doctorPatient Instance 
      doctorPatientInstance = await this.doctorPatientRepository.create({
        doctorId: usualProvider.id,
        currentProvider: true,
      })
      doctorPatientInstance.doctor = usualProvider
      doctorPatientInstance.doctorId = usualProvider.id
      //adding usual provider with patient
      patientInstance.doctorPatients = [doctorPatientInstance]
    }
    const guardianContact = await this.contactService.createContact(createExternalAppointmentInput.createGuardianContactInput)
    patientInstance.contacts = [guardianContact]
    const patient = await this.patientRepository.save(patientInstance)

    if (createExternalAppointmentInput.createPatientItemInput.usualProviderId) {
      doctorPatientInstance.patient = patient
      doctorPatientInstance.patientId = patient.id
      await this.doctorPatientRepository.save(doctorPatientInstance)
    }
    return patient
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
   * Gets patient by email
   * @param email 
   * @returns patient by email 
   */
  async GetPatientByEmail(email: string): Promise<PatientPayload> {
    const patient = await this.patientRepository.findOne({ email: email });
    if (patient) {
      return { patient }
    }
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
        const user = await this.usersService.findUserByUserId(id, USER_TYPES.PATIENT);
        if (user) {
          await this.usersService.remove(user?.id)
        }
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
   * Updates patient invite
   * @param id 
   * @returns patient invite 
   */
  async updatePatientInvite(id: string): Promise<Patient> {
    try {
      const patient = await this.findOne(id)
      if (patient) {
        return await this.utilsService.updateEntityManager(Patient, id, { inviteAccepted: true }, this.patientRepository)
      }
      return
    } catch (error) {
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

  /**
   * Gets transformed patient
   * @param patient 
   * @returns  
   */
  getTransformedPatient(patient: Patient) {
    const { dbValue, ...patientMartialStatus } = this.patientMartialStatuses.find(({ dbValue }) => dbValue === patient?.maritialStatus)
    const { firstName, lastName, suffix, contacts, gender, dob } = patient ?? {}
    const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim()
    const { contactType, address, address2, city, state, zipCode, country, email } = contacts?.find((contact) => !!contact?.primaryContact) ?? {}
    return {
      fullUrl: "http://hapi.fhir.org/baseR4/Patient/1124467",
      resource1: {
        resourceType: "Patient",
        active: true,
        name: [
          {
            use: "official",
            text: fullName,
            family: lastName || '',
            given: [
              firstName
            ],
            prefix: [
              suffix
            ]
          }
        ],
        telecom: [...contacts.map((contact) => { return { system: "phone", value: contact?.phone ?? '' } }), { system: "email", value: email || '' }],
        gender: gender,
        birthDate: dob,
        address: patient?.contacts.map(contact => {
          return {
            use: "home",
            type: contact.contactType,
            line: [
              contact.address,
              contact.address2
            ],
            city: contact.city,
            state: contact.state,
            postalCode: contact.zipCode,
            country: contact.country
          }
        }),
        contact: [
          {
            name: {
              use: "official",
              text: fullName,
              family: lastName || '',
            },
            telecom: contacts.map((contact) => { return { value: contact?.phone } }),
            address: {
              use: "home",
              type: contactType,
              line: [
                address,
                address2
              ],
              city: city,
              state: state,
              postalCode: zipCode,
              country: country
            },
            gender: gender
          }
        ],
        maritalStatus: {
          coding: [
            patientMartialStatus
          ]
        }

      },
      search: {
        mode: "match"
      }
    }
  }

  /**
   * Gets signature
   * @param id 
   * @returns  
   */
  async getSignature(id: string): Promise<Attachment> {
    try {
      const attachments = await this.attachmentsService.getAttachmentSignature({ typeId: id })
      const signature = attachments.find(({ title }) => title === ATTACHMENT_TITLES.Signature)
      return signature;
    } catch (error) {
      throw new Error(error);

    }
  }

  /**
   * Gets facility patients
   * @param params 
   * @returns facility patients 
   */
  async getFacilityPatients(params: GetFacilityPatientsInput): Promise<PatientsPayload> {
    try {
      const { paginationOptions, facilityId } = params
      const paginationResponse = await this.paginationService.willPaginate<Patient>(this.patientRepository, { paginationOptions, facilityId })
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
}
