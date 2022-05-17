import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExternalAppointmentInput } from 'src/appointments/dto/create-external-appointment.input';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { UpdateAttachmentMediaInput } from 'src/attachments/dto/update-attachment.input';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import { createToken, paginateResponse } from 'src/lib/helper';
import { MailerService } from 'src/mailer/mailer.service';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { ContactService } from 'src/providers/services/contact.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { UsersService } from 'src/users/services/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Brackets, Connection, getConnection, Repository } from 'typeorm';
import { File } from '../../aws/dto/file-input.dto';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreatePatientInput } from '../dto/create-patient.input';
import { PatientInfoInput } from '../dto/patient-info.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientInviteInput } from '../dto/patient-invite.input';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientProfileInput } from '../dto/update-patient-profile.input';
import { UpdatePatientProvider } from '../dto/update-patient-provider.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { RemovePatient } from '../dto/update-patientItem.input';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Patient } from '../entities/patient.entity';
import { EmployerService } from './employer.service';

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
    private readonly mailerService: MailerService
  ) { }

  patientMartialStatuses=[
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "S",
      "display": "Never Married",
      dbValue:"single"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "M",
      "display": "Married",
      dbValue:"maried"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "W",
      "display": "Widowed",
      dbValue:"Widowed"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "L",
      "display": "Legally Separated",
      dbValue:"Separated"
    },
    {
      "system": "http://hl7.org/fhir/v3/MaritalStatus",
      "code": "D",
      "display": "Divorced",
      dbValue:"Divorced"
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
      const patient = await queryRunner.manager.save(patientInstance);
      doctorPatientInstance.patient = patient
      doctorPatientInstance.patientId = patient.id
      await queryRunner.commitTransaction();
      await this.doctorPatientRepository.save(doctorPatientInstance)
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

      const { id: patientId, usualProviderId, ...patientInfoToUpdate } = updatePatientInput.updatePatientItemInput

      //save patient basic info
      await this.utilsService.updateEntityManager(Patient, updatePatientInput.updatePatientItemInput.id, patientInfoToUpdate, this.patientRepository)

      //fetch patient
      const patientInstance = await this.patientRepository.findOne(updatePatientInput.updatePatientItemInput.id)
      //get facility 
      if (updatePatientInput.updatePatientItemInput.facilityId) {
        const facility = await this.facilityService.findOne(updatePatientInput.updatePatientItemInput.facilityId)
        patientInstance.facility = facility
        const user = await this.usersService.findUserByUserId(updatePatientInput.updatePatientItemInput.id)
        if (user) {
          await this.usersService.updateFacility(facility, user)
        }
      }
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
      if (usualProviderId) {
        await this.updatePatientProvider({ patientId, providerId: usualProviderId })
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
   * Sends invite to patient
   * @param patientInviteInput 
   * @returns invite to patient 
   */
  async sendInviteToPatient(patientInviteInput: PatientInviteInput): Promise<Patient> {
    try {
      const patientInstance = await this.findOne(patientInviteInput.id)
      const patientProviders = await this.usualProvider(patientInstance.id)
      const usualProvider = patientProviders.find((item) => item.currentProvider)
      //get patient role
      const allRoles = await this.usersService.findAllRoles()
      const patientRole = allRoles.find((item) => item.role === 'patient')
      //user registration input
      if (patientInstance && patientInstance.email) {
        const inviteTemplateId = 'PATIENT_PORTAL_INVITATION_TEMPLATE_ID';
        const userAlreadyExist = await this.usersService.findOneByEmail(patientInstance.email)
        if (!userAlreadyExist) {
          const user = await this.usersService.create({ firstName: patientInstance.firstName, lastName: patientInstance.lastName, email: patientInstance.email, password: "admin@123", roleType: patientRole.role, adminId: patientInviteInput.adminId, facilityId: patientInstance.facilityId })
          patientInstance.user = user
          const patient = await this.patientRepository.save(patientInstance)
          await this.usersService.saveUserId(patient.id, user);
          this.mailerService.sendEmailForgotPassword(user.email, user.id, patientInstance.firstName + ' ' + patientInstance.lastName, usualProvider.doctor.firstName + " " + usualProvider.doctor.lastName, true, user.token, inviteTemplateId)
          return patient
        } else {
          const token = createToken();
          userAlreadyExist.token = token;
          await this.usersService.save(userAlreadyExist);
          this.mailerService.sendEmailForgotPassword(userAlreadyExist.email, userAlreadyExist.id, patientInstance.firstName + ' ' + patientInstance.lastName, usualProvider.doctor.firstName + " " + usualProvider.doctor.lastName, true, token, inviteTemplateId)
          return patientInstance
        }
      } else if (patientInstance && !patientInstance.email) {
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

  async fetchAllFhirPatients(paginationInput:PaginationInput){
    const take = paginationInput.limit || 10
    const page=paginationInput.page || 1;
    const skip= (page-1) * take;
    const patientsInfo= await this.patientRepository.findAndCount({
      relations:[
       'contacts',
       'doctorPatients',
       'facility',
       'employer',
      ]
      ,skip
      ,take
    })
    const [result,total]=patientsInfo

    const transformedPatients=result.map((patient)=>this.getTransformedPatient(patient))

    return paginateResponse([transformedPatients,total],page,paginationInput.limit)
  }
  async fetchAllPatients(patientInput: PatientInput): Promise<PatientsPayload> {
      try {
        const { limit, page } = patientInput.paginationOptions
        const { dob, appointmentDate, doctorId, facilityId, practiceId,searchString } = patientInput

        const baseQuery=getConnection()
        .getRepository(Patient)
        .createQueryBuilder('patient')
        .skip((page - 1) * limit)
        .take(limit)

        if(appointmentDate){
          const [patients,totalCount] = await baseQuery
                                            .innerJoin(Appointment, 'patientWithCertainAppointment', `patient.id = "patientWithCertainAppointment"."patientId" ${appointmentDate? 'AND "patientWithCertainAppointment"."scheduleStartDateTime"::date = :scDate':''}`, { scDate: `%${appointmentDate}%` })
                                            .innerJoin(DoctorPatient, 'patientWithCertainDoctor', `patient.id = "patientWithCertainDoctor"."patientId" ${doctorId? 'AND "patientWithCertainDoctor"."doctorId" = :doctorId':''}`, { doctorId: doctorId })
                                            .where(dob?'patient.dob = :dob':'1=1', { dob: dob })
                                            .andWhere(practiceId?'patient.practiceId = :practiceId': '1 = 1', { practiceId: practiceId })
                                            .andWhere(facilityId?'patient.facilityId = :facilityId': '1 = 1', { facilityId: facilityId })
                                            .andWhere(new Brackets(qb => {
                                              qb.where('patient.firstName ILIKE :search', { search: `%${searchString}%`}).
                                              orWhere('patient.lastName ILIKE :search', { search: `%${searchString}%` }).                          
                                              orWhere('patient.email ILIKE :search', { search: `%${searchString}%` }).                           
                                              orWhere('patient.patientRecord ILIKE :search', { search: `%${searchString}%` }).                          
                                              orWhere('patient.patientRecord ILIKE :search', { search: `%${searchString}%` }).                         
                                              orWhere('patient.ssn ILIKE :search', { search: `%${searchString}%` })                         
                                            }))
                                            .getManyAndCount()
          
          const totalPages=Math.ceil(totalCount / limit)

          return {
            patients:patients,
            pagination:{
              totalCount,
              page,
              limit,
              totalPages,
            },
          }
        }else{
          const [patients,totalCount] = await baseQuery
                                            .innerJoin(DoctorPatient, 'patientWithCertainDoctor', `patient.id = "patientWithCertainDoctor"."patientId" ${doctorId? 'AND "patientWithCertainDoctor"."doctorId" = :doctorId':''}`, { doctorId: doctorId })
                                            .where(dob?'patient.dob = :dob':'1=1', { dob: dob })
                                            .andWhere(practiceId?'patient.practiceId = :practiceId': '1 = 1', { practiceId: practiceId })
                                            .andWhere(facilityId?'patient.facilityId = :facilityId': '1 = 1', { facilityId: facilityId })
                                            .andWhere(new Brackets(qb => {
                                              qb.where('patient.firstName ILIKE :search', { search: `%${searchString}%`}).
                                              orWhere('patient.lastName ILIKE :search', { search: `%${searchString}%` }).                          
                                              orWhere('patient.email ILIKE :search', { search: `%${searchString}%` }).                           
                                              orWhere('patient.patientRecord ILIKE :search', { search: `%${searchString}%` }).                          
                                              orWhere('patient.patientRecord ILIKE :search', { search: `%${searchString}%` }).                         
                                              orWhere('patient.ssn ILIKE :search', { search: `%${searchString}%` })                         
                                            }))
                                            .getManyAndCount()

          const totalPages=Math.ceil(totalCount / limit)

          return {
            patients:patients,
            pagination:{
              totalCount,
              page,
              limit,
              totalPages,
            },
          }
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
    const patientInstance = this.patientRepository.create(createExternalAppointmentInput.createPatientItemInput)
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

  getTransformedPatient(patient:Patient){
      const {dbValue,...patientMartialStatus}=this.patientMartialStatuses.find(({dbValue})=>dbValue===patient.maritialStatus)
      const patientPrimaryContact=patient.contacts.find(({primaryContact})=>primaryContact)
      return {
          fullUrl: "http://hapi.fhir.org/baseR4/Patient/1124467",
          resource1:{
            resourceType: "Patient",
            active: true,
            name: [
                {
                    use: "official",
                    text: `${patient.firstName} ${patient.lastName}`,
                    family: patient.lastName,
                    given: [
                        patient.firstName
                    ],
                    prefix: [
                        patient.suffix
                    ]
                }
            ],
            telecom: [...patient.contacts.map(({phone})=>{return {system: "phone",value:phone}}),{system:"email",value:patientPrimaryContact.email}],
            gender: patient.gender,
            birthDate: patient.dob,
            address: patient.contacts.map(contact=>{
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
                      text: `${patient.firstName} ${patient.lastName}`,
                      family: patient.lastName,
                    },
                    telecom: patient.contacts.map(({phone})=>{return {value:phone}}),
                    address: {
                        use: "home",
                        type: patientPrimaryContact.contactType,
                        line: [
                            patientPrimaryContact.address,
                            patientPrimaryContact.address2
                        ],
                        city: patientPrimaryContact.city,
                        state: patientPrimaryContact.state,
                        postalCode: patientPrimaryContact.zipCode,
                        country: patientPrimaryContact.country
                    },
                    gender: patient.gender
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
}
