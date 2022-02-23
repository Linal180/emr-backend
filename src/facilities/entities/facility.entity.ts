import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { BillingAddress } from 'src/providers/entities/billing-address.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
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
  AMBULANCE_41 = "AMBULANCE - LAND [41]",
  PHARMACY_01 = "Pharmacy [01]",
  TELEHEALTH_02 = "Telehealth [02]",
  TELEHEALTH_OTHER_THAN_PATIENT_HOME_02 = "Telehealth Provided Other than in Patient's Home [02]",
  SCHOOL_03 = "School [03]",
  TRIBAL_07 = "Tribal 638 Free-standing Facility [07]",
  TRIBAL_08 = " Tribal 638 Provider-based Facility [08]",
  PRISON_09 = " Prison/Correctional Facility [09]",
  PRISON_10 = "Prison/Correctional Facility [10]",
  TELEHEALTH_10 = "Telehealth Provided in Patient's Home [10]",
  OFFICE_11 = "Office [11]",
  HOME_12 = "Home [12]",
  MOBILE_UNIT_15 = "Mobile Unit [15]",
  TEMPORARY_LoOGOING_16 = "Temporary Lodging [16]",
  WALK_IN_RETAIL_HEALTH_CLINIC = "Walk-in Retail Health Clinic [17]",
  PLACE_OF_EMPLOYMENT_18 = "18-Place of Employment",
  AMBULANCE_42 = "AMBULANCE - AIR OR WATER [42]",
  AMBULANCE_24 = "AMBULATORY SURGICAL CENTER [24]",
  ASSISTED_LIVING_13 = "ASSISTED LIVING [13]",
  BIRTHING_CENTER_25 = "BIRTHING CENTER [25]",
  COMMUNITY_MENTAL_HEALTH_CENTER_53 = "COMMUNITY MENTAL HEALTH CENTER [53]",
  COMPREHENSIVE_INPATIENT_REHABILITATION_FACILITY_61 = "COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]",
  COMPREHENSIVE_OUTPATIENT_REHABILITATION_FACILITY_62 = "COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]",
  CUSTODIAL_CARE_FACILITY_33 = "CUSTODIAL CARE FACILITY [33]",
  EMERGENCY_ROOM_23 = "EMERGENCY ROOM [23]",
  END_STAGE_RENAL_DISEASE_TREATMENT_FACILITY_65 = "END STAGE RENAL DISEASE TREATMENT FACILITY [65]",
  FEDERALLY_QUALIFIED_HEALTH_CENTER_50 = "FEDERALLY QUALIFIED HEALTH CENTER [50]",
  GROUP_HOME_14 = "GROUP HOME [14]",
  HOMELESS_SHELTER_04 = "HOMELESS SHELTER [04]",
  HOSPICE_34 = "HOSPICE [34]",
  INDEPENDENT_CLINIC_49 = "INDEPENDENT CLINIC [49]",
  INDEPENDENT_LABORATORY_81 = "INDEPENDENT LABORATORY [81]",
  INDIAN_HEALTH_SERVICE_FREE_STANDING_FACILITY_05 = "INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]",
  INDIAN_HEALTH_SERVICE_PROVIDER_BASED_FACILITY_06 = "INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]"
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

  @Column({
    type: "enum",
    enum: PracticeType,
    nullable: true,
  })
  @Field(type => PracticeType, {nullable: true})
  practiceType: PracticeType

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cliaIdNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  federalTaxId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  revenueCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tamxonomyCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insurancePlanType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timeZone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mammographyCertificationNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  npi: string;

  @Column({
    type: "enum",
    enum: ServiceCode,
    default: ServiceCode.AMBULANCE_24
  })
  @Field(type => ServiceCode)
  serviceCode: ServiceCode

  @Field(() => [Staff], { nullable: true })
  @OneToMany(() => Staff, staff => staff.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  staff: Staff[];

  @Field(() => [Doctor], { nullable: true })
  @OneToMany(() => Doctor, doctor => doctor.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  doctors: Doctor[];

  @OneToMany(() => Patient, patient => patient.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  patients: Patient[];

  @OneToMany(() => Appointment, appointment => appointment.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  appointments: Appointment[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, user => user.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  user: User[];

  @OneToMany(() => Contact, contact => contact.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => Service, service => service.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Service], { nullable: true })
  services: Service[];

  @ManyToOne(() => Practice, practice => practice.facilities, { onDelete: 'CASCADE' })
  @Field(type => Practice, { nullable: true })
  practice: Practice;

  @OneToMany(() => BillingAddress, billingAddress => billingAddress.facility, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [BillingAddress], { nullable: true })
  billingAddress: BillingAddress[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
