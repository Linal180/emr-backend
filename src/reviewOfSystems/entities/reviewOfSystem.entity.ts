import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Patient } from "src/patients/entities/patient.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { AnswerResponses } from "./answerResponses.entity";
import { QuestionTemplate } from "./questionTemplate.entity";

@Entity({ name: 'ReviewOfSystem' })
@ObjectType()
export class ReviewOfSystem {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string


  @Column({ nullable: true, array: false, type: 'jsonb' })
  @Field(() => [String], { nullable: true })
  templateIds: string[]

  @Field(() => [QuestionTemplate], { nullable: true })
  templates: QuestionTemplate[]

  @ManyToOne(() => Patient, patient => patient.reviewOfSystems, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @Column({ nullable: true })
  @Field({ nullable: true })
  appointmentId: string

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, (appointment) => appointment.reviewOfSystem)
  @JoinColumn()
  appointment: Appointment;

  @OneToMany(() => AnswerResponses, answers => answers.reviewOfSystem, { onDelete: 'CASCADE' })
  @Field(() => [AnswerResponses], { nullable: true })
  answers: AnswerResponses[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}