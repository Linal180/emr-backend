import { SelectorType } from "src/socialHistory/payloads/questions.payload"

export enum ATTACHMENT_TITLES {
  ProfilePicture = "Profile Picture",
  DrivingLicense1 = "Driving License 1",
  DrivingLicense2 = "Driving License 2",
  InsuranceCard1 = "Insurance Card 1",
  InsuranceCard2 = "Insurance Card 2",
  ProviderUploads = "Provider Uploads",
  Signature = "Signature",
  LabOrders = "Lab Orders",
  PracticeLogo = "Logo",
}

const PATIENT_LOG_PERMISSIONS = [
  'GetPatient',
  'GetLabTest',
  'PatientInfo',
  'RemovePatient',
  'CreatePatient',
  'UpdatePatient',
  'FindAllLabTest',
  "AddPatientVital",
  "GetPatientVital",
  'RemoveAppointment',
  "GetPatientProblem",
  'UpdateAppointment',
  'CancelAppointment',
  "AddPatientProblem",
  'GetPatientAllergy',
  "RemovePatientVital",
  'GetPatientProvider',
  'UpdatePatientVital',
  'GetPatientProviders',
  'SendInviteToPatient',
  'RemovePatientProblem',
  'UpdatePatientProblem',
  'FindAllPatientVitals',
  'UpdatePatientProfile',
  'UpdatePatientProvider',
  "RemovePatientAllergy",
  'GetPatientAppointment',
  "FindAllPatientProblem",
  'FetchPatientInsurances',
  'FindPatientAttachments',
  'FindAllPatientProblems',
  'UpdatePatientNoteInfoInputs',
  'UpdatePatientProviderRelation',
  "GetPatientPastUpcomingAppointment",
]

export const PATIENT_LOGGING_PERMISSIONS = PATIENT_LOG_PERMISSIONS?.map((val) => val?.toUpperCase())

export const MODULE_LOGS_TYPES = [
  "Agreement",
  "Appointment",
  "Attachments",
  "DocumentTypes",
  "Billing",
  "Dashboard",
  "Facility",
  "Service",
  "Element",
  "Form",
  "UserForm",
  "Copay",
  "Insurance",
  "PolicyHolder",
  "Policy",
  "LabTestObservation",
  "LabTests",
  "LoincCodes",
  "TestSpecimen",
  "PatientAllergies",
  "Problem",
  "Vitals",
  "DoctorPatient",
  "Patient",
  "PatientConsent",
  "Invoice",
  "Payment",
  "Practice",
  "Staff",
  "Role",
  "Users",
  "Doctor",
  "Contact",
  "Schedule",
  "Permission",
  "RolePermission"
]

export enum SystemBillingStatuses {
  READY_TO_CLAIM = 'ready_to_claim',
  REJECTED = 'rejected',
  ACKNOWLEDGED = 'acknowledged'
}

export const ClaimFromDateRegex = /^\d{2}[/]\d{2}[/]\d{4}$/

export const seedPractice = {
  EXPRESS_HEALTH_CARE: 'express_healthcare'
}

export const formTemplateTabIds = {
  CONTACT_INFO: "contact_info",
  PAYMENT_INFO: "payment_info",
  PRIVACY_POLICY: "privacy_policy",
  EMPLOYMENT_INFO: "employment_info",
  SELECT_SERVICES: "select_services",
  GUARDIAN_CONTACT: "guardian_contact",
  PRIVACY_AGREEMENT: "privacy_agreement",
  GUARANTOR_CONTACT: "guarantor_contact",
  EMERGENCY_CONTACT: "emergency_contact",
  DOCUMENT_VERIFICATION: "document_verification",
  DEMOGRAPHICS: "demographics",
  PATIENT_INFO: "patient_info",
  TERMS_CONDITIONS: "terms_conditions",
  AVAILABLE_SLOTS: 'available_slots'
}

export enum DAYS {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export const USER_TYPES = {
  PATIENT: 'patient',
  SUPER_ADMIN: 'super-admin',
  DOCTOR: 'doctor',
  STAFF: 'staff',
  FRONT_DESK: '',
  OFFICE_MANAGER: 'office-manager',
  FACILITY_ADMIN: "facility-admin",
  PRACTICE_ADMIN: 'practice-admin'
}

export enum NdcType {
  SALE = 'sale',
  USE = 'use'
}

export enum QuestionType {
  SWITCH = 'switch',
  SELECT = 'select',
  INPUT = 'input',
  DATE = 'date',
  NUMBER = 'number'
}

export enum TemplateType {
  HPI = 'hpi',
  REVIEW_OF_SYSTEM = 'reviewOfSystem',
  PHYSICAL_EXAM = 'physicalExam'
}

export enum ANSWER_TYPE {
  NORMAL = "normal",
  NEUTRAL = "Neutral",
  ABNORMAL = "Abnormal"
}

export type SocialDependentQuestions = {
  title: string
  note: string;
  questionType: QuestionType
  options?: SelectorType[],
  answer: string[]
  specialId: string
}

export type QuestionAnswersType = {
  title: string;
  answerType: ANSWER_TYPE;
  questionType?: QuestionType;
  options: SelectorType[]
}

export type SocialQuestionsType = {
  title: string
  note: string;
  questionType: QuestionType
  options?: SelectorType[],
  dependentQuestions: SocialDependentQuestions[]
  specialId: string
}

export type SocialHistoryQuestionType = {
  name: string;
  questions: SocialQuestionsType[]
}

export const SECTION_SPECIAL_TYPE = 'seed_section'


export enum STATUS {
  ACTIVE = "Active",
  IN_ACTIVE = "Inactive",
}

export type StatusType = 'Active' | 'Inactive'


export type TemplateQuestionAnswerType = {
  title: string;
  answerType: ANSWER_TYPE
  questionType?: QuestionType
  options?: SelectorType[]
}

export type TemplateQuestionType = {
  name: string;
  answers: TemplateQuestionAnswerType[]
}

export type TemplateSectionType = {
  name: string;
  questions: TemplateQuestionType[]
}

export type TemplatesType = {
  title: string;
  templateType: TemplateType;
  sections: TemplateSectionType[]
}