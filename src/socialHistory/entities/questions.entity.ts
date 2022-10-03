import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Sections } from "./sections.entity";
import { DependentQuestions } from "./dependentQuestions.entity";
//payloads
import { SelectorType } from "../payloads/questions.payload";

@Entity({ name: 'Questions' })
@ObjectType()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  specialId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  answer: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  value: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionType: string

  @Column({ nullable: true, array: false, type: 'jsonb' })
  @Field(() => [SelectorType], { nullable: true })
  options: SelectorType[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  sectionsId: string

  @OneToMany(() => DependentQuestions, dependentQuestion => dependentQuestion.questions, { onDelete: 'CASCADE' })
  @Field(() => [DependentQuestions], { nullable: true })
  dependentQuestions: DependentQuestions[];

  @ManyToOne(() => Sections, sections => sections.questions, { onDelete: 'CASCADE' })
  @Field(() => Sections, { nullable: true })
  sections: Sections;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}