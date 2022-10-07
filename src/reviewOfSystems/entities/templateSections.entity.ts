import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionTemplate } from "./questionTemplate.entity";
import { SectionQuestions } from "./sectionQuestions.entity";
//entities

@Entity({ name: 'TemplateSections' })
@ObjectType()
export class TemplateSections {
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
  templateId: string

  @OneToMany(() => SectionQuestions, question => question.section, { onDelete: 'CASCADE' })
  @Field(() => [SectionQuestions], { nullable: true })
  questions: SectionQuestions[];

  @ManyToOne(() => QuestionTemplate, template => template.sections, { onDelete: 'CASCADE' })
  @Field(() => QuestionTemplate, { nullable: true })
  template: QuestionTemplate;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}