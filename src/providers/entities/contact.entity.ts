import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

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
  ssn: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  employerName: string;

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

  @ManyToOne(() => Facility, facility => facility.contacts, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.contacts, { onDelete: 'CASCADE' })
  @Field(type => Patient, { nullable: true })
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
