import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { ImagingOrderTest } from "./imagingOrderTest.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { PatientProblems } from "src/patientCharting/entities/patientProblems.entity";

export enum ImagingOrderStatus {
  ORDER_ENTERED = "Order Entered",
  DISCONTINUED = "Discontinued",
  IN_PROGRESS = "In Progress",
  RESULT_RECEIVED = "Results Received",
  RESULT_REVIEWED_WITH_PATIENT = "Results Reviewed with Patient"
}

registerEnumType(ImagingOrderStatus, {
  name: "ImagingOrderStatus",
  description: "The imaging order status assigned",
});


@Entity({ name: 'ImagingOrder' })
@ObjectType()
export class ImagingOrder {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: "enum", enum: ImagingOrderStatus, default: ImagingOrderStatus.ORDER_ENTERED, nullable: true })
  @Field(() => ImagingOrderStatus, { nullable: true })
  labTestStatus: ImagingOrderStatus

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientProblemId: string;

  //relationship

  @OneToMany(() => ImagingOrderTest, imagingOrderTest => imagingOrderTest.imagingOrder, { onDelete: "CASCADE" })
  @Field(() => [ImagingOrderTest], { nullable: true })
  imagingOrderTest: ImagingOrderTest[];

  @ManyToOne(() => Patient, image => image.imagingOrders)
  patient: Patient;

  @ManyToOne(() => Appointment, image => image.imagingOrders)
  appointment: Appointment;

  @ManyToOne(() => PatientProblems, image => image.imagingOrders)
  patientProblem: PatientProblems;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}