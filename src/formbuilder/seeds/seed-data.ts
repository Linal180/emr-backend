import { v4 as uuid } from 'uuid';
import states from 'states-us'

import { FormType } from "../entities/form.entity";
import { ElementType } from "../entities/element.entity";
import { ContactType, RelationshipType } from 'src/providers/entities/contact.entity';
import { RACE, ETHNICITY, SEXUALORIENTATION, MARITIALSTATUS, GENDERIDENTITY, PRONOUNS, HOMEBOUND } from 'src/patients/entities/patient.entity'
import { formTemplateTabIds } from 'src/lib/constants';
import { FormTabs } from '../dto/form-payload.dto';
import { formatValue } from 'src/lib/helper';

//elements for seed
export const ElementTypeData = [
  { type: ElementType.CHECKBOX },
  { type: ElementType.DROPDOWN },
  { type: ElementType.DATE },
  { type: ElementType.FILE },
  { type: ElementType.EMAIL },
  { type: ElementType.NUMBER },
  { type: ElementType.RADIO },
  { type: ElementType.SELECT },
  { type: ElementType.TEXT },
  { type: ElementType.TEL },
  { type: ElementType.CUSTOM },
];

export enum FormBuilderPaymentTypes {
  INSURANCE = 'insurance',
  NO_INSURANCE = 'no_insurance',
  CONTRACT = 'contract',
  INTERNATIONAL_TRAVELER = 'international_traveler'
}

export const PAYMENT_TYPES = [
  {
    name: "No Insurance",
    value: FormBuilderPaymentTypes.NO_INSURANCE,
  },
  {
    name: "Insurance",
    value: FormBuilderPaymentTypes.INSURANCE,
  },
  {
    name: "International Traveler",
    value: FormBuilderPaymentTypes.INTERNATIONAL_TRAVELER,
  },
  {
    name: "Contract",
    value: FormBuilderPaymentTypes.CONTRACT,
  },
]

const MAPPED_RELATIONSHIP_TYPE = [
  { value: RelationshipType.WARD, name: RelationshipType.WARD },
  { value: RelationshipType.SELF, name: RelationshipType.SELF },
  { value: RelationshipType.CHILD, name: RelationshipType.CHILD },
  { value: RelationshipType.OTHER, name: RelationshipType.OTHER },
  { value: RelationshipType.MOTHER, name: RelationshipType.MOTHER },
  { value: RelationshipType.SPOUSE, name: RelationshipType.SPOUSE },
  { value: RelationshipType.FATHER, name: RelationshipType.FATHER },
  { value: RelationshipType.UNKNOWN, name: RelationshipType.UNKNOWN },
  { value: RelationshipType.EMPLOYEE, name: RelationshipType.EMPLOYEE },
  { value: RelationshipType.ORGAN_DONOR, name: RelationshipType.ORGAN_DONOR },
  { value: RelationshipType.GRANDCHILD, name: RelationshipType.GRANDCHILD },
  { value: RelationshipType.LIFE_PARTNER, name: RelationshipType.LIFE_PARTNER },
  { value: RelationshipType.GRANDPARENT, name: RelationshipType.GRANDPARENT },
  { value: RelationshipType.NEPHEW_NIECE, name: RelationshipType.NEPHEW_NIECE },
  { value: RelationshipType.FOSTER_CHILD, name: RelationshipType.FOSTER_CHILD },
  { value: RelationshipType.CADAVER_DONOR, name: RelationshipType.CADAVER_DONOR },
  { value: RelationshipType.SIGNIFICANT_OTHER, name: RelationshipType.SIGNIFICANT_OTHER },
  { value: RelationshipType.EMANCIPATED_MINOR, name: RelationshipType.EMANCIPATED_MINOR },
  { value: RelationshipType.INJURED_PLAINTIFF, name: RelationshipType.INJURED_PLAINTIFF },
  { value: RelationshipType.SPONSORED_DEPENDENT, name: RelationshipType.SPONSORED_DEPENDENT },
  { value: RelationshipType.STEPSON_STEPDAUGHTER, name: RelationshipType.STEPSON_STEPDAUGHTER },
  { value: RelationshipType.CHILD_MOTHER_INSURANCE, name: RelationshipType.CHILD_MOTHER_INSURANCE },
  { value: RelationshipType.HANDICAPPED_DEPENDENT, name: RelationshipType.HANDICAPPED_DEPENDENT },
  { value: RelationshipType.CHILD_FATHER_INSURANCE, name: RelationshipType.CHILD_FATHER_INSURANCE },
  { value: RelationshipType.DEPENDENT_OF_MINOR_DEPENDENT, name: RelationshipType.DEPENDENT_OF_MINOR_DEPENDENT },
  { value: RelationshipType.STEPSON_STEPDAUGHTER_STEPFATHER_INSURANCE, name: RelationshipType.STEPSON_STEPDAUGHTER_STEPFATHER_INSURANCE, },
  { value: RelationshipType.STEPSON_STEPDAUGHTER_STEPMOTHER_INSURANCE, name: RelationshipType.STEPSON_STEPDAUGHTER_STEPMOTHER_INSURANCE, },
];

const MAPPED_GUARANTOR_RELATIONSHIP_TYPE = [
  { value: RelationshipType.MOTHER, name: RelationshipType.MOTHER },
  { value: RelationshipType.FATHER, name: RelationshipType.FATHER },
  { value: RelationshipType.OTHER, name: RelationshipType.OTHER },
]

const MAPPED_RACE = [
  { value: RACE.OTHER, name: RACE.OTHER },
  { value: RACE.ASIAN, name: RACE.ASIAN },
  { value: RACE.WHITE, name: RACE.WHITE },
  {
    value: RACE.BLACK_AFRICAN_AMERICAN,
    name: RACE.BLACK_AFRICAN_AMERICAN,
  },
  {
    value: RACE.AMERICAN_INDIAN_ALASKA_NATIVE,
    name: RACE.AMERICAN_INDIAN_ALASKA_NATIVE,
  },
  {
    value: RACE.NATIVE_HAWAIIAN_PACIFIC_ISLANDER,
    name: RACE.NATIVE_HAWAIIAN_PACIFIC_ISLANDER,
  },
];

const MAPPED_ETHNICITY = [
  { value: formatValue(ETHNICITY.NONE), name: ETHNICITY.NONE },
  { value: ETHNICITY.HISPANIC_OR_LATINO, name: ETHNICITY.HISPANIC_OR_LATINO },
  { value: ETHNICITY.NOT_HISPANIC_OR_LATINO, name: ETHNICITY.NOT_HISPANIC_OR_LATINO },
  { value: ETHNICITY.DECLINE_TO_SPECIFY, name: ETHNICITY.DECLINE_TO_SPECIFY }
];

const MAPPED_SEXUAL_ORIENTATION = [
  { value: SEXUALORIENTATION.NONE, name: SEXUALORIENTATION.NONE },
  { value: SEXUALORIENTATION.DONT_KNOW, name: SEXUALORIENTATION.DONT_KNOW, },
  { value: SEXUALORIENTATION.BISEXUAL, name: SEXUALORIENTATION.BISEXUAL, },
  { value: SEXUALORIENTATION.HOMOSEXUAL, name: SEXUALORIENTATION.HOMOSEXUAL, },
  { value: SEXUALORIENTATION.HETEROSEXUAL, name: SEXUALORIENTATION.HETEROSEXUAL, },
];

const MAPPED_HOMEBOUND = [
  { value: HOMEBOUND.NO, name: HOMEBOUND.NO },
  { value: HOMEBOUND.YES, name: HOMEBOUND.YES },
];

const MAPPED_GENDER_IDENTITY = [
  { value: GENDERIDENTITY.MALE, name: "Male" },
  { value: GENDERIDENTITY.FEMALE, name: "Female" },
  { value: GENDERIDENTITY.NONE, name: GENDERIDENTITY.NONE },
];

const MAPPED_MARITAL_STATUS = [
  { value: MARITIALSTATUS.SINGLE, name: MARITIALSTATUS.SINGLE },
  { value: MARITIALSTATUS.MARRIED, name: MARITIALSTATUS.MARRIED },
  { value: MARITIALSTATUS.WIDOWED, name: MARITIALSTATUS.WIDOWED },
  { value: MARITIALSTATUS.DIVORCED, name: MARITIALSTATUS.DIVORCED },
  { value: MARITIALSTATUS.SEPARATED, name: MARITIALSTATUS.SEPARATED },
];

