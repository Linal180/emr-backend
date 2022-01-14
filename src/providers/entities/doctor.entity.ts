import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BillingAddress } from './billing-address.entity';
import { Contact } from './contact.entity';


export enum Speciality {
  PHYSICIAN_ASSISTANT = "Physician Assistant",
  PHARMACIST = "Pharmacist",
  PERIODONTICS = "Periodontics",
  PEDIATRIC_DENTIST = "Pediatric Dentist",
  PEDIATRIC_DERMATOLOGY = "Pediatric Dermatology",
  NEUROLOGY = "Neurology",
  GASTROENTEROLOGY = "Gastroenterology"
}

registerEnumType(Speciality, {
  name: "Speciality",
  description: "The doctor's speciality",
});

export enum SsnType {
  OASDI = "OASDI",
  TANF = "Tanf",
  MEDICARE = "Medicare",
  MEDICAID = "medicaid"
}

registerEnumType(SsnType, {
  name: "SsnType",
  description: "The doctor's SsnType",
});

@Entity({ name: 'Doctors' })
@ObjectType()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;

  @Column()
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prefix: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  suffix: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  providerIntials: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  degreeCredentials: string;

  @Column({
    type: "enum",
    enum: Speciality,
    default: Speciality.GASTROENTEROLOGY
  })
  @Field(type => Speciality, { nullable: true })
  speciality: Speciality

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ssn: string;

  @Column({
    type: "enum",
    enum: SsnType,
    default: SsnType.MEDICAID
  })
  @Field(type => SsnType, { nullable: true })
  ssnType: SsnType

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxonomyCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deaNumber: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaActiveDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaTermDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  languagesSpoken: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  upin: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  emcProviderId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  billingFacility: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicareGrpNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicaidGrpNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  meammographyCertNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  campusGrpNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  blueShildNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxIdStuff: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  specialityLicense: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  anesthesiaLicense: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dpsCtpNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stateLicense: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  licenseActiveDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  licenseTermDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prescriptiveAuthNumber: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(type => User, { nullable: true })
  user: User;

  @ManyToOne(() => Facility, facility => facility.doctors, { eager: true, onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @OneToMany(() => Contact, contact => contact.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => BillingAddress, billingAddress => billingAddress.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [BillingAddress], { nullable: true })
  billingAddress: BillingAddress[];

  @Field(type => [Patient], { nullable: 'itemsAndList' })
  @ManyToMany(type => Patient, patient => patient.usualProvider)
  @JoinTable({ name: 'DoctorPatients' })
  patients: Patient[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
