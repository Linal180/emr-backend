import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { LoincCodes } from './loincCodes.entity';
import { Observations } from './observations.entity';
import { TestSpecimens } from './testSpecimens.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { ICDCodes } from 'src/patientCharting/entities/icdcodes.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';

export enum LabTestStatus {
  ORDER_ENTERED = "Order Entered",
  DISCONTINUED = "Discontinued",
  IN_PROGRESS = "In Progress",
  RESULT_RECEIVED = "Results Received",
  RESULT_REVIEWED_WITH_PATIENT = "Results Reviewed with Patient"
}

registerEnumType(LabTestStatus, {
  name: "LabTestStatus",
  description: "The lab's test status assigned",
});


@Entity({ name: 'LabTests' })
@ObjectType()
export class LabTests {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: LabTestStatus,
    default: LabTestStatus.ORDER_ENTERED
  })
  @Field(type => LabTestStatus)
  labTestStatus: LabTestStatus

  @Column({ nullable: true })
  @Field({ nullable: true })
  orderNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  collectedDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  receivedDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  accessionNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  labName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  vendorName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  testDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  testTime: string;

  @Column("text", { nullable: true })
  @Field({ nullable: true })
  testNotes: string;

  @Column("text", { nullable: true })
  @Field({ nullable: true })
  providerNotes: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  primaryProviderId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  referringProviderId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSigned: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  testId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientProblemId: string;

  @ManyToOne(() => Patient, patient => patient.labTests, { onDelete: 'CASCADE', })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => PatientProblems, patientProblem => patientProblem.labTests, { onDelete: 'CASCADE', })
  @Field(type => PatientProblems, { nullable: true })
  patientProblem: PatientProblems;

  @ManyToOne(() => Doctor, doctor => doctor.labTests, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Doctor, doctor => doctor.labTests, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  primaryProvider: Doctor;

  @ManyToOne(() => Doctor, doctor => doctor.labTests, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  referringProvider: Doctor;

  @ManyToOne(() => Appointment, appointment => appointment.labTests, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @Field(type => [ICDCodes], { nullable: 'itemsAndList' })
  @ManyToMany(type => ICDCodes, iCDCodes => iCDCodes.labTests, { eager: true })
  @JoinTable({ name: 'LabTestsDiagnoses' })
  diagnoses: ICDCodes[];

  @ManyToOne(() => LoincCodes, loincCodes => loincCodes.labTests, { onDelete: 'CASCADE', })
  @Field(type => LoincCodes, { nullable: true })
  test: LoincCodes;

  @OneToMany(() => TestSpecimens, testSpecimens => testSpecimens.labTest, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [TestSpecimens], { nullable: true })
  testSpecimens: TestSpecimens[];

  @OneToMany(() => Observations, observations => observations.labTest, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Observations], { nullable: true })
  testObservations: Observations[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