const MAPPED_PRONOUNS = [
  { value: PRONOUNS.HE, name: PRONOUNS.HE },
  { value: PRONOUNS.SHE, name: PRONOUNS.SHE },
  { value: PRONOUNS.NONE, name: PRONOUNS.NONE },
];

const MAPPED_STATES = states?.map(({ name, abbreviation }) => ({ value: name, name: `${name} - ${abbreviation}` }))

export enum FormBuilderApiSelector {
  SERVICE_SLOT = 'serviceSlot',
  PAYMENT_TYPE = 'paymentType',
  SERVICE_SELECT = 'serviceSelect',
  PATIENT_CONSENT = 'patientConsent',
  TERMS_CONDITIONS = 'termsConditions',
  FACILITY_PROVIDERS = 'facilityProviders',
  INSURANCE_CARD_BACK = 'insuranceCardBack',
  PRACTICE_FACILITIES = 'practiceFacilities',
  DRIVING_LICENSE_BACK = 'drivingLicenseBack',
  INSURANCE_CARD_FRONT = 'insuranceCardFront',
  DRIVING_LICENSE_FRONT = 'drivingLicenseFront',
}

const guarantorFields = [
  {
    css: "",
    name: "relationship",
    columnName: "relationship",
    tableName: "Contacts",
    tableContactType: ContactType.GUARANDOR,
    type: ElementType.SELECT,
    label: "Patient’s Relationship with guarantor",
    column: 4,
    fieldId: uuid(),
    options: MAPPED_GUARANTOR_RELATIONSHIP_TYPE,
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Patient’s Relationship with guarantor",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: ''
  },
  {
    css: "",
    name: "firstName",
    columnName: "firstName",
    tableName: "Contacts",
    type: ElementType.TEXT,
    tableContactType: ContactType.GUARANDOR,
    label: "First Name",
    column: 4,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Please enter first name",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: '',
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "lastName",
    columnName: "lastName",
    tableName: "Contacts",
    type: ElementType.TEXT,
    tableContactType: ContactType.GUARANDOR,
    label: "Last Name",
    column: 4,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Please enter last name",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: '',
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "phone",
    columnName: "phone",
    tableName: "Contacts",
    type: ElementType.TEL,
    tableContactType: ContactType.GUARANDOR,
    label: "Home Phone",
    column: 4,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Please enter your Home Phone",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: ''
  },
  {
    css: "",
    name: "address1",
    columnName: "address",
    tableName: "Contacts",
    type: ElementType.TEXT,
    tableContactType: ContactType.GUARANDOR,
    label: "Address",
    column: 8,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Please enter your address",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: ''
  }
]

const documentFields = [
  {
    css: "",
    name: "drivingLicenseFront",
    columnName: "",
    tableName: "",
    type: ElementType.CUSTOM,
    label: "Identification Card Front (ID/ Passport/ Driver License)",
    column: 6,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Drop your image here, or browse",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: FormBuilderApiSelector.DRIVING_LICENSE_FRONT,
    tableContactType: null
  },
  {
    css: "",
    name: "drivingLicenseBack",
    columnName: "",
    tableName: "",
    type: ElementType.CUSTOM,
    label: "Identification Card Back (ID/ Passport/ Driver License)",
    column: 6,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    placeholder: "Drop your image here, or browse",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: FormBuilderApiSelector.DRIVING_LICENSE_BACK,
    tableContactType: null
  },
  {
    css: "",
    name: "insuranceCardFront",
    columnName: "insuranceCard",
    tableName: "",
    type: ElementType.CUSTOM,
    label: "Insurance Card Front",
    column: 6,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    placeholder: "Drop your image here, or browse",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: FormBuilderApiSelector.INSURANCE_CARD_FRONT,
    tableContactType: null
  },
  {
    css: "",
    name: "insuranceCardBack",
    columnName: "insuranceCard",
    tableName: "",
    type: ElementType.CUSTOM,
    label: "Insurance Card Back",
    column: 6,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    placeholder: "Drop your image here, or browse",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: FormBuilderApiSelector.INSURANCE_CARD_BACK,
    tableContactType: null
  }
]

const slotsFields = [
  {
    css: "",
    name: "slot",
    type: ElementType.CUSTOM,
    label: "Available Slots",
    column: 12,
    apiCall: FormBuilderApiSelector.SERVICE_SLOT,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Appointments",
    columnName: "appointmentDate",
    placeholder: "Please select a Slot",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
  },
]

const patientInfoFields = [
  {
    css: "",
    name: "firstName",
    type: ElementType.TEXT,
    label: "First Name",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Patients",
    columnName: "firstName",
    placeholder: "Please enter your First Name",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "middleName",
    type: ElementType.TEXT,
    label: "Middle Name",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Patients",
    columnName: "middleName",
    placeholder: "Please enter your Middle Name",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "lastName",
    type: ElementType.TEXT,
    label: "Last Name",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Patients",
    columnName: "lastName",
    placeholder: "Please enter your Last Name",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "email",
    columnName: "email",
    tableName: "Contacts",
    type: ElementType.EMAIL,
    tableContactType: ContactType.SELF,
    label: "Email",
    column: 4,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    placeholder: "Please enter your email address",
    defaultValue: "",
    isMultiSelect: false,
    apiCall: ''
  },
  {
    css: "",
    name: "dob",
    type: ElementType.DATE,
    label: "Date of Birth",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Patients",
    columnName: "dob",
    placeholder: "Please select your date of birth",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
    futureEnable: false,
    pastEnable: true
  },
  {
    css: "",
    name: "phone",
    type: ElementType.TEL,
    label: "Phone",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Contacts",
    columnName: "phone",
    placeholder: "Please enter your Home Phone",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
  },
]

const demographicsFields = [
  // {
  //   css: "",
  //   name: "language",
  //   type: ElementType.TEXT,
  //   label: "Language Spoken",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: [],
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "language",
  //   placeholder: "Please enter Language Spoken",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
  {
    css: "",
    name: "race",
    type: ElementType.SELECT,
    label: "Race",
    column: 6,
    apiCall: "",
    fieldId: uuid(),
    options: MAPPED_RACE,
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Patients",
    columnName: "race",
    placeholder: "Please select your race",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
  },
  {
    css: "",
    name: "ethnicity",
    type: ElementType.SELECT,
    label: "Ethnicity",
    column: 6,
    apiCall: "",
    fieldId: uuid(),
    options: MAPPED_ETHNICITY,
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Patients",
    columnName: "ethnicity",
    placeholder: "Please select your Ethnicity",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
  },
  {
    css: "",
    name: "maritialStatus",
    type: ElementType.SELECT,
    label: "Marital Status",
    column: 6,
    apiCall: "",
    fieldId: uuid(),
    options: MAPPED_MARITAL_STATUS,
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Patients",
    columnName: "maritialStatus",
    placeholder: "Please select a Marital Status",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
  },
  // {
  //   css: "",
  //   name: "sexualOrientation",
  //   type: ElementType.SELECT,
  //   label: "Sexual Orientation",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: MAPPED_SEXUAL_ORIENTATION,
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "sexualOrientation",
  //   placeholder: "Please enter Sexual Orientation",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
  // {
  //   css: "",
  //   name: "genderIdentity",
  //   type: ElementType.SELECT,
  //   label: "Gender Identity",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: MAPPED_GENDER_IDENTITY,
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "genderIdentity",
  //   placeholder: "Please select your Gender Identity",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
  // {
  //   css: "",
  //   name: "sexAtBirth",
  //   type: ElementType.SELECT,
  //   label: "Sex At Birth",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: MAPPED_GENDER_IDENTITY,
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "sexAtBirth",
  //   placeholder: "Please select your Sex At Birth",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
  // {
  //   css: "",
  //   name: "pronouns",
  //   type: ElementType.SELECT,
  //   label: "Pronouns",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: MAPPED_PRONOUNS,
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "pronouns",
  //   placeholder: "Please select pronouns",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
  // {
  //   css: "",
  //   name: "homeBound",
  //   type: ElementType.RADIO,
  //   label: "Home Bound",
  //   column: 6,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: [
  //     {
  //       name: "No",
  //       value: "No",
  //     },
  //     {
  //       name: "Yes",
  //       value: "Yes",
  //     },
  //   ],
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Patients",
  //   columnName: "homeBound",
  //   placeholder: "Please select Home Bound",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: null,
  // },
]

