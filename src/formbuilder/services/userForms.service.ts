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
  ) { }

  async createPatient() {

  }

  async createPatientAppointment(form: Form, userForm: UserForms) {
    const { type, id, facilityId } = form;
    const { userFormElements } = userForm;
    try {
      const formElements = await this.formService.getFormElements(id)
      const patientElements = formElements?.filter(({ tableName }) => tableName === 'Patients')
      const patientsInputs = patientElements?.map(({ fieldId }) => fieldId)
      const contactElements = formElements?.filter(({ tableName }) => tableName === 'Contacts')
      const contactInputs = contactElements?.map(({ fieldId }) => fieldId)
      const userPatientElements = userFormElements?.filter(({ FormsElementsId }) => patientsInputs?.includes(FormsElementsId))
      const userContactElements = userFormElements?.filter(({ FormsElementsId }) => contactInputs?.includes(FormsElementsId))
      const patient = {}
      patientElements?.map(({ columnName, fieldId }) => {
        const element = userPatientElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element
        return patient[columnName] = value
      })
      const contacts = {}
      contactElements?.map(({ columnName, fieldId }) => {
        const element = userContactElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
        const { value } = element
        return contacts[columnName] = value
      })

      if (type === FormType.PATIENT) {
        const {
          language, suffix, firstName, lastName, middleName, firstNameUsed, prefferedName, previousFirstName,
          previouslastName, motherMaidenName, ssn, dob, gender, homeBound, race, ethnicity, maritialStatus,
          genderIdentity, sexAtBirth, pronouns
        } = patient as Patient || {}

        const { zipCode, address, address2, city, state, country, name, relationship, phone, mobile, email, } = contacts as CreateContactInput || {}

        const inputs = {
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
            name: "",
            email: "",
            phone: phone || "",
            usualOccupation: "",
            industry: "",
            mobile: mobile || ""
          },
          createGuardianContactInput: {
            firstName: "",
            middleName: "",
            primaryContact: false,
            lastName: "",
            contactType: ContactType.GUARDIAN,
            suffix: "",
          },
          createEmergencyContactInput: {
            contactType: ContactType.EMERGENCY,
            name: name || "",
            phone: "",
            mobile: "",
            primaryContact: false,
            relationship: relationship || RelationshipType.OTHER,
            facilityId
          },
          createGuarantorContactInput: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            contactType: ContactType.GUARANDOR,
            relationship: RelationshipType.OTHER,
            employerName: "",
            address2: "",
            zipCode: "",
            city: "",
            state: "",
            phone: "",
            suffix: "",
            country: "",
            ssn: "000-00-0000",
            primaryContact: false,
            address: "",
          },
          createNextOfKinContactInput: {
            contactType: ContactType.NEXT_OF_KIN,
            name: "",
            phone: "",
            relationship: RelationshipType.OTHER,
            mobile: "",
            primaryContact: false,
          },
        };
        await this.patientService.createPatient(inputs)
      }

      else if (type === FormType.APPOINTMENT) {
        
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
      await this.createPatientAppointment(form, userForm);
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