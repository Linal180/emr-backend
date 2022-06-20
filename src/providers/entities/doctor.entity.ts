import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Policy } from 'src/insurance/entities/policy.entity';
import { LabTests } from 'src/labs/entities/labTests.entity';
import { PatientAllergies } from 'src/patientCharting/entities/patientAllergies.entity';
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';
import { DoctorPatient } from 'src/patients/entities/doctorPatient.entity';
import { Transactions } from 'src/payment/entity/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BillingAddress } from './billing-address.entity';
import { Contact } from './contact.entity';
import { Schedule } from './schedule.entity';
import { Staff } from './staff.entity';


export enum Speciality {
  PHYSICIAN_ASSISTANT = "Physician Assistant",
  PHARMACIST = "Pharmacist",
  PERIODONTICS = "Periodontics",
  PEDIATRIC_DENTIST = "Pediatric Dentist",
  PEDIATRIC_DERMATOLOGY = "Pediatric Dermatology",
  NEUROLOGY = "Neurology",
  GASTROENTEROLOGY = "Gastroenterology",
  GENERAL_PRACTICE = "General Practice",
  GENERAL_SURGERY = "General Surgery",
  ALLERGY_OR_IMMUNOLOGY = 'Allergy/Immunology',
  OTOLARYNGOLOGY = "Otolaryngology",
  ANESTHESIOLOGY = "Anesthesiology",
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  FAMILY_PRACTICE = 'Family Practice',
  INTERVENTIONAL_PAIN_MANAGEMENT = 'Interventional Pain Management',
  INTERNAL_MEDICINE = 'Internal Medicine',
  OSTEOPATHIC_MANIPULATIVE_THERAPY = 'Osteopathic Manipulative Therapy',
  NEUROSURGERY = "Neurosurgery",
  OPHTHALMOLOGY = "Ophthalmology",
  OBSTETRICS_OR_GYNECOLOGY = 'Obstetrics/Gynecology',
  ORAL_SURGERY = 'Oral Surgery',
  ORTHOPEDIC_SURGERY = 'Orthopedic Surgery',
  PATHOLOGY = 'Pathology',
  PLASTIC_AND_RECONSTRUCTIVE_SURGERY = "Plastic and Reconstructive Surgery",
  PHYSICAL_MEDICINE_AND_REHABILITATION = 'Physical Medicine and Rehabilitation',
  PSYCHIATRY = 'Psychiatry'
}

registerEnumType(Speciality, {
  name: "Speciality",
  description: "The doctor's speciality",
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
  telehealthLink: string;

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  timeZone: string;

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxonomyCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deaNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deaActiveDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  licenseActiveDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  licenseTermDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prescriptiveAuthNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

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

  @OneToMany(() => DoctorPatient, doctorPatient => doctorPatient.patient)
  doctorPatients: DoctorPatient[];

  @OneToMany(() => Schedule, schedule => schedule.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Schedule], { nullable: true })
  schedule: Schedule[];

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [PatientProblems], { nullable: true })
  patientProblem: PatientProblems[];

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @OneToMany(() => Appointment, appointment => appointment.provider, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  appointments: Appointment[];

  @Field(type => [Staff], { nullable: 'itemsAndList' })
  @ManyToMany(type => Staff, staff => staff.providers)
  @JoinTable({ name: 'doctorStaff' })
  staff: Staff[];

  @OneToMany(() => LabTests, labTests => labTests.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [LabTests], { nullable: true })
  labTests: LabTests[];

  @OneToMany(() => LabTests, labTests => labTests.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [LabTests], { nullable: true })
  primaryProviderLabTests: LabTests[];

  @OneToMany(() => LabTests, labTests => labTests.doctor, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [LabTests], { nullable: true })
  referringProviderLabTests: LabTests[];
  
  @OneToMany(() => Policy, policies => policies.referringProvider, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Policy], { nullable: true })
  policyOfReferringProvider: Policy[];

  @OneToMany(() => Policy, policies => policies.primaryCareProvider, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Policy], { nullable: true })
  policyOfPrimaryCareProvider: Policy[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @ManyToOne(() => Transactions, transaction => transaction.id)
  @Field(type => Transactions, { nullable: true })
  transaction: Transactions;

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
}