const contactInfoFields = [
  {
    css: "",
    name: "zipCode",
    type: ElementType.TEXT,
    label: "Zip Code",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Contacts",
    columnName: "zipCode",
    placeholder: "Please enter zip code",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
    regex: '/^[0-9]{5}(?:-[0-9]{4})?$/'
  },
  {
    css: "",
    name: "address1",
    type: ElementType.TEXT,
    label: "Address",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Contacts",
    columnName: "address",
    placeholder: "Please enter your address",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
  },
  {
    css: "",
    name: "address-2",
    type: ElementType.TEXT,
    label: "Address 2",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Contacts",
    columnName: "address2",
    placeholder: "Please enter your address 2",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
  },
  {
    css: "",
    name: "city",
    type: ElementType.TEXT,
    label: "City",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Contacts",
    columnName: "city",
    placeholder: "Please enter your city",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
    regex: '/^[A-Za-z\\s]+$/'
  },
  {
    css: "",
    name: "state",
    type: ElementType.DROPDOWN,
    label: "State",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: MAPPED_STATES,
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Contacts",
    columnName: "state",
    placeholder: "Please select your state",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "Self",
  },
  {
    css: "",
    name: "country",
    type: ElementType.SELECT,
    label: "Country",
    column: 4,
    apiCall: "",
    fieldId: uuid(),
    options: [
      {
        name: "United States",
        value: "United States",
      },
    ],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Contacts",
    columnName: "country",
    placeholder: "Please Select a country",
    defaultValue: "United States",
    isMultiSelect: false,
    tableContactType: "Self",
  },
  // {
  //   css: "",
  //   name: "mobile",
  //   type: ElementType.TEL,
  //   label: "Mobile Phone",
  //   column: 4,
  //   apiCall: "",
  //   fieldId: uuid(),
  //   options: [],
  //   errorMsg: "",
  //   required: false,
  //   textArea: false,
  //   tableName: "Contacts",
  //   columnName: "mobile",
  //   placeholder: "Please enter your Mobile Phone",
  //   defaultValue: "",
  //   isMultiSelect: false,
  //   tableContactType: "Self",
  // },
]

const facilityServicesFields = [
  {
    css: "",
    name: "appointmentType",
    type: ElementType.CUSTOM,
    label: "Appointment Type",
    column: 12,
    apiCall: FormBuilderApiSelector.SERVICE_SELECT,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: true,
    textArea: false,
    tableName: "Appointments",
    columnName: "appointmentTypeId",
    placeholder: "Please select a Appointment Type",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: null,
  },
  {
    css: "",
    name: "usualProviderId",
    type: ElementType.CUSTOM,
    label: "Usual Provider ",
    column: 12,
    apiCall: FormBuilderApiSelector.FACILITY_PROVIDERS,
    fieldId: uuid(),
    options: [],
    errorMsg: "",
    required: false,
    textArea: false,
    tableName: "Patients",
    columnName: "usualProviderId",
    placeholder: "Usual Provider",
    defaultValue: "",
    isMultiSelect: false,
    tableContactType: "",
  },
]

const practiceServicesFields = [{
  css: "",
  name: "facilityId",
  type: ElementType.CUSTOM,
  label: "Facility",
  column: 12,
  apiCall: FormBuilderApiSelector.PRACTICE_FACILITIES,
  fieldId: uuid(),
  options: [],
  errorMsg: "",
  required: true,
  textArea: false,
  placeholder: "",
  defaultValue: "",
  isMultiSelect: false,
  tableName: "Appointments",
  columnName: "facilityId",
}, ...facilityServicesFields]

const facilityAppointment: FormTabs[] = [
  {
    id: uuid(),
    name: "Select Services",
    tabId: formTemplateTabIds.SELECT_SERVICES,
    sections: [
      {
        id: uuid(),
        col: 6,
        name: "Select Services",
        fields: facilityServicesFields
      },
      {
        id: uuid(),
        col: 6,
        name: "Available Slots",
        fields: slotsFields,
      },
      {
        id: uuid(),
        col: 12,
        name: "Patient Info",
        fields: patientInfoFields
      },
      {
        id: uuid(),
        col: 12,
        name: "Demographics",
        fields: demographicsFields
      }
    ]
  },
  {
    id: uuid(),
    name: "Contact Info",
    tabId: formTemplateTabIds.CONTACT_INFO,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Contact Info",
      fields: contactInfoFields
    }],
  },
  {
    id: uuid(),
    name: "Privacy Policy",
    tabId: formTemplateTabIds.PRIVACY_POLICY,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Privacy",
      fields: [
        {
          css: "",
          name: "privacy",
          type: ElementType.CUSTOM,
          label: "Privacy",
          column: 12,
          apiCall: FormBuilderApiSelector.PATIENT_CONSENT,
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: true,
          textArea: false,
          placeholder: "",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: null,
          columnName: null,
          tableName: null
        },
      ]
    }]
  },
  {
    id: uuid(),
    name: "Emergency Contact",
    tabId: formTemplateTabIds.EMERGENCY_CONTACT,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Emergency Contact",
      sectionId: formTemplateTabIds.EMERGENCY_CONTACT,
      fields: [
        {
          css: "",
          name: "name",
          type: ElementType.TEXT,
          label: "Name",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "name",
          placeholder: "Please enter your name",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: null,
        },
        {
          css: "",
          name: "relationship",
          type: ElementType.SELECT,
          label: "Relationship",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: MAPPED_RELATIONSHIP_TYPE,
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "relationship",
          placeholder: "Please select a relationship",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "Emergency",
        },
        {
          css: "",
          name: "phone",
          type: ElementType.TEL,
          label: "Home Phone",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "phone",
          placeholder: "Please enter your Home Phone",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "Emergency",
        },
        {
          css: "",
          name: "mobile",
          type: ElementType.TEL,
          label: "Mobile Phone",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "mobile",
          placeholder: "Please enter Mobile Phone",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "Emergency",
        },
      ]
    }],
  },
  {
    id: uuid(),
    name: "Guardian Contact",
    tabId: formTemplateTabIds.GUARDIAN_CONTACT,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Guardian",
      sectionId: formTemplateTabIds.GUARDIAN_CONTACT,
      fields: [
        {
          css: "",
          name: "firstName",
          type: ElementType.TEXT,
          label: "First Name",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "firstName",
          placeholder: "Please enter first name",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "guardian",
          regex: '/^[A-Za-z\\s]+$/'
        },
        {
          css: "",
          name: "middleName",
          type: ElementType.TEXT,
          label: "Middle Name",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "middleName",
          placeholder: "Please enter middle name",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "guardian",
          regex: '/^[A-Za-z\\s]+$/'
        },
        {
          css: "",
          name: "lastName",
          type: ElementType.TEXT,
          label: "Last Name",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "lastName",
          placeholder: "Please enter last name",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "guardian",
          regex: '/^[A-Za-z\\s]+$/'
        },
        {
          css: "",
          name: "suffix",
          type: ElementType.TEXT,
          label: "Suffix",
          column: 6,
          apiCall: "",
          fieldId: uuid(),
          options: [],
          errorMsg: "",
          required: false,
          textArea: false,
          tableName: "Contacts",
          columnName: "suffix",
          placeholder: "Please enter Suffix",
          defaultValue: "",
          isMultiSelect: false,
          tableContactType: "guardian",
        },
      ]
    }],
  },
  // {
  //   id: uuid(),
  //   name: "Employment Info",
  //   tabId: formTemplateTabIds.EMPLOYMENT_INFO,
  //   sections: [{
  //     id: uuid(),
  //     col: 12,
  //     name: "Employment",
  //     sectionId: formTemplateTabIds.EMPLOYMENT_INFO,
  //     fields: [
  //       {
  //         css: "",
  //         name: "name",
  //         type: ElementType.TEXT,
  //         label: "Employer Name",
  //         column: 6,
  //         apiCall: "",
  //         fieldId: uuid(),
  //         options: [],
  //         errorMsg: "",
  //         required: false,
  //         textArea: false,
  //         tableName: "Employers",
  //         columnName: "name",
  //         placeholder: "Please enter employer name",
  //         defaultValue: "",
  //         isMultiSelect: false,
  //         tableContactType: "",
  //       },
  //       {
  //         css: "",
  //         name: "phone",
  //         type: ElementType.TEL,
  //         label: "Employer Phone",
  //         column: 6,
  //         apiCall: "",
  //         fieldId: uuid(),
  //         options: [],
  //         errorMsg: "",
  //         required: false,
  //         textArea: false,
  //         tableName: "Employers",
  //         columnName: "phone",
  //         placeholder: "Please enter employer phone",
  //         defaultValue: "",
  //         isMultiSelect: false,
  //         tableContactType: "",
  //       },
  //       {
  //         css: "",
  //         name: "usualOccupation",
  //         type: ElementType.TEXT,
  //         label: "Usual Occupation (Current or Most Recent)",
  //         column: 6,
  //         apiCall: "",
  //         fieldId: uuid(),
  //         options: [],
  //         errorMsg: "",
  //         required: false,
  //         textArea: false,
  //         tableName: "Employers",
  //         columnName: "usualOccupation",
  //         placeholder: "Please enter Usual Occupation (Current or Most Recent)",
  //         defaultValue: "",
  //         isMultiSelect: false,
  //         tableContactType: "",
  //       },
  //       {
  //         css: "",
  //         name: "industry",
  //         type: ElementType.TEXT,
  //         label: "Usual Industry",
  //         column: 6,
  //         apiCall: "",
  //         fieldId: uuid(),
  //         options: [],
  //         errorMsg: "",
  //         required: false,
  //         textArea: false,
  //         tableName: "Employers",
  //         columnName: "industry",
  //         placeholder: "Please enter Usual Industry",
  //         defaultValue: "",
  //         isMultiSelect: false,
  //         tableContactType: "",
  //       },
  //     ]
  //   }],
  // },
  {
    id: uuid(),
    name: "Guarantor Contact",
    tabId: formTemplateTabIds.GUARANTOR_CONTACT,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Guarantor",
      sectionId: formTemplateTabIds.GUARANTOR_CONTACT,
      fields: guarantorFields
    }],
  },
  {
    id: uuid(),
    name: "Payment Info",
    tabId: formTemplateTabIds.PAYMENT_INFO,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Payment",
      fields: [
        {
          css: "",
          name: "paymentType",
          type: ElementType.CUSTOM,
          label: "How will you be covering your visit?",
          column: 12,
          apiCall: FormBuilderApiSelector.PAYMENT_TYPE,
          fieldId: uuid(),
          options: PAYMENT_TYPES,
          errorMsg: "",
          required: true,
          textArea: false,
          placeholder: "",
          defaultValue: "",
          isMultiSelect: false,
          tableName: "Appointments",
          columnName: "insuranceStatus",
          tableContactType: null
        },
      ]
    }]
  },
  {
    id: uuid(),
    name: "Document Verification",
    tabId: formTemplateTabIds.DOCUMENT_VERIFICATION,
    sections: [{
      id: uuid(),
      col: 12,
      name: "Document Verification",
      fields: documentFields
    }]
  },
  {
    id: uuid(),
    name: "Consent",
    tabId: formTemplateTabIds.PRIVACY_AGREEMENT,
    sections:
      [{
        id: uuid(),
        col: 12,
        name: "User data privacy & TOS agreement.",
        fields: [
          {
            css: "",
            name: "terms",
            type: ElementType.CUSTOM,
            label: "I agree to all terms and agreement",
            column: 12,
            apiCall: FormBuilderApiSelector.TERMS_CONDITIONS,
            fieldId: uuid(),
            options: [],
            errorMsg: "",
            required: true,
            textArea: false,
            placeholder: "",
            defaultValue: "",
            isMultiSelect: false,
            tableContactType: null,
            columnName: null,
            tableName: null
          },
        ]
      }]
  }
]

