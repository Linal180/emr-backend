import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientIllnessHistory } from "./patientIllnessHistory.entity";
import { QuestionAnswers } from "./questionAnswers.entity";
import { ReviewOfSystem } from "./reviewOfSystem.entity";


@Entity({ name: 'AnswerResponses' })
@ObjectType()
export class AnswerResponses {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  answerId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  value: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientIllnessHistoryId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  reviewOfSystemId: string

  @ManyToOne(() => QuestionAnswers, answer => answer.answers, { onDelete: 'CASCADE' })
  @Field(() => QuestionAnswers, { nullable: true })
  answer: QuestionAnswers;

  @ManyToOne(() => PatientIllnessHistory, patientIllnessHistory => patientIllnessHistory.answers, { onDelete: 'CASCADE' })
  @Field(() => PatientIllnessHistory, { nullable: true })
  patientIllnessHistory: PatientIllnessHistory;

  @ManyToOne(() => ReviewOfSystem, reviewOfSystem => reviewOfSystem.answers, { onDelete: 'CASCADE' })
  @Field(() => ReviewOfSystem, { nullable: true })
  reviewOfSystem: ReviewOfSystem;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}