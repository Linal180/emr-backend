import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UpFrontPayment } from './upFrontPayment.entity';
//entities

@Entity({ name: 'UpFrontPaymentType' })
@ObjectType()
export class UpFrontPaymentType {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dueAmount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  copayType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  @ManyToOne(() => UpFrontPayment, UpFrontPayment => UpFrontPayment.UpFrontPaymentTypes, { onDelete: 'CASCADE' })
  @Field(type => UpFrontPayment, { nullable: true })
  UpFrontPayment: UpFrontPayment;

  @Column({ nullable: true })
  @Field({ nullable: true })
  upFrontPaymentId: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
