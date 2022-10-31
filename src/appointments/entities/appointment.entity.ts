import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Contract } from './contract.entity';
import { Invoice } from 'src/payment/entity/invoice.entity'
import { LabTests } from 'src/labs/entities/labTests.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Billing } from 'src/billings/entities/billing.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Transactions } from 'src/payment/entity/payment.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { ImagingOrder } from 'src/labs/entities/imagingOrder.entity';
import { Vaccine } from 'src/patientCharting/entities/vaccines.entity';
import { PatientConsent } from 'src/patients/entities/patientConsent.entity';
import { UpFrontPayment } from 'src/billings/entities/upFrontPayment.entity';
import { TriageNotes } from 'src/patientCharting/entities/triageNotes.entity';
import { PhysicalExam } from 'src/reviewOfSystems/entities/physicalExam.entity';
import { PatientVitals } from 'src/patientCharting/entities/patientVitals.entity';
import { ReviewOfSystem } from 'src/reviewOfSystems/entities/reviewOfSystem.entity';
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';
import { PatientAllergies } from 'src/patientCharting/entities/patientAllergies.entity';
import { PatientMedication } from 'src/patientCharting/entities/patientMedication.entity';
import { PatientIllnessHistory } from 'src/reviewOfSystems/entities/patientIllnessHistory.entity';

export enum PaymentType {
  SELF = "self",
  INSURANCE = "Insurance",
  CONTRACT = "contract"
}

registerEnumType(PaymentType, {
  name: "PaymentType",
  description: "The patient payment type assigned",
});

export enum AppointmentCreateType {
  APPOINTMENT = 'Appointment',
  TELEHEALTH = 'Telehealth'
}

registerEnumType(AppointmentCreateType, {
  name: "AppointmentCreateType",
  description: "The appointment create type assigned",
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
  SCHEDULED = "scheduled",
  ARRIVED = 'arrived',
  CHECK_IN_ONLINE = 'check_in_online',
  IN_LOBBY = 'in_lobby',
  IN_SESSION = 'in_session',
  RESCHEDULED = 'rescheduled',
  NO_SHOW = 'no_show',
  DISCHARGED = "discharged",
  CANCELLED = "cancelled",
  CHECKOUT = "checkout"
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
    default: AppointmentStatus.SCHEDULED
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

  @Column({
    type: "enum",
    enum: AppointmentCreateType,
    default: AppointmentCreateType.APPOINTMENT
  })
  @Field(type => AppointmentCreateType, { nullable: true })
  appointmentCreateType: AppointmentCreateType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentCancelReason: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insuranceStatus: string;

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
  appointmentDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timeZone: string;

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  cardLast4Digits?: string

  @Field({ nullable: true })
  invoiceId: string;

  //relationships

  @OneToMany(() => ImagingOrder, imagingOrder => imagingOrder.appointment)
  @Field(() => [ImagingOrder], { nullable: true })
  imagingOrders: ImagingOrder[];

  @ManyToOne(() => Service, facilityService => facilityService.appointments, { onDelete: 'CASCADE' })
  @Field(() => Service, { nullable: true })
  appointmentType: Service;

  @ManyToOne(() => Facility, facility => facility.appointments, { onDelete: 'CASCADE' })
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  provider: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @OneToMany(() => LabTests, labTests => labTests.appointment, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [LabTests], { nullable: true })
  labTests: LabTests[];

  @Field(() => Invoice, { nullable: true })
  @OneToOne(() => Invoice, (invoice) => invoice.appointment)
  invoice: Invoice;

  @Field(() => Contract, { nullable: true })
  @OneToOne(() => Contract, (contract) => contract.appointment, { eager: true })
  contract: Contract;

  @Field(() => TriageNotes, { nullable: true })
  @OneToOne(() => TriageNotes, (triageNote) => triageNote.appointment)
  triageNote: TriageNotes;

  @Field(() => PatientIllnessHistory, { nullable: true })
  @OneToOne(() => PatientIllnessHistory, (patientIllnessHistory) => patientIllnessHistory.appointment)
  patientIllnessHistory: PatientIllnessHistory;

  @Field(() => ReviewOfSystem, { nullable: true })
  @OneToOne(() => ReviewOfSystem, (reviewOfSystem) => reviewOfSystem.appointment)
  reviewOfSystem: ReviewOfSystem;

  @Field(() => PhysicalExam, { nullable: true })
  @OneToOne(() => PhysicalExam, (physicalExam) => physicalExam.appointment)
  physicalExam: PhysicalExam;

  @Field(() => Billing, { nullable: true })
  @OneToOne(() => Billing, (billing) => billing.appointment)
  billing: Billing;

  @Field(() => UpFrontPayment, { nullable: true })
  @OneToOne(() => UpFrontPayment, (upFrontPayment) => upFrontPayment.appointment)
  upFrontPayment: UpFrontPayment;

  @Field(() => Transactions, { nullable: true })
  @OneToOne(() => Transactions, (transaction) => transaction.appointment)
  transaction: Transactions;

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.appointment)
  @Field(() => [PatientProblems], { nullable: true })
  patientProblem: PatientProblems[];

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.appointment)
  @Field(() => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @OneToMany(() => PatientMedication, patientMedications => patientMedications.appointment)
  @Field(() => [PatientMedication], { nullable: true })
  patientMedications: PatientMedication[];

  @OneToMany(() => PatientVitals, patientVitals => patientVitals.appointment)
  @Field(() => [PatientVitals], { nullable: true })
  patientVitals: PatientVitals[];

  @OneToMany(() => Vaccine, vaccine => vaccine.appointment)
  @Field(() => [Vaccine], { nullable: true })
  vaccines: Vaccine[];

  @Field(() => PatientConsent, { nullable: true })
  @OneToOne(() => PatientConsent, consent => consent.appointment)
  patientConsent: PatientConsent;

  //dates 

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