const practiceAppointment = facilityAppointment?.map((tab) => {
  const { name, sections } = tab

  if (name === 'Select Services') {
    const arr = sections?.map((section, index) => index === 0 ? { ...section, fields: practiceServicesFields } : section)

    return { ...tab, sections: arr }
  }
  return tab
})


const oneStepFacilityForm = facilityAppointment?.map(({ sections }) => sections)?.flat(1)
  ?.filter(({ name }) => name !== 'Document Verification' && name !== 'Payment');

const oneStepPracticeForm = practiceAppointment?.map(({ sections }) => sections)?.flat(1)
  ?.filter(({ name }) => name !== 'Document Verification' && name !== 'Payment');

//Form template
export const FormTemplates = [
  {
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Section",
            fields: [
              {
                css: "",
                name: "location",
                type: ElementType.SELECT,
                label: "Location",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Medial",
                    value: "medial",
                  },
                  {
                    name: "Lateral",
                    value: "lateral",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please select Locations",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "location_comments",
                type: ElementType.TEXT,
                label: "Location Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter location comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "quality",
                type: ElementType.SELECT,
                label: "Quality",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Not Known",
                    value: "not_known",
                  },
                  {
                    name: "Aching",
                    value: " aching",
                  },
                  {
                    name: "Acute",
                    value: "acute",
                  },
                  {
                    name: "Burning",
                    value: "burning",
                  },
                  {
                    name: "Chronic",
                    value: "chronic",
                  },
                  {
                    name: "Constant",
                    value: "constant",
                  },
                  {
                    name: "Cramping",
                    value: "cramping",
                  },
                  {
                    name: "Crushing",
                    value: "crushing",
                  },
                  {
                    name: "Dull",
                    value: "dull",
                  },
                  {
                    name: "Electrical",
                    value: "electrical",
                  },
                  {
                    name: "Radiating Pain",
                    value: "radiating_pain",
                  },
                  {
                    name: "Sharp",
                    value: "sharp",
                  },
                  {
                    name: "Stabbing",
                    value: "stabbing",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please select qualities",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "quality_comments",
                type: ElementType.TEXT,
                label: "Quality Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Quality Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "severity",
                type: ElementType.SELECT,
                label: "Severity",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "1 out of 10",
                    value: "1_out_of_10",
                  },
                  {
                    name: "2 out of 10",
                    value: "2_out_of_10",
                  },
                  {
                    name: "3 out of 10",
                    value: "3_out_of_10",
                  },
                  {
                    name: "4 out of 10",
                    value: "4_out_of_10",
                  },
                  {
                    name: "5 out of 10",
                    value: "5_out_of_10",
                  },
                  {
                    name: "6 out of 10",
                    value: "6_out_of_10",
                  },
                  {
                    name: "7 out of 10",
                    value: "7_out_of_10",
                  },
                  {
                    name: "8 out of 10",
                    value: "8_out_of_10",
                  },
                  {
                    name: "9 out of 10",
                    value: "9_out_of_10",
                  },
                  {
                    name: "10 out of 10",
                    value: "10_out_of_10",
                  },
                  {
                    name: "Acute Distress",
                    value: "acute_distress",
                  },
                  {
                    name: "Critical",
                    value: "critical",
                  },
                  {
                    name: "LOC",
                    value: "loc",
                  },
                  {
                    name: "Mild",
                    value: "mild",
                  },
                  {
                    name: "Mild to Moderate",
                    value: "mild_to_moderate",
                  },
                  {
                    name: "Moderate",
                    value: "moderate",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please select Severity",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "severity_comments",
                type: ElementType.TEXT,
                label: "Severity Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Severity Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "duration",
                type: ElementType.SELECT,
                label: "Duration",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Getting Better",
                    value: "getting_better",
                  },
                  {
                    name: "Steady",
                    value: "steady",
                  },
                  {
                    name: " Have been increasing since onset",
                    value: "have_been_increasing_since_onset",
                  },
                  {
                    name: " % of time symptoms are experienced as in SOAP",
                    value: " % of time symptoms are experienced as in SOAP",
                  },
                  {
                    name: " has had same/similar condition in the past",
                    value: " has had same/similar condition in the past",
                  },
                  {
                    name: " Most symptomatic in morning",
                    value: " most symptomatic in morning",
                  },
                  {
                    name: "Most symptomatic in mid day",
                    value: "most symptomatic in mid day",
                  },
                  {
                    name: "Most symptomatic in evening",
                    value: "most symptomatic in evening",
                  },
                  {
                    name: "Wakes up from sleep",
                    value: "wakes up from sleep",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please select duration",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "duration_comments",
                type: ElementType.TEXT,
                label: "Duration Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Duration Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "onset_or_timing",
                type: ElementType.SELECT,
                label: "Onset / Timing",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Abrupt",
                    value: "abrupt",
                  },
                  {
                    name: "After Meal",
                    value: "after_meal",
                  },
                  {
                    name: "At Rest",
                    value: "at_rest",
                  },
                  {
                    name: "Awakened from Sleep",
                    value: "awakened_from_sleep",
                  },
                  {
                    name: "Continuous",
                    value: "continuous",
                  },
                  {
                    name: "Date of Occurrence",
                    value: "date_of_occurrence",
                  },
                  {
                    name: "Episodes",
                    value: "episodes",
                  },
                  {
                    name: "Gradual",
                    value: "gradual",
                  },
                  {
                    name: "Intermittent",
                    value: "intermittent",
                  },
                  {
                    name: "Primarily Nocturnal",
                    value: "primarily_nocturnal",
                  },
                  {
                    name: "Time not known",
                    value: "time_not_known",
                  },
                  {
                    name: "1 Day Ago",
                    value: "1_day_ago",
                  },
                  {
                    name: "Days Ago",
                    value: "days_ago",
                  },
                  {
                    name: "1 Week Ago",
                    value: "1_week_ago",
                  },
                  {
                    name: "Weeks ago",
                    value: "weeks_ago",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please Select Onset / Timing",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "onset_comments",
                type: ElementType.TEXT,
                label: "Onset Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Onset Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "context",
                type: ElementType.SELECT,
                label: "Context",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "At rest",
                    value: "at_rest",
                  },
                  {
                    name: "During physical exertion",
                    value: "during_physical_exertion",
                  },
                  {
                    name: "During mental exertion",
                    value: "during_mental_exertion",
                  },
                  {
                    name: "During a sporting activity",
                    value: "during_a_sporting_activity",
                  },
                  {
                    name: "At work",
                    value: "at_work",
                  },
                  {
                    name: "With familial stress",
                    value: "with_familial_stress",
                  },
                  {
                    name: "Mechanism issues",
                    value: "mechanism_issues",
                  },
                  {
                    name: "Post hospital visit",
                    value: "post_hospital_visit",
                  },
                  {
                    name: "Pre hospital visit",
                    value: "pre_hospital_visit",
                  },
                  {
                    name: "Gegan after discharge from hospital",
                    value: "began_after_discharge_from_hospital",
                  },
                  {
                    name: "He/She was recently treated by doctor",
                    value: "he/she_was_recently_treated_by_doctor",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please  select Contexts",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "context_comments",
                type: ElementType.TEXT,
                label: "Context Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Context Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "modifying_factors",
                type: ElementType.SELECT,
                label: "Modifying Factors",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Abated on their own",
                    value: "abated_on_their_own",
                  },
                  {
                    name: "Abated when on medication(s)",
                    value: "abated_when_on_medication(s)",
                  },
                  {
                    name: "Increased with inspiration",
                    value: "increased_with_inspiration",
                  },
                  {
                    name: "Exacerbate with movement",
                    value: "exacerbate_with_movement",
                  },
                  {
                    name: "Decrease with movement",
                    value: " decrease_with_movement",
                  },
                  {
                    name: "Have partially resolved seemingly on their own",
                    value: "have_partially_resolved_seemingly_on_their_own",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please select Modifying Factors",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "modifying_factors_comments",
                type: ElementType.TEXT,
                label: "Modifying Factors Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Modifying Factors Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "associated_symptoms",
                type: ElementType.SELECT,
                label: "Associated Symptoms",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Numbness",
                    value: "numbness",
                  },
                  {
                    name: "Tingling",
                    value: "tingling",
                  },
                  {
                    name: "Weakness",
                    value: "weakness",
                  },
                  {
                    name: "Headache",
                    value: "headache",
                  },
                  {
                    name: "Change in vision",
                    value: "change_in_vision",
                  },
                  {
                    name: "Dizziness",
                    value: "dizziness",
                  },
                  {
                    name: "Loss of bowel control",
                    value: "loss_of_bowel_control",
                  },
                  {
                    name: "Loss of bladder control",
                    value: "loss_of_bladder_control",
                  },
                  {
                    name: "Sexual dysfunction",
                    value: "sexual_dysfunction",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please Select Associated Symptoms",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "associated_symptoms_comments",
                type: ElementType.TEXT,
                label: "Associated Symptoms Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Associated Symptoms Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "944d6a43-372d-46d4-9b73-430928930df0",
                type: ElementType.TEXT,
                label: "Previous Treatment",
                column: 12,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                tableName: null,
                columnName: null,
                placeholder: "Please enter Previous Treatment",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
            ],
          },
        ],
      }]
    },
    name: "H&P CC / History of Present Illness",
    type: FormType.TEMPLATE,
    isSystemForm: true,
    isActive: true,
  },
  {
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "SOAP Plan",
            isActive: true,
            fields: [
              {
                css: "",
                name: "labs",
                type: ElementType.SELECT,
                label: "Labs",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "LABS (to be done at Quest)",
                    value: "LABS (to be done at Quest)",
                  },
                  {
                    name: "LABS (to be done at LabCorp)",
                    value: "LABS (to be done at LabCorp)",
                  },
                  {
                    name: "LABS (to be done at Athena)",
                    value: "LABS (to be done at Athena)",
                  },
                  {
                    name: "Electrolyte panel",
                    value: "Electrolyte panel",
                  },
                  {
                    name: "Hepatic function panel",
                    value: "Hepatic function panel",
                  },
                  {
                    name: "Basic metabolic panel",
                    value: "Basic metabolic panel",
                  },
                  {
                    name: "Carbamazepine level",
                    value: "Carbamazepine level",
                  },
                  {
                    name: "Comp metabolic panel",
                    value: "Comp metabolic panel",
                  },
                  {
                    name: "Lipid panel",
                    value: "Lipid panel",
                  },
                  {
                    name: "Hepatitis panel",
                    value: "Hepatitis panel",
                  },
                  {
                    name: "Hypercoagulation Panel: Protein C; Protein S; Cardiolipin Ab; Russel viper venom; Antithrombin III; APCR; ANA; Sed rate",
                    value:
                      "Hypercoagulation Panel: Protein C; Protein S; Cardiolipin Ab; Russel viper venom; Antithrombin III; APCR; ANA; Sed rate",
                  },
                  {
                    name: "Homocysteine",
                    value: "Homocysteine",
                  },
                  {
                    name: "Autoimmune Panel: ANA; Anti SSA/SSB; Actin Ab IgG; Scleroderma Ab; Anti Jo-1 Ab; Anti DNA-DS; Anti RNP",
                    value:
                      "Autoimmune Panel: ANA; Anti SSA/SSB; Actin Ab IgG; Scleroderma Ab; Anti Jo-1 Ab; Anti DNA-DS; Anti RNP",
                  },
                  {
                    name: "Immunologic Indicated Panel: ANA; Rheum Arth factor; Complement C3; Immunofixation; IgA; IgM; IgG",
                    value:
                      "Immunologic Indicated Panel: ANA; Rheum Arth factor; Complement C3; Immunofixation; IgA; IgM; IgG",
                  },
                  {
                    name: "Infectious Disease Panel: HIV 1 Ab; HTLV I/II Ab; Lyme disease Ab; Hep B SAb; Hep C Ab",
                    value:
                      "Infectious Disease Panel: HIV 1 Ab; HTLV I/II Ab; Lyme disease Ab; Hep B SAb; Hep C Ab",
                  },
                  {
                    name: "Myasthenia Gravis Panel: AChR Binding Ab; AChR Blocking Ab; AChR Modulating Ab; Anti MUsk Ab",
                    value:
                      "Myasthenia Gravis Panel: AChR Binding Ab; AChR Blocking Ab; AChR Modulating Ab; Anti MUsk Ab",
                  },
                  {
                    name: "Myasthenia Gravis Panel: AChR Binding Ab; AChR Blocking Ab; AChR Modulating Ab; Anti MUsk Ab",
                    value:
                      "Myasthenia Gravis Panel: AChR Binding Ab; AChR Blocking Ab; AChR Modulating Ab; Anti MUsk Ab",
                  },
                  {
                    name: "Infectious Neuropathies Panel: Cytomegalovirus; Herpes simplex virus IgG / IgM; Herpes zoster (shingles); Hep C Ab; Hep B 006510; HIV Ab; Lyme dis IgG/IgM Ab screen; Corynebacterium diphtheria culture; Mycobacterium leprae culture; Chagas dis",
                    value:
                      "Infectious Neuropathies Panel: Cytomegalovirus; Herpes simplex virus IgG / IgM; Herpes zoster (shingles); Hep C Ab; Hep B 006510; HIV Ab; Lyme dis IgG/IgM Ab screen; Corynebacterium diphtheria culture; Mycobacterium leprae culture; Chagas dis",
                  },
                  {
                    name: "Neuropathic Toxins Panel: Acrylamide; Arsenic; Lead; Mercury; Organophosphates; Platinum",
                    value:
                      "Neuropathic Toxins Panel: Acrylamide; Arsenic; Lead; Mercury; Organophosphates; Platinum",
                  },
                  {
                    name: "ANA",
                    value: "ANA",
                  },
                  {
                    name: "ANCA",
                    value: "ANCA",
                  },
                  {
                    name: "Anti DNA-DS",
                    value: "Anti DNA-DS",
                  },
                  {
                    name: "Anti Parietal Cell Ab",
                    value: "Anti Parietal Cell Ab",
                  },
                  {
                    name: "Anti Cardiolipin Ab",
                    value: "Anti Cardiolipin Ab",
                  },
                  {
                    name: "Anti Hu",
                    value: "Anti Hu",
                  },
                  {
                    name: "Anti Thrombin III",
                    value: "Anti Thrombin III",
                  },
                  {
                    name: "Anti Yo",
                    value: "Anti Yo",
                  },
                  {
                    name: "Campylobact. jejuni titer",
                    value: "Campylobact. jejuni titer",
                  },
                  {
                    name: "Complement C3 C4",
                    value: "Complement C3 C4",
                  },
                  {
                    name: "Complement CH50",
                    value: "Complement CH50",
                  },
                  {
                    name: "CBC with diff",
                    value: "CBC with diff",
                  },
                  {
                    name: "Ceruloplasmin",
                    value: "Ceruloplasmin",
                  },
                  {
                    name: "Serum copper",
                    value: "Serum copper",
                  },
                  {
                    name: "CPK",
                    value: "CPK",
                  },
                  {
                    name: "CRP",
                    value: "CRP",
                  },
                  {
                    name: "Cryoglobulin",
                    value: "Cryoglobulin",
                  },
                  {
                    name: "Factor V Leiden",
                    value: "Factor V Leiden",
                  },
                  {
                    name: "Folate",
                    value: "Folate",
                  },
                  {
                    name: "Glucose fasting",
                    value: "Glucose fasting",
                  },
                  {
                    name: "Glucose tolerance test 2hr",
                    value: "Glucose tolerance test 2hr",
                  },
                  {
                    name: "Glucose tolerance test 3hr",
                    value: "Glucose tolerance test 3hr",
                  },
                  {
                    name: "HgBA1C",
                    value: "HgBA1C",
                  },
                  {
                    name: "HIV-1/2 SCR w/RFX WB confirm",
                    value: "HIV-1/2 SCR w/RFX WB confirm",
                  },
                  {
                    name: "HIV-1 RNA PCR quantitative",
                    value: "HIV-1 RNA PCR quantitative",
                  },
                  {
                    name: "Homocysteine",
                    value: "Homocysteine",
                  },
                  {
                    name: "Immunofixation serum",
                    value: "Immunofixation serum",
                  },
                  {
                    name: "Intrinsic factor Ab",
                    value: "Intrinsic factor Ab",
                  },
                  {
                    name: "Iron (tot) IBC % sat",
                    value: "Iron (tot) IBC % sat",
                  },
                  {
                    name: "Iron total",
                    value: "Iron total",
                  },
                  {
                    name: "Lambert-Eaton syndrome Ab",
                    value: "Lambert-Eaton syndrome Ab",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select Labs",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "lab_comments",
                type: ElementType.TEXT,
                label: "Lab Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter lab comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "radiology",
                type: ElementType.SELECT,
                label: "Radiology",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Open MRI",
                    value: "Open MRI",
                  },
                  {
                    name: "Upright MRI",
                    value: "Upright MRI",
                  },
                  {
                    name: "MRI brain with and without contrast",
                    value: "MRI brain with and without contrast",
                  },
                  {
                    name: "MRI brain without contrast",
                    value: "MRI brain without contrast",
                  },
                  {
                    name: "MRI brain 3.0 T with and without contrast",
                    value: "MRI brain 3.0 T with and without contrast",
                  },
                  {
                    name: "MRI brain 3.0 T without contrast",
                    value: "MRI brain 3.0 T without contrast",
                  },
                  {
                    name: "MRA brain with and without contrast",
                    value: "MRA brain with and without contrast",
                  },
                  {
                    name: "MRA brain without contrast",
                    value: "MRA brain without contrast",
                  },
                  {
                    name: "CT scan brain with and without contrast",
                    value: "CT scan brain with and without contrast",
                  },
                  {
                    name: "CT scan brain without contrast",
                    value: "CT scan brain without contrast",
                  },
                  {
                    name: "CTA head and neck",
                    value: "CTA head and neck",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter radiology",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "radiology_comments",
                type: ElementType.TEXT,
                label: "Radiology Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Radiology Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "PT Recommendations",
                type: ElementType.SELECT,
                label: "PT Recommendations",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Evaluate and Teat",
                    value: "Evaluate and Teat",
                  },
                  {
                    name: "Exercise",
                    value: "Exercise",
                  },
                  {
                    name: "Manual Therapy",
                    value: "Manual Therapy",
                  },
                  {
                    name: "Chronic Pain Program",
                    value: "Chronic Pain Program",
                  },
                  {
                    name: "Posture/Position/Body Mechanics",
                    value: "Posture/Position/Body Mechanics",
                  },
                  {
                    name: "AROM",
                    value: "AROM",
                  },
                  {
                    name: "PROM",
                    value: "PROM",
                  },
                  {
                    name: "Back school",
                    value: "Back school",
                  },
                  {
                    name: "Gait training",
                    value: "Gait training",
                  },
                  {
                    name: "McKenzie Program",
                    value: "McKenzie Program",
                  },
                  {
                    name: "Aquatic Therapy",
                    value: "Aquatic Therapy",
                  },
                  {
                    name: "Neuro Re-education",
                    value: "Neuro Re-education",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter PT Recommendations",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "PT Recommendation Comments",
                type: ElementType.TEXT,
                label: "PT Recommendation Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter PT Recommendation Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Home Health ",
                type: ElementType.SELECT,
                label: "Home Health ",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Skilled Nursing:",
                    value: "Skilled Nursing:",
                  },
                  {
                    name: "Eval & Instruct for:",
                    value: "Eval & Instruct for:",
                  },
                  {
                    name: "Medication",
                    value: "Medication",
                  },
                  {
                    name: "Pain",
                    value: "Pain",
                  },
                  {
                    name: "Cardiac",
                    value: "Cardiac",
                  },
                  {
                    name: "Diabetic Management",
                    value: "Diabetic Management",
                  },
                  {
                    name: "Respiratory",
                    value: "Respiratory",
                  },
                  {
                    name: "Physical Therapy:",
                    value: "Physical Therapy:",
                  },
                  {
                    name: "Weakness",
                    value: "Weakness",
                  },
                  {
                    name: "Ambulation/Gait",
                    value: "Ambulation/Gait",
                  },
                  {
                    name: "Balance",
                    value: "Balance",
                  },
                  {
                    name: "Transfers",
                    value: "Transfers",
                  },
                  {
                    name: "Bed Mobility",
                    value: "Bed Mobility",
                  },
                  {
                    name: "Fall Risk",
                    value: "Fall Risk",
                  },
                  {
                    name: "Range of Motion",
                    value: "Range of Motion",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Home Health ",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "Home health comments",
                type: ElementType.TEXT,
                label: "Home health comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Home health comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Referrals ",
                type: ElementType.TEXT,
                label: "Referrals ",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Referrals ",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Referral Comments",
                type: ElementType.TEXT,
                label: "Referral Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Referral Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Education",
                type: ElementType.SELECT,
                label: "Education",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Alternative treatments",
                    value: "Alternative treatments",
                  },
                  {
                    name: "Drug interactions",
                    value: "Alternative Drug interactions",
                  },
                  {
                    name: "Handouts provided",
                    value: "Handouts provided",
                  },
                  {
                    name: "Medication side effects",
                    value: "Medication side effects",
                  },
                  {
                    name: "Pain management",
                    value: "Pain management",
                  },
                  {
                    name: "Potential adverse consequences if pregnant",
                    value: "Potential adverse consequences if pregnant",
                  },
                  {
                    name: "Recognizing stroke-like symptoms",
                    value: "Recognizing stroke-like symptoms",
                  },
                  {
                    name: "Risks of declining treatment",
                    value: "Risks of declining treatment",
                  },
                  {
                    name: "Risks/benefits of treatment plan",
                    value: "Risks/benefits of treatment plan",
                  },
                  {
                    name: "Signs of emergency",
                    value: "Signs of emergency",
                  },
                  {
                    name: "Symptom management",
                    value: "Symptom management",
                  },
                  {
                    name: "Written instructions for tapering/titrating medications",
                    value:
                      "Written instructions for tapering/titrating medications",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select Education",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Education Comments",
                type: ElementType.TEXT,
                label: "Education Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Education Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Diet",
                type: ElementType.SELECT,
                label: "Diet",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "1800 cal ADA diet",
                    value: "1800 cal ADA diet",
                  },
                  {
                    name: "1800 cal ADA diet",
                    value: "1800 cal ADA diet",
                  },
                  {
                    name: "2000 cal ADA diet",
                    value: "2000 cal ADA diet",
                  },
                  {
                    name: "1500 cal ADA diet",
                    value: "1500 cal ADA diet",
                  },
                  {
                    name: "Low fat diet",
                    value: "Low fat diet",
                  },
                  {
                    name: "Low sodium diet",
                    value: "Low sodium diet",
                  },
                  {
                    name: "Low cholesterol diet",
                    value: "Low cholesterol diet",
                  },
                  {
                    name: "Adequate nutritional intake",
                    value: "Adequate nutritional intake",
                  },
                  {
                    name: "Vitamin supplementation",
                    value: "Vitamin supplementation",
                  },
                  {
                    name: "Avoid alcohol",
                    value: "Avoid alcohol",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select a Diet",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "Diet Comments",
                type: ElementType.TEXT,
                label: "Diet Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please leave Diet Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "General Instructions ",
                type: ElementType.SELECT,
                label: "General Instructions ",
                column: 6,
                fieldId: uuid(),
                options: [
                  {
                    name: "Activity as tolerated",
                    value: "Activity as tolerated",
                  },
                  {
                    name: "Activity as tolerated",
                    value: "Activity as tolerated",
                  },
                  {
                    name: "Avoid crowds",
                    value: "Avoid crowds",
                  },
                  {
                    name: "Avoid driving",
                    value: "Avoid driving",
                  },
                  {
                    name: "Avoid high risk activity due to seizures/LOC",
                    value: "Avoid high risk activity due to seizures/LOC",
                  },
                  {
                    name: "Follow exercise program",
                    value: "Follow exercise program",
                  },
                  {
                    name: "Follow facial exercise program",
                    value: "Follow facial exercise program",
                  },
                  {
                    name: "Increase activity level",
                    value: "Increase activity level",
                  },
                  {
                    name: "No heavy lifting",
                    value: "No heavy lifting",
                  },
                  {
                    name: "No heavy lifting more than 5 lbs",
                    value: "No heavy lifting more than 5 lbs",
                  },
                  {
                    name: "No heavy lifting more than 10 lbs",
                    value: "No heavy lifting more than 10 lbs",
                  },
                  {
                    name: "No heavy lifting more than 20 lbs",
                    value: "No heavy lifting more than 20 lbs",
                  },
                ],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select General Instructions ",
                defaultValue: "",
                isMultiSelect: true,
                apiCall: ''
              },
              {
                css: "",
                name: "General Instruction Comments",
                type: ElementType.TEXT,
                label: "General Instruction Comments",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please leave General Instruction Comments",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
            ],
          },
        ],
      }]
    },
    name: "SOAP Plan",
    type: FormType.TEMPLATE,
    isSystemForm: true,
    isActive: true,
  },
  {
    name: "Contact Info",
    isSystemForm: true,
    type: FormType.PRE_DEFINED,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.CONTACT_INFO,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Contact Info",
            fields: contactInfoFields
          },
        ]
      }]
    },
  },
  {
    name: "Emergency Contact",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.EMERGENCY_CONTACT,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Emergency Contact",
            fields: [
              {
                css: "",
                name: "name",
                columnName: "name",
                tableName: "Contacts",
                type: ElementType.TEXT,
                label: "Name",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter your name",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "relationship",
                columnName: "relationship",
                tableName: "Contacts",
                type: ElementType.SELECT,
                tableContactType: ContactType.EMERGENCY,
                label: "Relationship",
                column: 6,
                fieldId: uuid(),
                options: MAPPED_RELATIONSHIP_TYPE,
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select a relationship",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "phone",
                columnName: "phone",
                tableName: "Contacts",
                type: ElementType.TEL,
                tableContactType: ContactType.EMERGENCY,
                label: "Home Phone",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter your Home Phone",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "mobile",
                columnName: "mobile",
                tableName: "Contacts",
                type: ElementType.TEL,
                tableContactType: ContactType.EMERGENCY,
                label: "Mobile Phone",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Mobile Phone",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
            ],
          },
        ],
      }]
    },
  },
  {
    name: "Demographics",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.DEMOGRAPHICS,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Demographics",
            fields: demographicsFields
          }]
      }]
    }
  },
  {
    name: "Patient Info",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.PATIENT_INFO,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Patient Info",
            fields: patientInfoFields
          },
        ],
      }]
    },
  },
  {
    name: "Payment",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.PAYMENT_INFO,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Payment",
            fields: [
              {
                css: "",
                name: "paymentType",
                type: ElementType.CUSTOM,
                label: "How will you be covering your visit?",
                column: 12,
                apiCall: FormBuilderApiSelector.PAYMENT_TYPE,
                fieldId: uuid(),
                options: PAYMENT_TYPES,
                tableName: "Appointments",
                columnName: "insuranceStatus",
                errorMsg: "",
                required: true,
                textArea: false,
                placeholder: "",
                defaultValue: "",
                isMultiSelect: false,
              },
            ]
          }]
      }]
    }
  },
  {
    name: "Terms & Conditions",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.TERMS_CONDITIONS,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "User data privacy & TOS agreement.",
            fields: [
              {
                css: "",
                name: "terms",
                type: ElementType.CUSTOM,
                label: "I agree to all terms and agreement",
                column: 12,
                apiCall: FormBuilderApiSelector.TERMS_CONDITIONS,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: true,
                textArea: false,
                placeholder: "",
                defaultValue: "",
                isMultiSelect: false,
              },
            ]
          }]
      }]
    }
  },
  {
    name: "Privacy",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        tabId: formTemplateTabIds.PRIVACY_AGREEMENT,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Privacy",
            fields: [
              {
                css: "",
                name: "privacy",
                type: ElementType.CUSTOM,
                label: "Privacy",
                column: 12,
                apiCall: FormBuilderApiSelector.PATIENT_CONSENT,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: true,
                textArea: false,
                placeholder: "",
                defaultValue: "",
                isMultiSelect: false,
              },
            ]
          }]
      }]
    }
  },
  {
    name: "Facility",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Tabs",
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Facility",
            fields: [
              {
                css: "",
                name: "facilityId",
                type: ElementType.CUSTOM,
                label: "Facility",
                column: 12,
                apiCall: FormBuilderApiSelector.PRACTICE_FACILITIES,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: true,
                textArea: false,
                placeholder: "",
                defaultValue: "",
                isMultiSelect: false,
                tableName: "Appointments",
                columnName: "facilityId",
              },
            ]
          },]
      }]
    }
  },
  {
    name: "Appointment Type",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Appointment Type",
        sections: [
          {
            id: uuid(),
            col: 8,
            name: "Select Services",
            fields: [
              {
                css: "",
                name: "appointmentType",
                columnName: "appointmentTypeId",
                tableName: "Appointments",
                type: ElementType.CUSTOM,
                label: "Appointment Type",
                column: 12,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: true,
                textArea: false,
                placeholder: "Please select a Appointment Type",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: FormBuilderApiSelector.SERVICE_SELECT
              },
            ]
          }]
      }]
    }
  },
  {
    name: "Documents",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Document Verification",
        sections: [{
          id: uuid(),
          col: 12,
          name: "Document Verification",
          fields: documentFields
        }]
      }]
    }
  },
  {
    name: "Available Slots",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Available Slots",
        tabId: formTemplateTabIds.AVAILABLE_SLOTS,
        sections: [
          {
            id: uuid(),
            col: 4,
            name: "Available Slots",
            sectionId: formTemplateTabIds.AVAILABLE_SLOTS,
            fields: slotsFields,
          }]
      }]
    }
  },
  {
    name: "Next Of Kin",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Next Of Kin",
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Next Of Kin",
            fields: [
              {
                css: "",
                name: "name",
                columnName: "name",
                tableName: "Contacts",
                type: ElementType.TEXT,
                tableContactType: ContactType.NEXT_OF_KIN,
                label: "Name",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter your name",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "relationship",
                columnName: "relationship",
                tableName: "Contacts",
                tableContactType: ContactType.NEXT_OF_KIN,
                type: ElementType.SELECT,
                label: "Relationship",
                column: 6,
                fieldId: uuid(),
                options: MAPPED_RELATIONSHIP_TYPE,
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please select a relationship",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "phone",
                columnName: "phone",
                tableName: "Contacts",
                type: ElementType.TEL,
                tableContactType: ContactType.NEXT_OF_KIN,
                label: "Home Phone",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter your Home Phone",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
              {
                css: "",
                name: "mobile",
                columnName: "mobile",
                tableName: "Contacts",
                type: ElementType.TEL,
                tableContactType: ContactType.NEXT_OF_KIN,
                label: "Mobile Phone",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Mobile Phone",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
            ],
          },
        ],
      }]
    },
  },
  {
    name: "Guardian",
    type: FormType.PRE_DEFINED,
    isSystemForm: true,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Guardian",
        tabId: formTemplateTabIds.GUARDIAN_CONTACT,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Guardian",
            sectionId: formTemplateTabIds.GUARDIAN_CONTACT,
            fields: [
              {
                css: "",
                name: "firstName",
                columnName: "firstName",
                tableName: "Contacts",
                type: ElementType.TEXT,
                tableContactType: ContactType.GUARDIAN,
                label: "First Name",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter first name",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: '',
                regex: '/^[A-Za-z\\s]+$/'

              },
              {
                css: "",
                name: "middleName",
                columnName: "middleName",
                tableName: "Contacts",
                tableContactType: ContactType.GUARDIAN,
                type: ElementType.TEXT,
                label: "Middle Name",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter middle name",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: '',
                regex: '/^[A-Za-z\\s]+$/'

              },
              {
                css: "",
                name: "lastName",
                columnName: "lastName",
                tableName: "Contacts",
                type: ElementType.TEXT,
                tableContactType: ContactType.GUARDIAN,
                label: "Last Name",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter last name",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: '',
                regex: '/^[A-Za-z\\s]+$/'
              },
              {
                css: "",
                name: "suffix",
                columnName: "suffix",
                tableName: "Contacts",
                type: ElementType.TEXT,
                tableContactType: ContactType.GUARDIAN,
                label: "Suffix",
                column: 6,
                fieldId: uuid(),
                options: [],
                errorMsg: "",
                required: false,
                textArea: false,
                placeholder: "Please enter Suffix",
                defaultValue: "",
                isMultiSelect: false,
                apiCall: ''
              },
            ],
          },
        ],
      }]
    },
  },
  {
    name: "Guarantor",
    isSystemForm: true,
    type: FormType.PRE_DEFINED,
    layout: {
      tabs: [{
        id: uuid(),
        name: "Guarantor",
        tabId: formTemplateTabIds.GUARANTOR_CONTACT,
        sections: [
          {
            id: uuid(),
            col: 12,
            name: "Guarantor",
            fields: guarantorFields
          },
        ]
      }]
    },
  },
  {
    name: "Public Facility Appointment",
    isSystemForm: true,
    type: FormType.TEMPLATE,
    layout: {
      tabs: facilityAppointment
    }
  },
  {
    name: "Public Practice Appointment Form",
    isSystemForm: true,
    type: FormType.TEMPLATE,
    layout: {
      tabs: practiceAppointment
    }
  }
  // {
  //   name: "Facility Appointment Single Form",
  //   isSystemForm: true,
  //   type: FormType.TEMPLATE,
  //   layout: {
  //     tabs: [{
  //       id: uuid(),
  //       name: "Tab",
  //       sections: oneStepFacilityForm
  //     }]
  //   }
  // },
  // {
  //   name: "Practice Appointment Single Form",
  //   isSystemForm: true,
  //   type: FormType.TEMPLATE,
  //   layout: {
  //     tabs: [{
  //       id: uuid(),
  //       name: "Tab",
  //       sections: oneStepPracticeForm
  //     }]
  //   }
  // },

  // {
  //   name: "Employment",
  //   type: FormType.PRE_DEFINED,
  //   isSystemForm: true,
  //   layout: {
  //     tabs: [{
  //       id: uuid(),
  //       name: "Employment",
  //       tabId: formTemplateTabIds.EMPLOYMENT_INFO,
  //       sections: [
  //         {
  //           id: uuid(),
  //           col: 12,
  //           name: "Employment",
  //           sectionId: formTemplateTabIds.EMPLOYMENT_INFO,
  //           fields: [
  //             {
  //               css: "",
  //               name: "name",
  //               columnName: "name",
  //               tableName: "Employers",
  //               type: ElementType.TEXT,
  //               tableContactType: '',
  //               label: "Employer Name",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Please enter employer name",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "phone",
  //               columnName: "phone",
  //               tableName: "Employers",
  //               type: ElementType.TEL,
  //               tableContactType: '',
  //               label: "Employer Phone",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Please enter employer phone",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "usualOccupation",
  //               columnName: "usualOccupation",
  //               tableName: "Employers",
  //               type: ElementType.TEXT,
  //               tableContactType: '',
  //               label: "Usual Occupation (Current or Most Recent)",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Please enter Usual Occupation (Current or Most Recent)",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "industry",
  //               columnName: "industry",
  //               tableName: "Employers",
  //               type: ElementType.TEXT,
  //               tableContactType: '',
  //               label: "Usual Industry",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Please enter Usual Industry",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //           ]
  //         }
  //       ]
  //     }]
  //   }
  // },
]


