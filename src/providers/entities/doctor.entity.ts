import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Billing } from 'src/billings/entities/billing.entity';
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
  General_Practice_01 = '01 General Practice',
  General_Surgery_02 = '02 General Surgery',
  Allergy_Immunology_03 = '03 Allergy/Immunology',
  Otolaryngology_04 = '04 Otolaryngology',
  Anesthesiology_05 = '05 Anesthesiology',
  Cardiology_06 = '06 Cardiology',
  Dermatology_07 = '07 Dermatology',
  Family_Practice_08 = '08 Family Practice',
  Interventional_Pain_Management_09 = '09 Interventional Pain Management',
  Gastroenterology_10 = '10 Gastroenterology',
  Internal_Medicine_11 = '11 Internal Medicine',
  Osteopathic_Manipulative_Therapy_12 = '12 Osteopathic Manipulative Therapy',
  Neurosurgery_14 = '14 Neurosurgery',
  Unassigned_15 = '15 Unassigned',
  Obstetrics_Gynecology_16 = '16 Obstetrics/Gynecology',
  Unassigned_17 = '17 Unassigned',
  Ophthalmology_18 = '18 Ophthalmology',
  Oral_Surgery_dentists_only_19 = '19 Oral Surgery (dentists only)',
  Orthopedic_Surgery_20 = '20 Orthopedic Surgery',
  Unassigned_21 = '21 Unassigned',
  Pathology_22 = '22 Pathology',
  Unassigned_23 = '23 Unassigned',
  Plastic_and_Reconstructive_Surgery_24 = '24 Plastic and Reconstructive Surgery',
  Physical_Medicine_and_Rehabilitation_25 = '25 Physical Medicine and Rehabilitation',
  Psychiatry_26 = '26 Psychiatry',
  Unassigned_27 = '27 Unassigned',
  Colorectal_Surgery_formerly_proctology_28 = '28 Colorectal Surgery (formerly proctology)',
  Pulmonary_Disease_29 = '29 Pulmonary Disease',
  Diagnostic_Radiology_30 = '30 Diagnostic Radiology',
  Unassigned_31 = '31 Unassigned',
  Thoracic_Surgery_33 = '33 Thoracic Surgery',
  Urology_34 = '34 Urology',
  Chiropractic_35 = '35 Chiropractic',
  Nuclear_Medicine_36 = '36 Nuclear Medicine',
  Pediatric_Medicine_37 = '37 Pediatric Medicine',
  Geriatric_Medicine_38 = '38 Geriatric Medicine',
  Nephrology_39 = '39 Nephrology',
  Hand_Surgery_40 = '40 Hand Surgery',
  Optometry_41 = '41 Optometry',
  Infectious_Disease_44 = '44 Infectious Disease',
  Endocrinology_46 = '46 Endocrinology',
  Podiatry_48 = '48 Podiatry',
  Rheumatology_66 = '66 Rheumatology',
  Multispecialty_Clinic_or_Group_Practice_70 = '70 Multispecialty Clinic or Group Practice',
  Pain_Management_72 = '72 Pain Management',
  Peripheral_Vascular_Disease_76 = '76 Peripheral Vascular Disease',
  Vascular_Surgery_77 = '77 Vascular Surgery',
  Cardiac_Surgery_78 = '78 Cardiac Surgery',
  Addiction_Medicine_79 = '79 Addiction Medicine',
  Critical_Care_Intensivists_81 = '81 Critical Care (Intensivists)',
  Hematology_82 = '82 Hematology',
  Hematology_Oncology_83 = '83 Hematology/Oncology',
  Preventive_Medicine_84 = '84 Preventive Medicine',
  Radiation_Oncology_92 = '92 Radiation Oncology',
  Emergency_Medicine_93 = '93 Emergency Medicine',
  Interventional_Radiology_94 = '94 Interventional Radiology',
  Gynecological_Oncology_98 = '98 Gynecological/Oncology',
  Unknown_Physician_Specialty_99 = '99 Unknown Physician Specialty',
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
    default: Speciality.General_Practice_01
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

  @OneToMany(() => Billing, billing => billing.servicingProvider, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Billing], { nullable: true })
  primaryProviderBillings: Billing[];

  @OneToMany(() => Billing, billing => billing.renderingProvider, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Billing], { nullable: true })
  renderingProviderBillings: Billing[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @OneToMany(() => Transactions, transaction => transaction.doctor)
  @Field(() => [Transactions], { nullable: true })
  transaction: Transactions[];

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
}
