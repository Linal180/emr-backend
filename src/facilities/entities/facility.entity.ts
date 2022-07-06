import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Agreement } from 'src/agreements/entities/agreement.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Transactions } from 'src/payment/entity/payment.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { BillingAddress } from 'src/providers/entities/billing-address.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Schedule } from 'src/providers/entities/schedule.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Service } from './services.entity';

export enum PracticeType {
  HOSPITAL = "hospital",
  LAB = "lab",
  CLINIC = "clinic",
}

registerEnumType(PracticeType, {
  name: "PracticeType",
  description: "The facility practice type assigned type",
});

export enum ServiceCode {
  Pharmacy_01 = '01 - Pharmacy',
  Telehealth_02 = '02 - Telehealth',
  Telehealth_Provided_Other_than_in_Patients_Home_02 = "02 - Telehealth Provided Other than in Patient's Home",
  School_03 = '03 - School',
  Homeless_Shelter_04 = '04 - Homeless Shelter',
  Indian_Health_Service_Free_standing_Facility_05 = '05 - Indian Health Service Free-standing Facility',
  Indian_Health_Service_Provider_based_Facility_06 = '06 - Indian Health Service Provider-based Facility',
  Tribal_638_Free_standing_Facility_07 = '07 - Tribal 638 Free-standing Facility',
  Tribal_638_Provider_based_Facility_08 = '08 - Tribal 638 Provider-based Facility',
  Prison_Correctional_Facility_09 = '09 - Prison/Correctional Facility',
  Prison_Correctional_Facility_10 = '10 - Prison/Correctional Facility',
  Telehealth_Provided_in_Patients_Home_10 = "10 - Telehealth Provided in Patient's Home",
  Office_11 = '11 - Office',
  Home_12 = '12 - Home',
  Assisted_Living_13 = '13 - Assisted Living',
  Group_Home_14 = '14 - Group Home',
  Mobile_Unit_15 = '15 - Mobile Unit',
  Temporary_Lodging_16 = '16 - Temporary Lodging',
  Walk_in_Retail_Health_Clinic_17 = '17 - Walk-in Retail Health Clinic',
  Place_of_Employment_18 = '18 - Place of Employment',
  Off_Campus_Outpatient_Hospital_19 = '19 - Off Campus-Outpatient Hospital',
  Urgent_Care_20 = '20 - Urgent Care',
  Inpatient_Hospital_21 = '21 - Inpatient Hospital',
  Outpatient_Hospital_22 = '22 - Outpatient Hospital',
  Emergency_Room_Hospital_23 = '23 - Emergency Room - Hospital',
  Ambulatory_Surgical_Center_24 = '24 - Ambulatory Surgical Center',
  Birthing_Center_25 = '25 - Birthing Center',
  Military_Treatment_Facility_26 = '26 - Military Treatment Facility',
  Skilled_Nursing_Facility_31 = '31 - Skilled Nursing Facility',
  Nursing_Facility_32 = '32 - Nursing Facility',
  Custodial_Care_Facility_33 = '33 - Custodial Care Facility',
  Hospice_34 = '34 - Hospice',
  Ambulance_Land_41 = '41 - Ambulance - Land',
  Ambulance_Air_or_Water_42 = '42 - Ambulance - Air or Water',
  Independent_Clinic_49 = '49 - Independent Clinic',
  Federally_Qualified_Health_Center_50 = '50 - Federally Qualified Health Center',
  Inpatient_Psychiatric_Facility_51 = '51 - Inpatient Psychiatric Facility',
  Psychiatric_Facility_Partial_Hospitilzation_52 = '52 - Psychiatric Facility Partial Hospitilzation',
  Community_Mental_Health_Center_53 = '53 - Community Mental Health Center',
  Intermediate_Care_Facility_Mentally_Retarded_54 = '54 - Intermediate Care Facility/Mentally Retarded',
  Residential_Substance_Abuse_Treatment_Facility_55 = '55 - Residential Substance Abuse Treatment Facility',
  Psychiatric_Residential_Treatment_Center_56 = '56 - Psychiatric Residential Treatment Center',
  Non_residential_Substance_Abuse_Treatment_Facility_57 = '57 - Non-residential Substance Abuse Treatment Facility',
  Non_residential_Opioid_Treatment_Facility_58 = '58 - Non-residential Opioid Treatment Facility',
  Mass_Immunization_Center_60 = '60 - Mass Immunization Center',
  Comprehensive_Inpatient_Rehabilitation_Facility_61 = '61 - Comprehensive Inpatient Rehabilitation Facility',
  Comprehensive_Outpatient_Rehabilitation_Facility_62 = '62 - Comprehensive Outpatient Rehabilitation Facility',
  End_Stage_Renal_Disease_Treatment_Facility_65 = '65 - End Stage Renal Disease Treatment Facility',
  State_or_Local_Public_Health_Clinic_71 = '71 - State or Local Public Health Clinic',
  Rural_Health_Clinic_72 = '72 - Rural Health Clinic',
  Independent_Laboratory_81 = '81 - Independent Laboratory',
  Other_Unlisted_Facility_99 = '99 - Other Unlisted Facility',
}

registerEnumType(ServiceCode, {
  name: "ServiceCode",
  description: "The facility service code type assigned",
});

@Entity({ name: 'Facilities' })
@ObjectType()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  startTime: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  endTime: string;

  @Column({
    type: "enum",
    enum: PracticeType,
    nullable: true,
  })
  @Field(type => PracticeType, { nullable: true })
  practiceType: PracticeType

  @Column({ nullable: true })
  @Field({ nullable: true })
  cliaIdNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  federalTaxId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isPrimary: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tamxonomyCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timeZone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mammographyCertificationNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({
    type: "enum",
    enum: ServiceCode,
    default: ServiceCode.Pharmacy_01,
    nullable: true
  })
  @Field(type => ServiceCode, { nullable: true })
  serviceCode: ServiceCode

  @Field(() => [Staff], { nullable: true })
  @OneToMany(() => Staff, staff => staff.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  staff: Staff[];

  @Field(() => [Doctor], { nullable: true })
  @OneToMany(() => Doctor, doctor => doctor.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  doctors: Doctor[];

  @OneToMany(() => Patient, patient => patient.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  patients: Patient[];

  @Field(() => [Appointment], { nullable: true })
  @OneToMany(() => Appointment, appointment => appointment.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  appointments: Appointment[];

  @Field(() => [Agreement], { nullable: true })
  @OneToMany(() => Agreement, agreement => agreement.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  agreements: Agreement[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, user => user.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  user: User[];

  @OneToMany(() => Contact, contact => contact.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => Service, service => service.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Service], { nullable: true })
  services: Service[];

  @ManyToOne(() => Practice, practice => practice.facilities, { onDelete: 'CASCADE' })
  @Field(type => Practice, { nullable: true })
  practice: Practice;

  @OneToMany(() => BillingAddress, billingAddress => billingAddress.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [BillingAddress], { nullable: true })
  billingAddress: BillingAddress[];

  @OneToMany(() => Schedule, schedule => schedule.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Schedule], { nullable: true })
  schedule: Schedule[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @OneToMany(() => Transactions, transaction => transaction.facility)
  @Field(() => [Transactions], { nullable: true })
  transaction: Transactions[];

}