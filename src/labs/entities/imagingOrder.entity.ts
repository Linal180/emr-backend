import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { LabTestStatus } from "./labTests.entity";
import { ImagingTest } from "./imagingTest.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Entity({ name: 'ImagingOrder' })
@ObjectType()
export class ImagingOrder {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: "enum", enum: LabTestStatus, default: LabTestStatus.ORDER_ENTERED })
  @Field(() => LabTestStatus)
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

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSigned: boolean;

  // relationship fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  //relationship

  @OneToMany(() => ImagingTest, imagingTest => imagingTest.imagingOrder)
  @Field(() => [ImagingTest], { nullable: true })
  imagingTests: ImagingTest[];

  @ManyToOne(() => Patient, image => image.imagingOrders)
  patient: Patient;

  @ManyToOne(() => Appointment, image => image.imagingOrders)
  appointment: Appointment;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}