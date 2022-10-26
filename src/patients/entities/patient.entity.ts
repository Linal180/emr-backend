//packages blocks
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
//entities
import { Employer } from './employer.entity';
import { User } from 'src/users/entities/user.entity';
import { DoctorPatient } from './doctorPatient.entity';
import { PatientConsent } from './patientConsent.entity';
import { LabTests } from 'src/labs/entities/labTests.entity';
import { Policy } from 'src/insurance/entities/policy.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Billing } from 'src/billings/entities/billing.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { Transactions } from 'src/payment/entity/payment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Vaccine } from 'src/patientCharting/entities/vaccines.entity';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { PolicyHolder } from 'src/insurance/entities/policy-holder.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { UpFrontPayment } from 'src/billings/entities/upFrontPayment.entity';
import { TriageNotes } from 'src/patientCharting/entities/triageNotes.entity';
import { SocialHistory } from 'src/socialHistory/entities/socialHistory.entity';
import { PhysicalExam } from 'src/reviewOfSystems/entities/physicalExam.entity';
import { FamilyHistory } from 'src/patientCharting/entities/familyHistory.entity';
import { PatientVitals } from 'src/patientCharting/entities/patientVitals.entity';
import { ReviewOfSystem } from 'src/reviewOfSystems/entities/reviewOfSystem.entity';
import { SurgicalHistory } from 'src/patientCharting/entities/surgicalHistory.entity';
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';
import { PatientAllergies } from 'src/patientCharting/entities/patientAllergies.entity';
import { PatientMedication } from 'src/patientCharting/entities/patientMedication.entity';
import { PatientIllnessHistory } from 'src/reviewOfSystems/entities/patientIllnessHistory.entity';

export enum COMMUNICATIONTYPE {
  PHONE = "phone",
  VOICE_MESSAGE = "Voice message",
  MESSAGE = "Message",
  EMAIL = "email"
}

registerEnumType(COMMUNICATIONTYPE, {
  name: "COMMUNICATIONTYPE",
  description: "The patient's communication method assigned",
});

export enum RACE {
  WHITE = "White",
  BLACK_AFRICAN_AMERICAN = "Black or African American",
  ASIAN = "Asian",
  AMERICAN_INDIAN_ALASKA_NATIVE = "American Indian or Alaska Native",
  NATIVE_HAWAIIAN_PACIFIC_ISLANDER = "Native Hawaiian or Pacific Islander",
  OTHER = "OTHER"
}

registerEnumType(RACE, {
  name: "RACE",
  description: "The user race assigned",
});

export enum ETHNICITY {
  NONE = "none",
  HISPANIC_OR_LATINO = "Hispanic or Latino",
  NOT_HISPANIC_OR_LATINO = "Not Hispanic or Latino",
  DECLINE_TO_SPECIFY = "Declined to specify"
}

registerEnumType(ETHNICITY, {
  name: "ETHNICITY",
  description: "The patient's ethnicity type assigned",
});

export enum MARITIALSTATUS {
  SINGLE = "single",
  MARRIED = "married",
  WIDOWED = "Widowed",
  SEPARATED = "Separated",
  DIVORCED = "Divorced"
}

registerEnumType(MARITIALSTATUS, {
  name: "MARITIALSTATUS",
  description: "The patient's maritial status type assigned",
});

export enum SEXUALORIENTATION {
  HOMOSEXUAL = "Lesbian, gay or homosexual",
  HETEROSEXUAL = "Straight or heterosexual",
  BISEXUAL = "Bisexual",
  DONT_KNOW = "Don't know",
  NONE = "Choose not to disclose"
}

registerEnumType(SEXUALORIENTATION, {
  name: "SEXUALORIENTATION",
  description: "The patient's sexual orientation type assigned",
});

export enum GENDERIDENTITY {
  MALE = "Identifies as Male",
  FEMALE = "Identifies as Female",
  TRANSGENDER_MALE = "Transgender Male/Female-to-Male (FTM)",
  TRANSGENDER_FEMALE = "Transgender Female/Male-to-Female (MTF)",
  DECLINE_TO_SPECIFY = "Decline to specify",
  NONE = "Other"
}

registerEnumType(GENDERIDENTITY, {
  name: "GENDERIDENTITY",
  description: "The patient's sexual orientation type assigned",
});

