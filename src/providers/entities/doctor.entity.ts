import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @Field()
  firstName: string;

  @Column({ nullable: true })
  @Field()
  middleName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field()
  prefix: string;

  @Column({ nullable: true })
  @Field()
  suffix: string;

  @Column({ nullable: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  providerIntials: string;

  @Column({ nullable: true })
  @Field()
  degreeCredentials: string;

  @Column({
    type: "enum",
    enum: Speciality,
    default: Speciality.GASTROENTEROLOGY
  })
  @Field(type => Speciality)
  speciality: Speciality

  @Column({ nullable: true })
  @Field()
  dob: string;

  @Column({ nullable: true })
  @Field()
  ssn: string;

  @Column({
    type: "enum",
    enum: SsnType,
    default: SsnType.MEDICAID
  })
  @Field(type => SsnType)
  ssnType: SsnType

  @Column({ nullable: true })
  @Field()
  taxonomyCode: string;

  @Column({ nullable: true })
  @Field()
  deaNumber: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaActiveDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaTermDate: string;

  @Column({ nullable: true })
  @Field()
  languagesSpoken: string;

  @Column({ nullable: true })
  @Field()
  taxId: string;

  @Column({ nullable: true })
  @Field()
  npi: string;

  @Column({ nullable: true })
  @Field()
  upin: string;

  @Column({ nullable: true })
  @Field()
  emcProviderId: string;

  @Column({ nullable: true })
  @Field()
  billingFacility: string;

  @Column({ nullable: true })
  @Field()
  medicareGrpNumber: string;

  @Column({ nullable: true })
  @Field()
  medicaidGrpNumber: string;

  @Column({ nullable: true })
  @Field()
  meammographyCertNumber: string;

  @Column({ nullable: true })
  @Field()
  campusGrpNumber: string;

  @Column({ nullable: true })
  @Field()
  blueShildNumber: string;

  @Column({ nullable: true })
  @Field()
  taxIdStuff: string;

  @Column({ nullable: true })
  @Field()
  specialityLicense: string;

  @Column({ nullable: true })
  @Field()
  anesthesiaLicense: string;

  @Column({ nullable: true })
  @Field()
  dpsCtpNumber: string;

  @Column({ nullable: true })
  @Field()
  stateLicense: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  licenseActiveDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  licenseTermDate: string;

  @Column({ nullable: true })
  @Field()
  prescriptiveAuthNumber: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(type => User, { nullable: true })
  user: User;

  @ManyToOne(() => Facility, facility => facility.doctors, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @OneToMany(() => Contact, contact => contact.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => BillingAddress, billingAddress => billingAddress.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  @Field(type => [BillingAddress], { nullable: true })
  billingAddress: BillingAddress[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
