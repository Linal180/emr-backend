import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ICDCodes } from './icdcodes.entity';
import { SnoMedCodes } from './snowmedCodes.entity';

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
  @Field({nullable: true})
  problemStartDate: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  note: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  patientId: string;

  @ManyToOne(() => ICDCodes, iCDCodes => iCDCodes.patientProblems)
  @Field(type => ICDCodes, { nullable: true })
  ICDCode: ICDCodes;

  @ManyToOne(() => Patient, patient => patient.patientProblems, {onDelete: "CASCADE"})
  @Field(type => Patient,{nullable: true})
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

  @ManyToOne(() => SnoMedCodes, snowMedCodes => snowMedCodes.patientProblem, { eager: true, onDelete: 'CASCADE' })
  @Field(type => SnoMedCodes, { nullable: true })
  snowMedCode: SnoMedCodes; 

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
