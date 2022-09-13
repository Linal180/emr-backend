import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'TriageNotes' })
@ObjectType()
export class TriageNotes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string

  @ManyToOne(() => Patient, patient => patient.triageNotes, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, (appointment) => appointment.triageNote)
  @JoinColumn()
  appointment: Appointment;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
