import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Invoice } from 'src/payment/entity/invoice.entity'

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
}

registerEnumType(BillingStatus, {
  name: "BillingStatus",
  description: "The patient billing status assigned",
});

export enum APPOINTMENTSTATUS {
  CANCELLED = "cancelled",
  INITIATED = "initiated",
  COMPLETED = "completed"
}

registerEnumType(APPOINTMENTSTATUS, {
  name: "APPOINTMENTSTATUS",
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
    enum: APPOINTMENTSTATUS,
    default: APPOINTMENTSTATUS.INITIATED
  })
  @Field(type => APPOINTMENTSTATUS)
  status: APPOINTMENTSTATUS;

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
  appointmentTypeId: string;

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

  @Field(() => Invoice, { nullable: true })
  @OneToOne(() => Invoice, (invoice) => invoice.appointment, { eager: true })
  invoice: Invoice;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
