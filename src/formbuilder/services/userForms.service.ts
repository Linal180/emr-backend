import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UserForms } from '../entities/userforms.entity'
import { CreateUserFormInput, GetPublicMediaInput, UserFormInput } from "../dto/userForms.input";
import { UserFormElementService } from "./userFormElements.service";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { File } from 'src/aws/dto/file-input.dto';
import { AwsService } from 'src/aws/aws.service';
import { FormsService } from "./forms.service";
import { Form, FormType } from "../entities/form.entity";
import { PatientService } from "src/patients/services/patient.service";
import { CreatePatientItemInput } from "src/patients/dto/create-patientItem.input ";
import { CreateContactInput } from "src/providers/dto/create-contact.input";
import { COMMUNICATIONTYPE, ETHNICITY, GENDERIDENTITY, HOLDSTATEMENT, HOMEBOUND, MARITIALSTATUS, Patient, PRONOUNS, RACE, SEXUALORIENTATION } from "src/patients/entities/patient.entity";
import { ContactType, RelationshipType } from "src/providers/entities/contact.entity";
import { AppointmentService } from "src/appointments/services/appointment.service";
import { BillingStatus, PaymentType } from "src/appointments/entities/appointment.entity";
import { CreateEmployerInput } from "src/patients/dto/create-employer.input";


@Injectable()
export class UserFormsService {

  constructor(
    @InjectRepository(UserForms)
    private userFormsRepository: Repository<UserForms>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    private readonly userFormElementService: UserFormElementService,
    private readonly formService: FormsService,
    private readonly awsService: AwsService,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
  ) { }

  async createPatientAppointment(form: Form, userForm: UserForms, inputs: CreateUserFormInput) {
    try {
      const { type, id, facilityId } = form;
      const { userFormElements } = userForm;
      const formElements = await this.formService.getFormElements(id)
      const patientElements = formElements?.filter(({ tableName }) => tableName === 'Patients')
      const employersElements = formElements?.filter(({ tableName }) => tableName === 'Employers')
      const contactElements = formElements?.filter(({ tableName, tableContactType }) => tableName === 'Contacts' && tableContactType === ContactType.SELF)
      const emergenceContactElements = formElements?.filter(({ tableName, tableContactType }) => tableName === 'Contacts' && tableContactType === ContactType.EMERGENCY)
      const kinContactElements = formElements?.filter(({ tableName, tableContactType }) => tableName === 'Contacts' && tableContactType === ContactType.NEXT_OF_KIN)
      const guardianContactElements = formElements?.filter(({ tableName, tableContactType }) => tableName === 'Contacts' && tableContactType === ContactType.GUARDIAN)
      const guarantorContactElements = formElements?.filter(({ tableName, tableContactType }) => tableName === 'Contacts' && tableContactType === ContactType.GUARANDOR)

      const contactInputs = contactElements?.map(({ fieldId }) => fieldId)
      const patientsInputs = patientElements?.map(({ fieldId }) => fieldId)
      const employerInputs = employersElements?.map(({ fieldId }) => fieldId)

      const userPatientElements = userFormElements?.filter(({ FormsElementsId }) => patientsInputs?.includes(FormsElementsId))
      const userContactElements = userFormElements?.filter(({ FormsElementsId }) => contactInputs?.includes(FormsElementsId))
      const employerElements = userFormElements?.filter(({ FormsElementsId }) => employerInputs?.includes(FormsElementsId))

      const patient = {}
      patientElements?.map(({ columnName, fieldId }) => {
        const element = userPatientElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return patient[columnName] = value || ''
      })

      const contacts = {}
      contactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return contacts[columnName] = value || ''
      })

      const employer = {}
      employersElements?.map(({ columnName, fieldId }) => {
        const element = employerElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return employer[columnName] = value || ''
      })

