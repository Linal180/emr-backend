import { Field, ObjectType } from "@nestjs/graphql";
import { SelectorType } from "src/socialHistory/payloads/questions.payload";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { AnswerResponses } from "./answerResponses.entity";
import { SectionQuestions } from "./sectionQuestions.entity";


@Entity({ name: 'QuestionAnswers' })
@ObjectType()
export class QuestionAnswers {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  specialId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  answerType: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionType: string

  @Column({ nullable: true, array: false, type: 'jsonb' })
  @Field(() => [SelectorType], { nullable: true })
  options: SelectorType[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionsId: string;

  @ManyToOne(() => SectionQuestions, questions => questions.answers, { onDelete: 'CASCADE' })
  @Field(() => SectionQuestions, { nullable: true })
  questions: SectionQuestions;

  @OneToMany(() => AnswerResponses, answers => answers.answer, { onDelete: 'CASCADE' })
  @Field(() => [AnswerResponses], { nullable: true })
  answers: AnswerResponses[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}