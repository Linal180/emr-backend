import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { ICDCodes } from 'src/patientCharting/entities/icdcodes.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LoincCodes } from './loincCodes.entity';
import { Observations } from './observations.entity';
import { TestSpecimens } from './testSpecimens.entity';

export enum Status {
  ORDER_ENTERED = "Order Entered",
  DISCONTINUED = "Discontinued",
  IN_PROGRESS = "In Progress",
  RESULT_RECEIVED = "Results Received",
  RESULT_REVIEWED_WITH_PATIENT = "Results Reviewed with Patient"
}

registerEnumType(Status, {
  name: "Status",
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
    enum: Status,
    default: Status.ORDER_ENTERED
  })
  @Field(type => Status)
  status: Status

  @Column({nullable: true})
  @Field({nullable: true})
  testDate: string;

  @Column({nullable: true})
  @Field({nullable: true})
  testTime: string;

  @Column({nullable: true})
  @Field({nullable: true})
  testNotes: string;

  @ManyToOne(() => Patient, patient => patient.labTests, { onDelete: 'CASCADE' })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Appointment, appointment => appointment.labTests, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @Field(type => [ICDCodes], { nullable: 'itemsAndList' })
  @ManyToMany(type => ICDCodes, iCDCodes => iCDCodes.labTests, { eager: true })
  @JoinTable({ name: 'LabTestsDiagnoses' })
  diagnoses: ICDCodes[];  

  @ManyToOne(() => LoincCodes, loincCodes => loincCodes.labTests, { onDelete: 'CASCADE' })
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