      const emergenceContacts = {}
      emergenceContactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return emergenceContacts[columnName] = value || ''
      })

      const kinContacts = {}
      kinContactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return kinContacts[columnName] = value || ''
      })
      const guardianContacts = {}
      guardianContactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return guardianContacts[columnName] = value || ''
      })

      const guarantorContacts = {}
      guarantorContactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element || {}
        return guarantorContacts[columnName] = value || ''
      })

      const {
        language, suffix, firstName, lastName, middleName, firstNameUsed, prefferedName, previousFirstName,
        previouslastName, motherMaidenName, ssn, dob, gender, homeBound, race, ethnicity, maritialStatus,
        genderIdentity, sexAtBirth, pronouns
      } = patient as Patient || {}

      const { zipCode, address, address2, city, state, country, phone, email } = contacts as CreateContactInput || {}
      const {
        name: emergenceName, relationship: emergenceRelationship, phone: emergencePhone, mobile: emergenceMobile
      } = emergenceContacts as CreateContactInput || {}
      const {
        name: kinName, relationship: kinRelationship, phone: kinPhone, mobile: kinMobile
      } = kinContacts as CreateContactInput || {}

      const {
        firstName: guardianFirstName, middleName: guardianMiddleName, lastName: guardianLastName, suffix: guardianSuffix
      } = guardianContacts as CreateContactInput || {}

      const {
        relationship: guarantorRelationship, suffix: guarantorSuffix, firstName: guarantorFirstName,
        middleName: guarantorMiddleName, lastName: guarantorLastName, employerName: guarantorEmployerName,
        zipCode: guarantorZipCode, address: guarantorAddress, address2: guarantorAddress2, city: guarantorCity,
        state: guarantorState, country: guarantorCountry, ssn: guarantorSSN, phone: guarantorPhone, email: guarantorEmail
      } = guarantorContacts as CreateContactInput || {}

      const { name: employerName, phone: employerPhone, usualOccupation, industry } = employer as CreateEmployerInput

      const patientInputs = {
        createPatientItemInput: {
          deceasedDate: "",
          registrationDate: "",
          statementNoteDateTo: "",
          statementNoteDateFrom: "",
          suffix: suffix || "",
          firstName: firstName || "",
          middleName: middleName || "",
          lastName: lastName || "",
          firstNameUsed: firstNameUsed || "",
          prefferedName: prefferedName || "",
          previousFirstName: previousFirstName || "",
          facilityId,
          callToConsent: false,
          privacyNotice: false,
          releaseOfInfoBill: false,
          practiceId: "",
          medicationHistoryAuthority: false,
          ethnicity: ethnicity || ETHNICITY.NONE,
          homeBound: homeBound || HOMEBOUND.NO,
          holdStatement: HOLDSTATEMENT.NONE,
          previouslastName: previouslastName || "",
          motherMaidenName: motherMaidenName || "",
          ssn: ssn || "",
          statementNote: "",
          language: language || "",
          patientNote: "",
          email: email || "",
          pronouns: pronouns || PRONOUNS.NONE,
          race: race || RACE.OTHER,
          gender: gender || GENDERIDENTITY.NONE,
          sexAtBirth: sexAtBirth || GENDERIDENTITY.NONE,
          genderIdentity: genderIdentity || GENDERIDENTITY.NONE,
          maritialStatus: maritialStatus || MARITIALSTATUS.SINGLE,
          sexualOrientation: SEXUALORIENTATION.NONE,
          statementDelivereOnline: false,
          dob: dob || "",
          registrationDepartment: "",
          patientRecord: "",
          primaryDepartment: "",
          smsPermission: false,
          phonePermission: false,
          pharmacy: "",
          preferredCommunicationMethod: COMMUNICATIONTYPE.PHONE
        },
        createContactInput: {
          email: email || "",
          city: city || "",
          zipCode: zipCode || "",
          state: state || "",
          facilityId,
          phone: phone || "",
          address2: address2 || "",
          address: address || "",
          contactType: ContactType.SELF,
          country: country || "",
          primaryContact: true,
        },
        createEmployerInput: {
          name: employerName || "",
          email: "",
          phone: employerPhone || "",
          usualOccupation: usualOccupation || "",
          industry: industry || "",
          mobile: ""
        },
        createGuardianContactInput: {
          firstName: guardianFirstName || "",
          middleName: guardianMiddleName || "",
          primaryContact: false,
          lastName: guardianLastName || "",
          contactType: ContactType.GUARDIAN,
          suffix: guardianSuffix || "",
        },
        createEmergencyContactInput: {
          contactType: ContactType.EMERGENCY,
          name: emergenceName || "",
          phone: emergencePhone,
          mobile: emergenceMobile,
          primaryContact: false,
          relationship: emergenceRelationship || RelationshipType.OTHER,
          facilityId
        },
        createGuarantorContactInput: {
          firstName: guarantorFirstName || "",
          middleName: guarantorMiddleName || "",
          lastName: guarantorLastName || "",
          email: guarantorEmail || "",
          contactType: ContactType.GUARANDOR,
          relationship: guarantorRelationship || RelationshipType.OTHER,
          employerName: guarantorEmployerName || "",
          address2: guarantorAddress2 || "",
          zipCode: guarantorZipCode || "",
          city: guarantorCity || "",
          state: guarantorState || "",
          phone: guarantorPhone || "",
          suffix: guarantorSuffix || "",
          country: guarantorCountry || "",
          ssn: guarantorSSN || "000-00-0000",
          primaryContact: false,
          address: guarantorAddress || "",
        },
        createNextOfKinContactInput: {
          contactType: ContactType.NEXT_OF_KIN,
          name: kinName || "",
          phone: kinPhone || "",
          relationship: kinRelationship || RelationshipType.OTHER,
          mobile: kinMobile || "",
          primaryContact: false,
        },
      };

      if (type === FormType.PATIENT) {
        return await this.patientService.createPatient(patientInputs)
      }

      else if (type === FormType.APPOINTMENT) {
        const appointmentElement = formElements?.find(({ columnName }) => columnName === 'appointmentTypeId')
        const providerElement = formElements?.find(({ columnName }) => columnName === 'usualProviderId')

        if (appointmentElement && providerElement) {
          const { fieldId } = appointmentElement
          const { fieldId: providerField } = providerElement

          const { userFormElements: userFormElementInputs } = inputs

          const appointmentType = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === fieldId)
          const providerId = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === providerField)
          const scheduleStartTime = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === 'scheduleEndDateTime')
          const scheduleEndTimes = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === 'scheduleStartDateTime')

          if (appointmentType && facilityId && scheduleEndTimes && scheduleStartTime && providerId) {
            const { value: startTime } = scheduleStartTime || {}
            const { value: endTime } = scheduleEndTimes || {}
            const { value: appointmentTypeId } = appointmentType
            const { value: doctorId } = providerId
            const patientInstance = await this.patientService.createPatient(patientInputs)
            if(endTime && startTime && patientInstance?.id){

            
            const appointmentInputs = {
              paymentType: PaymentType.SELF,
              billingStatus: BillingStatus.DUE,
              isExternal: true,
              scheduleStartDateTime: startTime,
              scheduleEndDateTime: endTime,
              appointmentTypeId: appointmentTypeId || '',
              facilityId,
              providerId: doctorId || '',
              patientId: patientInstance.id,
              practiceId: null
            }

            await this.appointmentService.createAppointment(appointmentInputs)
            return patientInstance
          }
          else{
            throw new Error('Please provide appointment start and end time')
          }
          }
          else {
            throw new Error('Please provide appointment start and end time')
          }

        }
        else {
          throw new Error('Please provide service and provider')
        }
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(input: CreateUserFormInput): Promise<UserForms> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userForm = this.userFormsRepository.create({ ...input });
      const formBuilder = await this.formService.getForm(input?.FormId)
      const { form } = formBuilder;
      const patient = await this.createPatientAppointment(form, userForm, input);
      userForm.form = form
      const newUserForms = await this.userFormsRepository.save(userForm)
      const userFormEles = input?.userFormElements?.map((ele) => ({ ...ele, UsersFormsId: newUserForms?.id }))
      await this.userFormElementService.createBulk(userFormEles, userForm);
      await queryRunner.commitTransaction();
      return newUserForms
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async fetchAll(input: UserFormInput) {
    try {
      const paginationResponse = await this.paginationService.willPaginate<UserForms>(this.userFormsRepository, input)
      return {
        pagination: {
          ...paginationResponse
        },
        userForms: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<UserForms> {
    return await this.userFormsRepository.findOne(id);
  }

  async getAll(input: UserFormInput) {
    try {
      const paginationResponse = await this.paginationService.willPaginate<UserForms>(this.userFormsRepository, input)
      return {
        pagination: {
          ...paginationResponse
        },
        userForms: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadUserFormMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<String> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.FORM_BUILDER;
      // const userForm = await this.findOne(updateAttachmentMediaInput.typeId)
      const attachment = await this.awsService.uploadFile(file, AttachmentType.FORM_BUILDER, updateAttachmentMediaInput.typeId);
      const { Key } = attachment || {};
      if (Key) {
        return Key
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

  async getUploadMedia({ url, formId }: GetPublicMediaInput): Promise<String> {
    try {
      if (url?.length > 0 && url.includes(`${AttachmentType.FORM_BUILDER}/${formId}`)) {
        const attachment = await this.awsService.getFile(url);
        if (attachment) {
          return attachment
        }
        throw new PreconditionFailedException({
          status: HttpStatus.PRECONDITION_FAILED,
          error: 'Could not get media',
        });
      }
      else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid url',
        });
      }

    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}