export enum PRONOUNS {
  HE = "he, him, his",
  SHE = "she, her, hers",
  NONE = "Choose not to disclose"
}

registerEnumType(PRONOUNS, {
  name: "PRONOUNS",
  description: "The patient's pronouns type assigned",
});

export enum HOMEBOUND {
  YES = "Yes",
  NO = "No"
}

registerEnumType(HOMEBOUND, {
  name: "HOMEBOUND",
  description: "The patient's homebound type assigned",
});

export enum HOLDSTATEMENT {
  NONE = "Do not hold statement",
  BAD_ADDRESS = "Bad Address - Invalid Address",
  NO_FORW_ADDRESS = "Bad Address - No forwading Address",
  BANKRUPTCY = "Bankruptcy",
  CLAIM_CANCELED = "Claims on canceled payment plans",
  INCORRECT_GURANTOR = "Icorrect Guarantor",
  PATIENT_DEASEASED = "Patient is deseased",
  ACCOUNT_TOO_LONG = "Patient's account number is too long",
  PRACTICE_REQUEST = "Practice-Request"
}

registerEnumType(HOLDSTATEMENT, {
  name: "HOLDSTATEMENT",
  description: "The patient's hold statement type assigned",
});


@Entity({ name: 'Patients' })
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  suffix: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientRecord: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstNameUsed: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prefferedName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  previousFirstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  previouslastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  motherMaidenName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ssn: string;

  @Column({
    type: "enum",
    enum: GENDERIDENTITY,
    default: GENDERIDENTITY.MALE,
    nullable: true,
  })
  @Field(() => GENDERIDENTITY)
  gender: GENDERIDENTITY

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob: string;

  @Column({ type: "enum", enum: COMMUNICATIONTYPE, default: COMMUNICATIONTYPE.PHONE })
  @Field(() => COMMUNICATIONTYPE)
  preferredCommunicationMethod: COMMUNICATIONTYPE

  @Column({ nullable: true })
  @Field({ nullable: true })
  registrationDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deceasedDate: string;

  @Column({ nullable: true, default: false })
  @Field()
  privacyNotice: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  releaseOfInfoBill: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  callToConsent: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  phoneEmailPermission: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  cellPhonePermission: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  medicalPermission: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  resultConsent: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  immunizationConsent: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  medicationHistoryConsent: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientNote: string;

  @Column({ nullable: true, default: false })
  @Field(() => Boolean, { nullable: true })
  patientNoteOpen: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  language: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pharmacy: string;

  @Column({ type: "enum", enum: RACE, default: RACE.OTHER })
  @Field(() => RACE, { nullable: true })
  race: RACE

  @Column({ type: "enum", enum: ETHNICITY, default: ETHNICITY.NONE })
  @Field(type => ETHNICITY, { nullable: true })
  ethnicity: ETHNICITY

  @Column({ type: "enum", enum: MARITIALSTATUS, default: MARITIALSTATUS.SINGLE, nullable: true })
  @Field(() => MARITIALSTATUS, { nullable: true })
  maritialStatus: MARITIALSTATUS


  @Column({ type: "enum", enum: SEXUALORIENTATION, default: SEXUALORIENTATION.NONE, nullable: true, })
  @Field(() => SEXUALORIENTATION, { nullable: true })
  sexualOrientation: SEXUALORIENTATION

  @Column({ type: "enum", enum: GENDERIDENTITY, default: GENDERIDENTITY.NONE, nullable: true, })
  @Field(() => GENDERIDENTITY, { nullable: true })
  genderIdentity: GENDERIDENTITY

  @Column({ type: "enum", enum: GENDERIDENTITY, default: GENDERIDENTITY.NONE, nullable: true, })
  @Field(() => GENDERIDENTITY, { nullable: true })
  sexAtBirth: GENDERIDENTITY

  @Column({ type: "enum", enum: PRONOUNS, default: PRONOUNS.NONE })
  @Field(() => PRONOUNS, { nullable: true })
  pronouns: PRONOUNS

  @Column({ type: "enum", enum: HOMEBOUND, default: HOMEBOUND.NO })
  @Field(() => HOMEBOUND, { nullable: true })
  homeBound: HOMEBOUND

  @Column({ type: "enum", enum: HOLDSTATEMENT, default: HOLDSTATEMENT.NONE })
  @Field(() => HOLDSTATEMENT, { nullable: true })
  holdStatement: HOLDSTATEMENT

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  statementDelivereOnline: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  inviteAccepted: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  statementNote: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  statementNoteDateFrom: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  statementNoteDateTo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyHolderId: string;

  //only fields

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];

  @Field({ nullable: true })
  profileAttachment: string;

  @Field(() => Doctor, { nullable: true })
  primaryDoctor: Doctor;

  @Field(() => Contact, { nullable: true })
  primaryContact: Contact;

  //dates

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  //relationships

  @OneToMany(() => Vaccine, familyHistory => familyHistory.patient, { onDelete: "CASCADE" })
  @Field(() => [Vaccine], { nullable: true })
  vaccines: Vaccine[];

  @OneToMany(() => FamilyHistory, familyHistory => familyHistory.patient, { onDelete: "CASCADE" })
  @Field(() => [FamilyHistory], { nullable: true })
  familyHistory: FamilyHistory[];

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @OneToOne(() => SocialHistory, socialHistory => socialHistory.patient, { onDelete: 'CASCADE' })
  @Field(() => SocialHistory, { nullable: true })
  socialHistory: SocialHistory;

  @OneToOne(() => PatientConsent, consent => consent.patient)
  @Field(() => PatientConsent, { nullable: true })
  consent: PatientConsent;

  @OneToMany(() => Contact, contact => contact.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => TriageNotes, triageNote => triageNote.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [TriageNotes], { nullable: true })
  triageNotes: TriageNotes[];

  @OneToMany(() => SurgicalHistory, surgicalHistory => surgicalHistory.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [SurgicalHistory], { nullable: true })
  surgicalHistories: SurgicalHistory[];

  @OneToMany(() => PatientIllnessHistory, surgicalHistory => surgicalHistory.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientIllnessHistory], { nullable: true })
  patientIllnessHistories: PatientIllnessHistory[];

  @OneToMany(() => ReviewOfSystem, reviewOfSystems => reviewOfSystems.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [ReviewOfSystem], { nullable: true })
  reviewOfSystems: ReviewOfSystem[];

  @OneToMany(() => PhysicalExam, physicalExams => physicalExams.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PhysicalExam], { nullable: true })
  physicalExams: PhysicalExam[];

  @OneToMany(() => PatientMedication, patientMedication => patientMedication.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientMedication], { nullable: true })
  patientMedications: PatientMedication[];

  @ManyToOne(() => Facility, facility => facility.patients, { onDelete: 'CASCADE' })
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @OneToMany(() => DoctorPatient, doctorPatient => doctorPatient.doctor, { onDelete: "CASCADE" })
  @Field(() => [DoctorPatient], { nullable: true })
  doctorPatients: DoctorPatient[];

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.patient, { onDelete: "CASCADE" })
  @Field(() => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.patient, { onDelete: "CASCADE" })
  @Field(() => [PatientProblems], { nullable: true })
  patientProblems: PatientProblems[];

  @OneToMany(() => Appointment, appointment => appointment.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Appointment], { nullable: true })
  appointments: Appointment[];

  @OneToMany(() => LabTests, labTests => labTests.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [LabTests], { nullable: true })
  labTests: LabTests[];

  @OneToMany(() => Billing, billing => billing.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Billing], { nullable: true })
  billings: Billing[];

  @OneToMany(() => UpFrontPayment, upFrontPayments => upFrontPayments.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [UpFrontPayment], { nullable: true })
  upFrontPayments: UpFrontPayment[];

  @OneToMany(() => Employer, employer => employer.patient, { onDelete: "CASCADE" })
  @Field(() => Employer, { nullable: true })
  employer: Employer[];

  @OneToMany(() => PatientVitals, patientVitals => patientVitals.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientVitals], { nullable: true })
  patientVitals: PatientVitals[];

  @OneToMany(() => Transactions, transaction => transaction.patient)
  @Field(() => [Transactions], { nullable: true })
  transaction: Transactions[];

  @OneToMany(() => Policy, policy => policy.patient, { onDelete: "CASCADE" })
  @Field(() => [Policy], { nullable: true })
  policies: Policy[];

  @ManyToOne(() => PolicyHolder, policyHolder => policyHolder.patients)
  @Field(() => PolicyHolder, { nullable: true })
  policyHolder: PolicyHolder;

}
