import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Invoice } from 'src/payment/entity/invoice.entity'
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';
import { PatientVitals } from 'src/patientCharting/entities/patientVitals.entity';
import { PatientAllergies } from 'src/patientCharting/entities/patientAllergies.entity';
import { LabTests } from 'src/labs/entities/labTests.entity';
import { Billing } from 'src/billings/entities/billing.entity';

export enum PaymentType {
  SELF = "self",
  INSURANCE = "Insurance",
}

registerEnumType(PaymentType, {
  name: "PaymentType",
  description: "The patient payment type assigned",
});

export enum BillingStatus {
  PAID = "paid",
  DUE = "due",
  REFUND = 'refund'
}

registerEnumType(BillingStatus, {
  name: "BillingStatus",
  description: "The patient billing status assigned",
});

export enum AppointmentStatus {
  NO_SHOW = 'no_show',
  INITIATED = "initiated",
	CHECKED_IN = 'checked_in',
	SELF_CHECKED_IN = 'self_checked_in',
  IN_LOBBY = 'in_lobby',
  IN_SESSION = 'in_session',
  COMPLETED = "completed",
  RESCHEDULED = 'rescheduled',
  CANCELLED = "cancelled"
}

registerEnumType(AppointmentStatus, {
  name: "AppointmentStatus",
  description: "The patient appointment status type assigned",
});


@Entity({ name: 'Appointments' })
@ObjectType()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  isExternal: boolean;

  @Column({
    type: "enum",
    enum: PaymentType,
    default: PaymentType.SELF
  })
  @Field(type => PaymentType)
  paymentType: PaymentType;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.INITIATED
  })
  @Field(type => AppointmentStatus)
  status: AppointmentStatus;

  @Column({
    type: "enum",
    enum: BillingStatus,
    default: BillingStatus.DUE
  })
  @Field(type => BillingStatus)
  billingStatus: BillingStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentCancelReason: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  checkedInAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  checkedOutAt: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  selfCheckIn: boolean;

  @Column({ nullable: true, default: '0' })
  @Field({ nullable: true })
  checkInActiveStep: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insuranceCompany: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  membershipID: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  token: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentNumber: string

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  employment: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  autoAccident: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  otherAccident: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  otherPartyResponsible: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  primaryInsurance: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  secondaryInsurance: string;

  @Column({ type: 'timestamptz' })
  @Field({ nullable: true })
  scheduleStartDateTime: string;

  @Column({ type: 'timestamptz' })
  @Field({ nullable: true })
  scheduleEndDateTime: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentTypeId: string;

  @Field({ nullable: true })
  invoiceId: string;

  @ManyToOne(() => Service, facilityService => facilityService.appointments, { onDelete: 'CASCADE' })
  @Field(type => Service, { nullable: true })
  appointmentType: Service;

  @ManyToOne(() => Facility, facility => facility.appointments, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  provider: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @OneToMany(() => LabTests, labTests => labTests.appointment, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [LabTests], { nullable: true })
  labTests: LabTests[];

  @Field(() => Invoice, { nullable: true })
  @OneToOne(() => Invoice, (invoice) => invoice.appointment)
  invoice: Invoice;

  @Field(() => Billing, { nullable: true })
  @OneToOne(() => Billing, (billing) => billing.appointment)
  billing: Billing;

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.appointment)
  @Field(type => [PatientProblems], { nullable: true })
  patientProblem: PatientProblems[];

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.appointment)
  @Field(type => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @OneToMany(() => PatientVitals, patientVitals => patientVitals.appointment)
  @Field(type => [PatientVitals], { nullable: true })
  patientVitals: PatientVitals[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
