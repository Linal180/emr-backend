import { Connection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
  BadRequestException, HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException
} from "@nestjs/common";
//user import
import { FormsService } from "./forms.service";
import { AwsService } from 'src/aws/aws.service';
import { File } from 'src/aws/dto/file-input.dto';
import { Form, FormType } from "../entities/form.entity";
import { UserForms } from '../entities/userforms.entity';
import { UserFormElementService } from "./userFormElements.service";
import { PolicyService } from "src/insurance/services/policy.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PaymentService } from "src/payment/services/payment.service";
import { PatientService } from "src/patients/services/patient.service";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { CreateContactInput } from "src/providers/dto/create-contact.input";
import { CreateEmployerInput } from "src/patients/dto/create-employer.input";
import { AppointmentService } from "src/appointments/services/appointment.service";
import { ContactType, RelationshipType } from "src/providers/entities/contact.entity";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { BillingStatus, PaymentType } from "src/appointments/entities/appointment.entity";
import { CreateUserFormInput, GetPublicMediaInput, UserFormInput } from "../dto/userForms.input";
import {
  getCustomElementValue, getTableElements, getUserElementValue, getUserFormElements, pluckFormElementId
} from "src/lib/helper";
import {
  COMMUNICATIONTYPE, ETHNICITY, GENDERIDENTITY, HOLDSTATEMENT, HOMEBOUND, MARITIALSTATUS, Patient, PRONOUNS, RACE,
  SEXUALORIENTATION
} from "src/patients/entities/patient.entity";

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
    private readonly policyService: PolicyService,
    private readonly transactionService: PaymentService
  ) { }

  async createPatientAppointment(form: Form, userForm: UserForms, inputs: CreateUserFormInput): Promise<Patient> {
    try {

      const { type, id, facilityId, practiceId } = form;
      const { userFormElements } = userForm;
      const { userFormElements: userFormElementInputs } = inputs
      console.log('userFormElementInputs => ', userFormElementInputs)
      const formElements = await this.formService.getFormElements(id)
      //tables elements
      const patientElements = getTableElements(formElements, 'Patients')
      const employersElements = getTableElements(formElements, 'Employers')
      const contactElements = getTableElements(formElements, 'Contacts', ContactType.SELF)
      const kinContactElements = getTableElements(formElements, 'Contacts', ContactType.NEXT_OF_KIN)
      const guardianContactElements = getTableElements(formElements, 'Contacts', ContactType.GUARDIAN)
      const guarantorContactElements = getTableElements(formElements, 'Contacts', ContactType.GUARANDOR)
      const emergenceContactElements = getTableElements(formElements, 'Contacts', ContactType.EMERGENCY)
      //pluck form elements ids
      const contactInputs = pluckFormElementId(contactElements)
      const patientsInputs = pluckFormElementId(patientElements)
      const employerInputs = pluckFormElementId(employersElements)
      const kinContactInputs = pluckFormElementId(kinContactElements)
      const guardianContactInputs = pluckFormElementId(guardianContactElements)
      const emergenceContactInputs = pluckFormElementId(emergenceContactElements)
      const guarantorContactInputs = pluckFormElementId(guarantorContactElements)
      //get user elements by form elements
      const userContactElements = getUserFormElements(userFormElements, contactInputs)
      const userPatientElements = getUserFormElements(userFormElements, patientsInputs)
      const userEmployersElements = getUserFormElements(userFormElements, employerInputs)
      const userKinContactElements = getUserFormElements(userFormElements, kinContactInputs)
      const userGuardianContactInputs = getUserFormElements(userFormElements, guardianContactInputs)
      const userGuarantorContactElements = getUserFormElements(userFormElements, guarantorContactInputs)
      const userEmergenceContactElements = getUserFormElements(userFormElements, emergenceContactInputs)
      //user form values
      const patient = getUserElementValue(userPatientElements, patientElements)
      const contacts = getUserElementValue(userContactElements, contactElements)
      const employer = getUserElementValue(userEmployersElements, employersElements)
      const kinContacts = getUserElementValue(userKinContactElements, kinContactElements)
      const guardianContacts = getUserElementValue(userGuardianContactInputs, guardianContactElements)
      const emergenceContacts = getUserElementValue(userEmergenceContactElements, emergenceContactElements)
      const guarantorContacts = getUserElementValue(userGuarantorContactElements, guarantorContactElements)
      //get patient info
      const {
        language, suffix, firstName, lastName, middleName, firstNameUsed, prefferedName, previousFirstName,
        previouslastName, motherMaidenName, ssn, dob, gender, homeBound, race, ethnicity, maritialStatus,
        genderIdentity, sexAtBirth, pronouns, deceasedDate, registrationDate, statementNoteDateTo, statementNoteDateFrom
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
      //get custom element value
      const smsPermission = getCustomElementValue(userFormElementInputs, 'smsPermission')
      const medication = getCustomElementValue(userFormElementInputs, 'medicationHistoryAuthority')
      const phonePermission = getCustomElementValue(userFormElementInputs, 'phonePermission')
      const billingInfo = getCustomElementValue(userFormElementInputs, 'releaseOfInfoBill')
      const privacy = getCustomElementValue(userFormElementInputs, 'privacyNotice')

      const patientInputs = {
        createPatientItemInput: {
          deceasedDate: deceasedDate || null,
          registrationDate: registrationDate || null,
          statementNoteDateTo: statementNoteDateTo || null,
          statementNoteDateFrom: statementNoteDateFrom || null,
          suffix: suffix || null,
          firstName: firstName || null,
          middleName: middleName || null,
          lastName: lastName || null,
          firstNameUsed: firstNameUsed || null,
          prefferedName: prefferedName || null,
          previousFirstName: previousFirstName || null,
          facilityId: facilityId || null,
          callToConsent: false,
          privacyNotice: privacy === 'true' ? true : false,
          releaseOfInfoBill: billingInfo === 'true' ? true : false,
          practiceId: practiceId || null,
          medicationHistoryAuthority: medication === 'true' ? true : false,
          ethnicity: ethnicity || ETHNICITY.NONE,
          homeBound: homeBound || HOMEBOUND.NO,
          holdStatement: HOLDSTATEMENT.NONE,
          previouslastName: previouslastName || null,
          motherMaidenName: motherMaidenName || null,
          ssn: ssn || null,
          statementNote: null,
          language: language || null,
          patientNote: null,
          email: email || null,
          pronouns: pronouns || PRONOUNS.NONE,
          race: race || RACE.OTHER,
          gender: gender || GENDERIDENTITY.NONE,
          sexAtBirth: sexAtBirth || GENDERIDENTITY.NONE,
          genderIdentity: genderIdentity || GENDERIDENTITY.NONE,
          maritialStatus: maritialStatus || MARITIALSTATUS.SINGLE,
          sexualOrientation: SEXUALORIENTATION.NONE,
          statementDelivereOnline: false,
          dob: dob || null,
          registrationDepartment: null,
          patientRecord: null,
          primaryDepartment: null,
          smsPermission: smsPermission === 'true' ? true : false,
          phonePermission: phonePermission === 'true' ? true : false,
          pharmacy: null,
          preferredCommunicationMethod: COMMUNICATIONTYPE.PHONE
        },
        createContactInput: {
          email: email || "",
          city: city || "",
          zipCode: zipCode || "",
          state: state || "",
          facilityId: facilityId || null,
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
          facilityId: facilityId || null
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
        const facilityElement = formElements?.find(({ columnName }) => columnName === 'facilityId')

        if (appointmentElement && providerElement) {
          const { fieldId } = appointmentElement
          const { fieldId: providerField } = providerElement
          let facilityElementId = ''

          const appointmentTypeId = getCustomElementValue(userFormElementInputs, fieldId)
          const doctorId = getCustomElementValue(userFormElementInputs, providerField)
          const startTime = getCustomElementValue(userFormElementInputs, 'scheduleEndDateTime')
          const endTime = getCustomElementValue(userFormElementInputs, 'scheduleStartDateTime')
          const transactionId = getCustomElementValue(userFormElementInputs, 'transactionId')

          if (facilityElement) {
            const { fieldId: facilityFieldId } = facilityElement;
            if (facilityFieldId) {
              const facilityItem = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === facilityFieldId)
              const { value } = facilityItem || {}
              facilityElementId = value
            }
          }

          if (appointmentTypeId && endTime && startTime) {

            const patientInput = {
              createPatientItemInput: {
                ...patientInputs.createPatientItemInput,
                facilityId: facilityElementId || facilityId || null,
              },
              createContactInput: {
                ...patientInputs.createContactInput,
                facilityId: facilityElementId || facilityId || null
              },
              createEmergencyContactInput: {
                ...patientInputs.createEmergencyContactInput,
                facilityId: facilityElementId || facilityId || null
              },
              createEmployerInput: {
                ...patientInputs.createEmployerInput
              },
              createGuarantorContactInput: {
                ...patientInputs.createGuarantorContactInput
              },
              createGuardianContactInput: {
                ...patientInputs.createGuardianContactInput
              },
              createNextOfKinContactInput: {
                ...patientInputs.createNextOfKinContactInput
              }
            }

            const patientInstance = await this.patientService.createPatient(patientInput)
            if (endTime && startTime && patientInstance?.id) {

              const memberId = getCustomElementValue(userFormElementInputs, 'memberId')
              const groupNumber = getCustomElementValue(userFormElementInputs, 'groupNumber')
              const companyName = getCustomElementValue(userFormElementInputs, 'companyName')

              if (companyName && groupNumber && memberId) {
                const inputs = {
                  memberId,
                  groupNumber,
                  insuranceId: companyName,
                  patientId: patientInstance.id,
                  primaryCareProviderId: doctorId || null
                }
                await this.policyService.create(inputs)
              }

              const organizationName = getCustomElementValue(userFormElementInputs, 'organizationName')
              const contractNo = getCustomElementValue(userFormElementInputs, 'contractNumber')

              const appointmentInputs = {
                paymentType: companyName ? PaymentType.INSURANCE : contractNo ? PaymentType.CONTRACT : PaymentType.SELF,
                billingStatus: BillingStatus.DUE,
                isExternal: true,
                scheduleStartDateTime: startTime,
                scheduleEndDateTime: endTime,
                appointmentTypeId: appointmentTypeId || null,
                facilityId: facilityElementId || facilityId || null,
                providerId: doctorId || null,
                patientId: patientInstance.id,
                practiceId: practiceId || null,
                contractNumber: contractNo || null,
                organizationName: organizationName || null
              }

              const appointmentInstance = await this.appointmentService.createAppointment(appointmentInputs);
              console.log('appointmentInstance => ', appointmentInstance)
              if (transactionId) {
                console.log('transactionId =>', transactionId)
                console.log('---------------------------------');
                const transactionInstance = await this.transactionService.getTransaction(transactionId)
                console.log('transaction =>', transactionInstance)
                console.log('---------------------------------');

                if (transactionInstance) {
                  transactionInstance.appointmentId = appointmentInstance.id
                  transactionInstance.patientId = patientInstance.id
                  transactionInstance.doctorId = appointmentInstance.providerId
                  transactionInstance.facilityId = appointmentInstance.facilityId
                  
                  transactionInstance.patient = patientInstance
                  transactionInstance.doctor = appointmentInstance.provider
                  transactionInstance.facility = appointmentInstance.facility
                  // transactionInstance.appointment = appointmentInstance
                  const updateTransaction = await this.transactionService.updateTransaction(transactionInstance)
                  console.log('updateTransaction =>', updateTransaction)

                }

              }

              return patientInstance
            }
            else {
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
      // else if (type === FormType.DOCTOR) {

      // }

      // else if (type === FormType.STAFF) {

      // }

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