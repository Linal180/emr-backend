import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//user imports
import { ICDCodes } from './icdcodes.entity';
import { SnoMedCodes } from './snowMedCodes.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PatientMedication } from './patientMedication.entity';

export enum ProblemType {
  ACTIVE = "active",
  HISTORIC = "historic"
}

registerEnumType(ProblemType, {
  name: "ProblemType",
  description: "The patient's problem type assigned",
});

export enum ProblemSeverity {
  CHRONIC = "chronic",
  ACUTE = "acute"
}

registerEnumType(ProblemSeverity, {
  name: "ProblemSeverity",
  description: "The patient's problem severity type assigned",
});

@Entity({ name: 'PatientProblems' })
@ObjectType()
export class PatientProblems {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: ProblemType,
    default: ProblemType.ACTIVE
  })
  @Field(type => ProblemType)
  problemType: ProblemType

  @Column({
    type: "enum",
    enum: ProblemSeverity,
    default: ProblemSeverity.CHRONIC
  })
  @Field(type => ProblemSeverity)
  problemSeverity: ProblemSeverity

  @Column({ nullable: true })
  @Field({ nullable: true })
  problemStartDate: string;

  @Column("text", { nullable: true })
  @Field({ nullable: true })
  note: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSigned: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  forOrders: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  @ManyToOne(() => ICDCodes, iCDCodes => iCDCodes.patientProblems, { eager: true })
  @Field(type => ICDCodes, { nullable: true })
  ICDCode: ICDCodes;

  @ManyToOne(() => Patient, patient => patient.patientProblems, { onDelete: "CASCADE" })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.patientProblem, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Staff, staff => staff.patientProblem, { onDelete: 'CASCADE' })
  @Field(type => Staff, { nullable: true })
  staff: Staff;

  @ManyToOne(() => Appointment, appointment => appointment.patientProblem, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @ManyToOne(() => SnoMedCodes, snowMedCodes => snowMedCodes.patientProblem, { onDelete: 'CASCADE', eager: true })
  @Field(type => SnoMedCodes, { nullable: true })
  snowMedCode: SnoMedCodes;

  @OneToMany(() => PatientMedication, patientMedication => patientMedication.patient)
  @Field(() => [PatientMedication], { nullable: true })
  patientMedications: PatientMedication[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