// {
  //   name: "Provider Dates",
  //   isSystemForm: true,
  //   type: FormType.PRE_DEFINED,
  //   layout: {
  //     tabs: [{
  //       id: uuid(),
  //       name: "Provider Dates",
  //       sections: [
  //         {
  //           id: uuid(),
  //           col: 12,
  //           name: "Provider / Registration Dates",
  //           fields: [
  //             {
  //               css: "",
  //               name: "usualProviderId",
  //               columnName: "usualProviderId",
  //               tableName: "Patients",
  //               tableContactType: '',
  //               type: ElementType.CUSTOM,
  //               label: "Usual Provider ",
  //               column: 12,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Usual Provider",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: FormBuilderApiSelector.FACILITY_PROVIDERS
  //             },
  //             {
  //               css: "",
  //               name: "registrationDate",
  //               columnName: "registrationDate",
  //               tableName: "Patients",
  //               type: ElementType.DATE,
  //               tableContactType: '',
  //               label: "Registration Date",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Registration Date",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "deceasedDate",
  //               columnName: "deceasedDate",
  //               tableName: "Patients",
  //               type: ElementType.DATE,
  //               tableContactType: '',
  //               label: "Deceased Date",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Deceased Date",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "statementNoteDateFrom",
  //               columnName: "statementNoteDateFrom",
  //               tableName: "Patients",
  //               type: ElementType.DATE,
  //               tableContactType: '',
  //               label: "Issue Date",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Issue Date",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },
  //             {
  //               css: "",
  //               name: "statementNoteDateTo",
  //               columnName: "statementNoteDateTo",
  //               tableName: "Patients",
  //               type: ElementType.DATE,
  //               tableContactType: '',
  //               label: "Expiration Date",
  //               column: 6,
  //               fieldId: uuid(),
  //               options: [],
  //               errorMsg: "",
  //               required: false,
  //               textArea: false,
  //               placeholder: "Expiration Date",
  //               defaultValue: "",
  //               isMultiSelect: false,
  //               apiCall: ''
  //             },

  //           ]
  //         }
  //       ]
  //     }]
  //   },
  // },