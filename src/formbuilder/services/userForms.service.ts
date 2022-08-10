import { Connection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { validate as isUuid } from 'uuid'
import {
  BadRequestException, HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException
} from "@nestjs/common";
//entities

import { UserForms } from '../entities/userforms.entity';
import { Form, FormType } from "../entities/form.entity";
import { FormElement } from "../entities/form-elements.entity";
import { OrderOfBenefitType } from "src/insurance/entities/policy.entity";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { ContactType, RelationshipType } from "src/providers/entities/contact.entity";
import { Appointment, BillingStatus, PaymentType } from "src/appointments/entities/appointment.entity";
import {
  COMMUNICATIONTYPE, ETHNICITY, GENDERIDENTITY, HOLDSTATEMENT, HOMEBOUND, MARITIALSTATUS, Patient, PRONOUNS, RACE,
  SEXUALORIENTATION
} from "src/patients/entities/patient.entity";
//services
import { FormsService } from "./forms.service";
import { AwsService } from 'src/aws/aws.service';
import { UserFormElementService } from "./userFormElements.service";
import { PaymentService } from "src/payment/services/payment.service";
import { PolicyService } from "src/insurance/services/policy.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PatientService } from "src/patients/services/patient.service";
import { ContractService } from "src/appointments/services/contract.service";
import { AppointmentService } from "src/appointments/services/appointment.service";
//inputs
import { File } from 'src/aws/dto/file-input.dto';
import { CreatePatientInput } from "src/patients/dto/create-patient.input";
import { CreateContactInput } from "src/providers/dto/create-contact.input";
import { CreateEmployerInput } from "src/patients/dto/create-employer.input";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { CreateUserFormInput, GetPublicMediaInput, UserFormInput } from "../dto/userForms.input";
//payloads
import { AppointmentUserForm } from "../dto/userForms.dto";
//helpers
import {
  getCustomElementValue, getInsuranceStatus, getTableElements, getUserElementValue, getUserFormElements, pluckFormElementId
} from "src/lib/helper";

@Injectable()
export class UserFormsService {

  constructor(
    @InjectRepository(UserForms)
    private userFormsRepository: Repository<UserForms>,
    private readonly connection: Connection,
    private readonly awsService: AwsService,
    private readonly formService: FormsService,
    private readonly policyService: PolicyService,
    private readonly patientService: PatientService,
    private readonly contractService: ContractService,
    private readonly transactionService: PaymentService,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    private readonly userFormElementService: UserFormElementService,
  ) { }


  /**
   * Gets input values
   * @param formElements 
   * @param userForm 
   * @param inputs 
   * @returns input values 
   */
  async getInputValues(formElements: FormElement[], userForm: UserForms, inputs: CreateUserFormInput): Promise<CreatePatientInput> {

    const { id } = userForm
    const { userFormElements: userFormElementInputs } = inputs
    const userFormElements = await this.userFormElementService.getUserFormElements(id)
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
        callToConsent: false,
        privacyNotice: privacy === 'true' ? true : false,
        releaseOfInfoBill: billingInfo === 'true' ? true : false,
        medicationHistoryAuthority: medication === 'true' ? true : false,
        ethnicity: ethnicity || ETHNICITY.NONE,
        homeBound: homeBound || HOMEBOUND.NO,
        holdStatement: HOLDSTATEMENT.NONE,
        previouslastName: previouslastName || null,
        motherMaidenName: motherMaidenName || null,
        ssn: ssn || null,
        statementNote: null,
        language: language || null,
        email: email || null,
        pronouns: pronouns || PRONOUNS.NONE,
        race: race || RACE.OTHER,
        gender: gender || GENDERIDENTITY.NONE,
        sexAtBirth: sexAtBirth || GENDERIDENTITY.NONE,
        genderIdentity: genderIdentity || GENDERIDENTITY.NONE,
        maritialStatus: maritialStatus || MARITIALSTATUS.SINGLE,
        sexualOrientation: SEXUALORIENTATION.NONE,
        dob: dob || null,
        smsPermission: smsPermission === 'true' ? true : false,
        phonePermission: phonePermission === 'true' ? true : false,
        preferredCommunicationMethod: COMMUNICATIONTYPE.PHONE
      },
      createContactInput: {
        email: email || "",
        city: city || "",
        zipCode: zipCode || "",
        state: state || "",
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

    return patientInputs
  }

  /**
   * Creates patient appointment
   * @param form 
   * @param userForm 
   * @param inputs 
   * @returns patient appointment 
   */
  async createPatientAppointment(form: Form, userForm: UserForms, inputs: CreateUserFormInput): Promise<Appointment> {
    try {

      const { type, id, facilityId, practiceId } = form;
      const { userFormElements: userFormElementInputs } = inputs
      const formElements = await this.formService.getFormElements(id)
      //get patient inputs
      const patientInputs = await this.getInputValues(formElements, userForm, inputs)
      const { createPatientItemInput } = patientInputs
      const { email } = createPatientItemInput

      const facilityElement = formElements?.find(({ columnName }) => columnName === 'facilityId')
      const insuranceStatusElement = formElements?.find(({ columnName }) => columnName === 'insuranceStatus')
      if (type === FormType.APPOINTMENT) {
        const appointmentElement = formElements?.find(({ columnName }) => columnName === 'appointmentTypeId')
        const providerElement = formElements?.find(({ columnName }) => columnName === 'usualProviderId')

        if (appointmentElement) {
          const { fieldId } = appointmentElement
          const { fieldId: providerField } = providerElement || {}
          let facilityElementId = ''
          let insuranceStatus = ''

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

          if (insuranceStatusElement) {
            const { fieldId: insuranceStatusFieldId } = insuranceStatusElement;
            if (insuranceStatusFieldId) {
              const insuranceStatusItem = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === insuranceStatusFieldId)
              const { value } = insuranceStatusItem || {}
              insuranceStatus = value ? getInsuranceStatus(value) : ''
            }
          }

          if (appointmentTypeId && endTime && startTime) {

            const patientInput = {
              createPatientItemInput: {
                ...patientInputs.createPatientItemInput,
                facilityId: facilityElementId || facilityId || null,
                practiceId: practiceId || null,
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
            //get or create patient
            let patientInstance = null
            if (email) {
              const oldPatient = await this.patientService.GetPatientByEmail(email)
              if (oldPatient) {
                patientInstance = oldPatient
              }
              else {
                patientInstance = await this.patientService.createPatient(patientInput)
              }
            } else {
              patientInstance = await this.patientService.createPatient(patientInput)
            }

            //schedule appointment
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
                  primaryCareProviderId: doctorId || null,
                  orderOfBenefit: OrderOfBenefitType.PRIMARY
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
                organizationName: organizationName || null,
                insuranceStatus
              }

              const appointmentInstance = await this.appointmentService.createAppointment(appointmentInputs);
              if (transactionId) {
                const transactionInstance = await this.transactionService.getTransaction(transactionId)

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
                }
              }

              return appointmentInstance
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
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Updates patient appointment
   * @param form 
   * @param userForm 
   * @param inputs 
   * @returns patient appointment 
   */
  async updatePatientAppointment(form: Form, userForm: UserForms, inputs: CreateUserFormInput): Promise<Appointment> {
    try {
      const { type, id, facilityId, practiceId } = form;
      const { userFormElements: userFormElementInputs } = inputs
      const formElements = await this.formService.getFormElements(id)
      //get patient inputs
      const patientInputs = await this.getInputValues(formElements, userForm, inputs)

      const facilityElement = formElements?.find(({ columnName }) => columnName === 'facilityId')
      const insuranceStatusElement = formElements?.find(({ columnName }) => columnName === 'insuranceStatus');

      if (type === FormType.APPOINTMENT) {
        const appointmentElement = formElements?.find(({ columnName }) => columnName === 'appointmentTypeId')
        const providerElement = formElements?.find(({ columnName }) => columnName === 'usualProviderId')

        if (appointmentElement) {
          const { fieldId } = appointmentElement
          const { fieldId: providerField } = providerElement || {}
          let facilityElementId = ''
          let insuranceStatus = ''

          if (facilityElement) {
            const { fieldId: facilityFieldId } = facilityElement;
            if (facilityFieldId) {
              const facilityItem = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === facilityFieldId)
              const { value } = facilityItem || {}
              facilityElementId = value
            }
          }

          if (insuranceStatusElement) {
            const { fieldId: insuranceStatusFieldId } = insuranceStatusElement;
            if (insuranceStatusFieldId) {
              const insuranceStatusItem = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === insuranceStatusFieldId)
              const { value } = insuranceStatusItem || {}
              insuranceStatus = value ? getInsuranceStatus(value) : ''
            }
          }

          const appointmentTypeId = getCustomElementValue(userFormElementInputs, fieldId)
          const doctorId = getCustomElementValue(userFormElementInputs, providerField)
          const startTime = getCustomElementValue(userFormElementInputs, 'scheduleEndDateTime')
          const endTime = getCustomElementValue(userFormElementInputs, 'scheduleStartDateTime')
          const transactionId = getCustomElementValue(userFormElementInputs, 'transactionId')
          const appointmentId = getCustomElementValue(userFormElementInputs, 'appointmentId')
          const memberId = getCustomElementValue(userFormElementInputs, 'memberId')
          const groupNumber = getCustomElementValue(userFormElementInputs, 'groupNumber')
          const companyName = getCustomElementValue(userFormElementInputs, 'companyName')
          const organizationName = getCustomElementValue(userFormElementInputs, 'organizationName')
          const contractNo = getCustomElementValue(userFormElementInputs, 'contractNumber')

          if (appointmentId) {
            const oldAppointment = await this.appointmentService.getAppointment(appointmentId)

            if (oldAppointment) {
              const { appointment } = oldAppointment
              const { patientId, contract } = appointment

              if (patientId) {
                const {
                  createContactInput, createEmergencyContactInput, createEmployerInput, createGuarantorContactInput,
                  createGuardianContactInput, createNextOfKinContactInput, createPatientItemInput
                } = patientInputs

                //patient inputs
                const updatePatientInputs = {
                  updatePatientItemInput: {
                    ...createPatientItemInput,
                    id: patientId,
                    facilityId: facilityElementId || facilityId || null,
                  },
                  updateContactInput: createContactInput,
                  updateGuardianContactInput: createGuardianContactInput,
                  updateEmergencyContactInput: createEmergencyContactInput,
                  updateGuarantorContactInput: createGuarantorContactInput,
                  updateNextOfKinContactInput: createNextOfKinContactInput,
                  updateEmployerInput: createEmployerInput
                };

                //transaction ( Credit card , ach payment )
                if (transactionId) {
                  const transactionInstance = await this.transactionService.getTransaction(transactionId)

                  if (transactionInstance) {
                    transactionInstance.appointmentId = appointment.id
                    transactionInstance.patientId = patientId
                    transactionInstance.doctorId = appointment.providerId
                    transactionInstance.facilityId = appointment.facilityId
                    transactionInstance.patient = appointment.patient
                    transactionInstance.doctor = appointment.provider
                    transactionInstance.facility = appointment.facility
                    await this.transactionService.updateTransaction(transactionInstance)
                  }
                }

                //insurance
                if (companyName && groupNumber && memberId) {
                  const inputs = {
                    memberId,
                    groupNumber,
                    insuranceId: companyName,
                    patientId: patientId,
                    primaryCareProviderId: doctorId || null,
                    orderOfBenefit: OrderOfBenefitType.PRIMARY
                  }
                  await this.policyService.create(inputs)
                }

                //appointment inputs
                const appointmentInputs = {
                  paymentType: companyName ? PaymentType.INSURANCE : contractNo ? PaymentType.CONTRACT : PaymentType.SELF,
                  billingStatus: BillingStatus.DUE,
                  isExternal: true,
                  scheduleStartDateTime: startTime,
                  scheduleEndDateTime: endTime,
                  appointmentTypeId: appointmentTypeId || null,
                  facilityId: facilityElementId || facilityId || null,
                  providerId: doctorId || null,
                  patientId: patientId,
                  practiceId: practiceId || null,
                  insuranceStatus
                }
                let appointmentContract = null
                if (organizationName && contractNo) {
                  if (!contract) {
                    appointmentContract = await this.contractService.create({
                      contractNumber: contractNo || null,
                      organizationName: organizationName || null
                    })
                  } else {
                    appointmentContract = await this.contractService.update({
                      contractNumber: contractNo || null,
                      organizationName: organizationName || null
                    })
                  }
                }

                //update patient & appointment
                await this.patientService.updatePatientByFormBuilder(updatePatientInputs)
                const updateAppointment = await this.appointmentService.updateAppointment({ id: appointmentId, ...appointmentInputs })
                //associate contract
                if (appointmentContract) {
                  updateAppointment.contract = appointmentContract
                  const contractAppointment = await this.appointmentService.save(updateAppointment)
                  return contractAppointment
                }
                return updateAppointment
              }


            }
            else {
              throw new Error("Appointment not found");
            }
          }
        }
        else {
          throw new Error('Please provide service')
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Creates user forms service
   * @param input 
   * @returns create 
   */
  async create(input: CreateUserFormInput): Promise<AppointmentUserForm> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { userFormElements, FormId } = input
      const isOldForm = getCustomElementValue(userFormElements, 'userFormId')
      const formBuilder = await this.formService.getForm(FormId)
      const { form } = formBuilder;
      const { layout } = form
      const { tabs } = layout
      const isAppointmentForm = tabs?.some(({ sections }) => {
        return sections?.some(({ fields }) => {
          return fields?.some(({ apiCall }) => !!apiCall)
        })
      })
      const formInputs = isAppointmentForm ? userFormElements?.filter(({ FormsElementsId }) => isUuid(FormsElementsId)) : userFormElements
      if (!isOldForm) {
        //create form
        const newUserForms = this.userFormsRepository.create({ ...input, userFormElements: formInputs });
        newUserForms.form = form
        const userForm = await this.userFormsRepository.save(newUserForms)
        //create form elements
        const userFormEles = formInputs?.map((ele) => ({ ...ele, UsersFormsId: userForm?.id }))
        const formElements = await this.userFormElementService.createBulk(userFormEles, userForm);
        //create patient & appointment
        const appointment = await this.createPatientAppointment(form, userForm, input);
        const { patientId } = appointment || {}
        userForm.PatientId = patientId
        userForm.SubmitterId = patientId
        userForm.userFormElements = formElements
        const newForm = await this.userFormsRepository.save(newUserForms)
        await queryRunner.commitTransaction();
        return { userForm, appointment }
      }
      else {
        const oldForm = await this.userFormsRepository.findOne(isOldForm)
        if (oldForm) {

          const userFormEles = formInputs?.map((ele) => ({ ...ele, UsersFormsId: oldForm?.id }))
          const userFormElementInputs = await this.userFormElementService.updateBulk(userFormEles, oldForm);
          oldForm.userFormElements = userFormElementInputs
          const newUserForms = await this.userFormsRepository.save(oldForm);
          const appointment = await this.updatePatientAppointment(form, newUserForms, input);
          await queryRunner.commitTransaction();
          return { userForm: newUserForms, appointment }
        }
        throw new Error("Form not found");

      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }


  /**
   * Fetchs all
   * @param input 
   * @returns  
   */
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


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<UserForms> {
    return await this.userFormsRepository.findOne(id);
  }


  /**
   * Gets all
   * @param input 
   * @returns  
   */
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


  /**
   * Uploads user form media
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns user form media 
   */
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


  /**
   * Gets upload media
   * @param { url, formId } 
   * @returns upload media 
   */
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