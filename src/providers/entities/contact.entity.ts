import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Doctor } from './doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Insurance } from 'src/insurance/entities/insurance.entity';

//enums

export enum ServiceCodes {
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

registerEnumType(ServiceCodes, {
  name: "ServiceCodes",
  description: "The facility service code type assigned",
});

export enum RelationshipType {
  SELF = "Self",
  WARD = "Ward",
  CHILD = "Child",
  OTHER = "Other",
  SPOUSE = "Spouse",
  FRIEND = "Friend",
  MOTHER = "Mother",
  PARENT = "Parent",
  FATHER = "Father",
  COUSIN = "Cousin",
  UNKNOWN = "Unknown",
  SIBLING = "Sibling",
  EMPLOYEE = "Employee",
  GUARDIAN = "guardian",
  GRANDCHILD = "Grandchild",
  ORGAN_DONOR = "Organ Donor",
  GRANDPARENT = "Grandparent",
  LIFE_PARTNER = "Life partner",
  FOSTER_CHILD = "Foster Child",
  CADAVER_DONOR = "Cadaver Donor",
  NEPHEW_NIECE = "Nephew or Niece",
  EMANCIPATED_MINOR = "Emancipated Minor",
  INJURED_PLAINTIFF = "Injured Plaintiff",
  SIGNIFICANT_OTHER = "Significant Other",
  SPONSORED_DEPENDENT = "Sponsored Dependent",
  HANDICAPPED_DEPENDENT = "Handicapped Dependent",
  STEPSON_STEPDAUGHTER = "Stepson or Stepdaughter",
  CHILD_MOTHER_INSURANCE = "Child (Mother's Insurance)",
  CHILD_FATHER_INSURANCE = "Child (Father's Insurance)",
  DEPENDENT_OF_MINOR_DEPENDENT = "Dependent of a Minor Dependent",
  STEPSON_STEPDAUGHTER_STEPMOTHER_INSURANCE = "Stepson or Stepdaughter (Stepmother's Insurance)",
  STEPSON_STEPDAUGHTER_STEPFATHER_INSURANCE = "Stepson or Stepdaughter (Stepfather's Insurance)",
}

registerEnumType(RelationshipType, {
  name: "RelationshipType",
  description: "The user's relationship assigned",
});

export enum ContactType {
  SELF = "Self",
  EMERGENCY = "Emergency",
  NEXT_OF_KIN = "Next of Kin",
  CHILD_MOTHER_INSURANCE = "Child (Mother's Insurance)",
  GUARDIAN = "guardian",
  GUARANDOR = "gurantor"
}

registerEnumType(ContactType, {
  name: "ContactType",
  description: "The user's contact type assigned",
});

@Entity({ name: 'Contacts' })
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  suffix: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pager: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  primaryContact: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  locationLink: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ssn: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  employerName: string;

  @Column({
    type: "enum",
    enum: ServiceCodes,
    default: ServiceCodes.Ambulatory_Surgical_Center_24,
    nullable: true
  })
  @Field(type => ServiceCodes, { nullable: true })
  serviceCode: ServiceCodes

  @Column({
    type: "enum",
    enum: RelationshipType,
    default: RelationshipType.SELF
  })
  @Field(type => RelationshipType, { nullable: true })
  relationship: RelationshipType

  @Column({
    type: "enum",
    enum: ContactType,
    default: ContactType.SELF
  })
  @Field(type => ContactType, { nullable: true })
  contactType: ContactType

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insuranceId: string;

  @ManyToOne(() => Facility, facility => facility.contacts, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.contacts, { onDelete: 'CASCADE' })
  patient: Patient;

  @ManyToOne(() => Insurance, insurance => insurance.contacts, { onDelete: 'CASCADE' })
  insurance: Insurance;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
