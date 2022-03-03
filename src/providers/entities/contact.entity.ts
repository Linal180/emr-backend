import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

export enum ServiceCodes {
  AMBULANCE_41 = "AMBULANCE - LAND [41]",
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

registerEnumType(ServiceCodes, {
  name: "ServiceCodes",
  description: "The facility service code type assigned",
});

export enum RelationshipType {
  SELF = "Self",
  SPOUSE = "Spouse",
  CHILD = "Child",
  CHILD_MOTHER_INSURANCE = "Child (Mother's Insurance)",
  CHILD_FATHER_INSURANCE = "Child (Father's Insurance)",
  OTHER = "Other",
  GRANDPARENT = "Grandparent",
  GRANDCHILD = "Grandchild",
  NEPHEW_NIECE = "Nephew or Niece",
  FOSTHER_CHILD = "Foster Child",
  WARD = "Ward",
  STEPSON_STEPDAUGHTER = "Stepson or Stepdaughter",
  STEPSON_STEPDAUGHTER_STEPMOTHER_INSRTANCE = "Stepson or Stepdaughter (Stepmother's Insurance)",
  STEPSON_STEPDAUGHTER_STEPFATHER_INSRTANCE = "Stepson or Stepdaughter (Stepfather's Insurance)",
  EMPLOYEE = "Employee",
  UNKNOWN = "Unknown",
  HANDICAPPED_DEPENDENT = "Handicapped Dependent",
  SPONSORED_DEPENDENT = "Sponsored Dependent",
  DEPENDENT_OF_MINOR_DEPENDENT = "Dependent of a Minor Dependent",
  SIGNIFICANT_OTHER = "Significant Other",
  MOTHER = "Mother",
  FATHER = "Father",
  EMANCIPATED_MINOR = "Emancipated Minor",
  ORGAN_DONOR = "Organ Donor",
  CADAVER_DONOR = "Cadaver Donor",
  INJURED_PLAINTIIFF = "Injured Plaintiff",
  LIFE_PARTNER = "Life partner"
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
    default: ServiceCodes.AMBULANCE_24
  })
  @Field(type => ServiceCodes)
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

  @ManyToOne(() => Facility, facility => facility.contacts, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.contacts, { onDelete: 'CASCADE' })
  patient: Patient;

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
