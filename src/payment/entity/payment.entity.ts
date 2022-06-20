import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//user imports
import { Patient } from '../../patients/entities/patient.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Facility } from '../../facilities/entities/facility.entity';
import { Doctor } from '../../providers/entities/doctor.entity';
import { Invoice } from './invoice.entity';
//enums , constants
export enum TRANSACTIONSTATUS {
  REFUND = 'refund',
  DUE = 'due',
  PAID = 'paid',
}
//register enums with graphql
registerEnumType(TRANSACTIONSTATUS, {
  name: 'TRANSACTIONSTATUS',
  description: 'The transaction payment status type assigned',
});
//entity
@Entity({ name: 'Transactions' })
@ObjectType()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  @ManyToOne(() => Patient, (patient) => patient.transaction)
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.transaction)
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Facility, (facility) => facility.transaction)
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, (appointment) => appointment.transaction)
  @JoinTable()
  appointment: Appointment;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @Column({
    type: 'enum',
    enum: TRANSACTIONSTATUS,
    default: TRANSACTIONSTATUS.DUE,
  })
  @Field((type) => TRANSACTIONSTATUS)
  status: TRANSACTIONSTATUS;

  @Field(() => [Invoice], { nullable: true })
  @OneToMany(() => Invoice, (invoice) => invoice.transaction)
  invoice: Invoice[];

}
