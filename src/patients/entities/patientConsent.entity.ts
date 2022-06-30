//packages imports
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Patient } from "./patient.entity";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { Agreement } from "src/agreements/entities/agreement.entity";

//table
@Entity({ name: 'PatientConsent' })
@ObjectType()
export class PatientConsent {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  body: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  attachmentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  //dates

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  //relationships

  @OneToOne(() => Patient, patient => patient.consent)
  @JoinColumn()
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @OneToOne(() => Appointment, appointment => appointment.patientConsent)
  @JoinColumn()
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;

  @OneToMany(() => Agreement, agreements => agreements.patientConsent)
  @Field(() => [Agreement], { nullable: true })
  agreements: Agreement[];

  //only fields

  @Field(() => Attachment, { nullable: true })
  signature: Attachment;

}