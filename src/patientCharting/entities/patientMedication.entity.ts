import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Medications } from './medications.entity';
import { PatientProblems } from './patientProblems.entity';

@Entity({ name: 'PatientMedication' })
@ObjectType()
export class PatientMedication {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({nullable: true})
  @Field({nullable: true})
  sig: string

  @Column({nullable: true})
  @Field({nullable: true})
  takeAmount: string

  @Column({nullable: true})
  @Field({nullable: true})
  tabletUnit: string

  @Column({nullable: true})
  @Field({nullable: true})
  timeDuration: string

  @Column({nullable: true})
  @Field({nullable: true})
  noOfDays: string

  @Column({nullable: true})
  @Field({nullable: true})
  oralRoute: string

  @Column({nullable: true})
  @Field({nullable: true})
  startDate: string

  @Column({nullable: true})
  @Field({nullable: true})
  status: string

  @Column({nullable: true})
  @Field({nullable: true})
  stopDate: string

  @Column({nullable: true})
  @Field({nullable: true})
  stopReason: string

  @Column({nullable: true})
  @Field({nullable: true})
  note: string

  @Column({nullable: true})
  @Field({nullable: true})
  medicationId: string

  @Column({nullable: true})
  @Field({nullable: true})
  patientId: string

  @Column({nullable: true})
  @Field({nullable: true})
  patientProblemId: string

  @Column({nullable: true})
  @Field({nullable: true})
  appointmentId: string

  @ManyToOne(() => Medications, medication => medication.patientMedications)
  @Field(() => Medications, { nullable: true })
  medication: Medications;

  @ManyToOne(() => Patient, patient => patient.patientMedications)
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => PatientProblems, patientProblem => patientProblem.patientMedications)
  @Field(() => PatientProblems, { nullable: true })
  patientProblem: PatientProblems;

  @ManyToOne(() => Appointment, appointment => appointment.patientMedications, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
