import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Questions } from "./questions.entity";
//payload
import { SelectorType } from "../payloads/questions.payload";

@Entity({ name: 'DependentQuestions' })
@ObjectType()
export class DependentQuestions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  value: string

  @Column({ nullable: true, array: false, type: 'jsonb' })
  @Field(() => [String], { nullable: true })
  answer: string[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionType: string

  @Column({ nullable: true, array: false, type: 'jsonb' })
  @Field(() => [SelectorType], { nullable: true })
  options: SelectorType[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  parentId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionsId: string

  @ManyToOne(() => Questions, question => question.dependentQuestions, { onDelete: 'CASCADE' })
  @Field(() => Questions, { nullable: true })
  questions: Questions;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}