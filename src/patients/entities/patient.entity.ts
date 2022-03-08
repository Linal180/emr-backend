import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Transactions } from 'src/payment/entity/payment.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DoctorPatient } from './doctorPatient.entity';
import { Employer } from './employer.entity';

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


export enum REGDepartment {
  HOSPITAL = "hospital",
  LAB = "lab",
  CLINIC = "clinic",
}

registerEnumType(REGDepartment, {
  name: "REGDepartment",
  description: "The facility Registration Department type assigned type",
});

export enum PrimaryDepartment {
  HOSPITAL = "hospital",
  LAB = "lab",
  CLINIC = "clinic",
}

registerEnumType(PrimaryDepartment, {
  name: "PrimaryDepartment",
  description: "The facility Primary Department type assigned type",
});

export enum ETHNICITY {
  NONE = "none",
  CENTERAL_AMERICAN = "centeral American",
  CENTERAL_AMERICAN_INDIAN = "centeral American Indian",
}

registerEnumType(ETHNICITY, {
  name: "ETHNICITY",
  description: "The patient's ethnicity type assigned",
});

export enum MARITIALSTATUS {
  SINGLE = "single",
  MARIED = "maried",
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
  NOT_EXCLUSIVE = "Gender non-conforming (neither exclusively male nor female)",
  NONE = "Choose not to disclose"
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
    default: GENDERIDENTITY.MALE
  })
  @Field(type => GENDERIDENTITY)
  gender: GENDERIDENTITY

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob: string;

  @Column({
    type: "enum",
    enum: REGDepartment,
    default: REGDepartment.HOSPITAL
  })
  @Field(type => REGDepartment)
  registrationDepartment: REGDepartment

  @Column({
    type: "enum",
    enum: PrimaryDepartment,
    default: PrimaryDepartment.HOSPITAL
  })
  @Field(type => PrimaryDepartment)
  primaryDepartment: PrimaryDepartment

  @Column({
    type: "enum",
    enum: COMMUNICATIONTYPE,
    default: COMMUNICATIONTYPE.PHONE
  })
  @Field(type => COMMUNICATIONTYPE)
  preferredCommunicationMethod: COMMUNICATIONTYPE

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  registrationDate: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deceasedDate: Date;

  @Column({ nullable: true, default: false })
  @Field()
  privacyNotice: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  phonePermission: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  voiceCallPermission: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  releaseOfInfoBill: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  callToConsent: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  medicationHistoryAuthority: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientNote: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  language: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pharmacy: string;

  @Column({
    type: "enum",
    enum: RACE,
    default: RACE.OTHER
  })
  @Field(type => RACE, { nullable: true })
  race: RACE

  @Column({
    type: "enum",
    enum: ETHNICITY,
    default: ETHNICITY.NONE
  })
  @Field(type => ETHNICITY, { nullable: true })
  ethnicity: ETHNICITY

  @Column({
    type: "enum",
    enum: MARITIALSTATUS,
    default: MARITIALSTATUS.SINGLE
  })
  @Field(type => MARITIALSTATUS, { nullable: true })
  maritialStatus: MARITIALSTATUS


  @Column({
    type: "enum",
    enum: SEXUALORIENTATION,
    default: SEXUALORIENTATION.NONE
  })
  @Field(type => SEXUALORIENTATION, { nullable: true })
  sexualOrientation: SEXUALORIENTATION

  @Column({
    type: "enum",
    enum: GENDERIDENTITY,
    default: GENDERIDENTITY.NONE
  })
  @Field(type => GENDERIDENTITY, { nullable: true })
  genderIdentity: GENDERIDENTITY

  @Column({
    type: "enum",
    enum: GENDERIDENTITY,
    default: GENDERIDENTITY.NONE
  })
  @Field(type => GENDERIDENTITY, { nullable: true })
  sexAtBirth: GENDERIDENTITY

  @Column({
    type: "enum",
    enum: PRONOUNS,
    default: PRONOUNS.NONE
  })
  @Field(type => PRONOUNS, { nullable: true })
  pronouns: PRONOUNS

  @Column({
    type: "enum",
    enum: HOMEBOUND,
    default: HOMEBOUND.NO
  })
  @Field(type => HOMEBOUND, { nullable: true })
  homeBound: HOMEBOUND

  @Column({
    type: "enum",
    enum: HOLDSTATEMENT,
    default: HOLDSTATEMENT.NONE
  })
  @Field(type => HOLDSTATEMENT, { nullable: true })
  holdStatement: HOLDSTATEMENT

  @Column({ nullable: true, default: false })
  @Field()
  statementDelivereOnline: boolean;

  @Column({ nullable: true })
  @Field()
  statementNote: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  statementNoteDateFrom: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  statementNoteDateTo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];

  @OneToMany(() => Contact, contact => contact.patient, {eager: true, onUpdate: 'CASCADE', onDelete: "CASCADE"})
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @ManyToOne(() => Facility, facility => facility.patients, {eager: true, onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(type => User, { nullable: true })
  user: User;

  @OneToMany(() => DoctorPatient, doctorPatient => doctorPatient.doctor, {onDelete: "CASCADE"})
  @Field(type => [DoctorPatient], { nullable: true })
  doctorPatients: DoctorPatient[];

  @OneToMany(() => Appointment, appointment => appointment.patient, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  appointments: Appointment[];
  
  @OneToMany(() => Employer, employer => employer.patient, {eager: true, onDelete: "CASCADE"})
  @Field(type => [Employer], { nullable: true })
  employer: Employer[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @ManyToOne(() => Transactions, transaction => transaction.id)
  @Field(type => Transactions, { nullable: true })
  transaction: Transactions;
}
