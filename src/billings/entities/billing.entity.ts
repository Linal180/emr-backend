import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
//entities
import { Code } from './code.entity';
import { ClaimStatus } from './claim-status.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { FeeSchedule } from 'src/feeSchedule/entities/feeSchedule.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Claim } from './claim.entity';

export enum PatientPaymentType {
  INSURANCE = "Insurance",
  NO_INSURANCE = "No Insurance",
}

registerEnumType(PatientPaymentType, {
  name: "PatientPaymentType",
  description: "The patient payment type used to billing",
});

// export enum PatientBillingStatus {
//   PAID_IN_FULL = "Paid In Full",
//   BALANCE_DUE = "Balance Due",
//   SETTLED = 'Settled',
//   INTERNAL_REVIEW = 'Internal Review',
//   BILL_INSURANCE = 'Bill Insurance',
//   BILL_SECONDARY_INSURANCE = 'Bill Secondary Insurance',
//   WORKERS_COMP_CLAIM = "Worker's Comp Claim",
//   AUTO_ACCIDENT_CLAIM = 'Auto Accident Claim',
//   DURABLE_MEDICAL_EQUIPMENT_CLAIM = "Durable Medical Equipment Claim"
// }

// registerEnumType(PatientBillingStatus, {
//   name: "PatientBillingStatus",
//   description: "The patient billing status assigned",
// });

export enum OnsetDateType {
  DATE_OF_ACCIDENT = "Date of Accident",
  DATE_OF_HOSPITALIZATION = "Date of Hospitalization"
}

registerEnumType(OnsetDateType, {
  name: "OnsetDateType",
  description: "The patient billing status assigned",
});

export enum OtherDateType {
  INITIAL_VISIT_DATE = "Initial Visit Date",
  INITIAL_TREATMENT_DATE = "Initial Treatment Date",
  LAST_RELATED_VISIT = 'Last Related Visit',
}

registerEnumType(OtherDateType, {
  name: "OtherDateType",
  description: "The patient billing status assigned",
});

@Entity({ name: 'Billings' })
@ObjectType()
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: PatientPaymentType,
    default: PatientPaymentType.NO_INSURANCE
  })
  @Field(() => PatientPaymentType)
  patientPaymentType: PatientPaymentType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  amount: string;

  @Column({
    type: "enum",
    enum: OnsetDateType,
    default: OnsetDateType.DATE_OF_ACCIDENT
  })
  @Field(() => OnsetDateType)
  onsetDateType: OnsetDateType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  onsetDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  to: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  from: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  labOrderNumber: string;

  @Column({
    type: "enum",
    enum: OtherDateType,
    default: OtherDateType.INITIAL_VISIT_DATE
  })
  @Field(() => OtherDateType)
  otherDateType: OtherDateType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  otherDate: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  employment: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  autoAccident: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  otherAccident: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimNo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  serviceDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pos: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  uncoveredAmount: string;

  @OneToMany(() => Code, code => code.billing, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Code], { nullable: true })
  codes: Code[];

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, (appointment) => appointment.billing)
  @JoinColumn()
  appointment: Appointment;

  @ManyToOne(() => Patient, patient => patient.billings, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Facility, facility => facility.billings, { onDelete: 'CASCADE' })
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => ClaimStatus, claimStatus => claimStatus.billings)
  @Field(() => ClaimStatus, { nullable: true })
  claimStatus: ClaimStatus;

  @ManyToOne(() => Doctor, doctor => doctor.primaryProviderBillings, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  servicingProvider: Doctor;

  @ManyToOne(() => Doctor, doctor => doctor.renderingProviderBillings, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  renderingProvider: Doctor;

  @ManyToOne(() => FeeSchedule, feeSchedule => feeSchedule.billing, { onDelete: 'CASCADE' })
  @Field(() => FeeSchedule, { nullable: true })
  feeSchedule: FeeSchedule;

  @OneToOne(() => Claim, claim => claim.billing, { onDelete: 'CASCADE' })
  @Field(() => Claim, { nullable: true })
  claim: Claim;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  feeScheduleId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  servicingProviderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  renderingProviderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimStatusId: string

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
