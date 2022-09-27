import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UpFrontPaymentType } from './upFrontPaymentType.entity';
//entities

@Entity({ name: 'UpFrontPayment' })
@ObjectType()
export class UpFrontPayment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  totalCharges: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  expected: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  balance: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  paid: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  adjustments: string

  @OneToMany(() => UpFrontPaymentType, UpFrontPaymentType => UpFrontPaymentType.UpFrontPayment, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [UpFrontPaymentType], { nullable: true })
  UpFrontPaymentTypes: UpFrontPaymentType[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, (appointment) => appointment.billing)
  @JoinColumn()
  appointment: Appointment;

  @ManyToOne(() => Patient, patient => patient.billings, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
