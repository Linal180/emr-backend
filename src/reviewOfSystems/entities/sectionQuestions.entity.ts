import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionAnswers } from "./questionAnswers.entity";
import { TemplateSections } from "./templateSections.entity";

@Entity({ name: 'sectionQuestions' })
@ObjectType()
export class SectionQuestions {
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
  sectionId: string

  @ManyToOne(() => TemplateSections, sections => sections.questions, { onDelete: 'CASCADE' })
  @Field(() => TemplateSections, { nullable: true })
  section: TemplateSections;

  @OneToMany(() => QuestionAnswers, answers => answers.questions, { onDelete: 'CASCADE' })
  @Field(() => [QuestionAnswers], { nullable: true })
  answers: QuestionAnswers[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}