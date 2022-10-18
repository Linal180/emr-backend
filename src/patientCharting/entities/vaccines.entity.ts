import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { MVX } from "./mvx.entity";
import { NDC } from "./ndc.entity";
import { VaccineProduct } from "./vaccineProduct.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Entity({ name: 'Vaccine' })
@ObjectType()
export class Vaccine {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  administrationDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  administerBy: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  units: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  route: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  site: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lotNo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expiryDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  visGiven: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  visDate: string;

  // relationship fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  vaccineProductId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ndcId: string;


  //fields

  @Field(() => VaccineProduct, { nullable: true })
  vaccineProduct: VaccineProduct

  @Field(() => MVX, { nullable: true })
  mvx: MVX

  @Field(() => NDC, { nullable: true })
  ndc: NDC

  //relationship columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  //relationship

  @ManyToOne(() => Patient, patient => patient.vaccines)
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Appointment, appointment => appointment.vaccines)
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}