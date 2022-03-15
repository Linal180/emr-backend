import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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

  @Column({ nullable: false })
  @Field({ nullable: false })
  transactionId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  patientId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  doctorId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  facilityId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  appointmentId: string;

  @OneToMany(() => Patient, (patient) => patient.id)
  @Field(() => [Patient], { nullable: true })
  patient: Patient[];

  @OneToMany(() => Doctor, (doctor) => doctor.id)
  @Field(() => [Doctor], { nullable: true })
  doctor: Doctor[];

  @OneToMany(() => Facility, (facility) => facility.id)
  @Field(() => [Facility], { nullable: true })
  facility: Facility[];

  @OneToOne(() => Appointment)
  @JoinTable()
  @Field(() => Appointment, { nullable: true })
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
  @OneToMany(() => Invoice, (invoice) => invoice.id)
  invoice: Invoice[];

}
