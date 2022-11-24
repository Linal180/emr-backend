import { Field, ObjectType } from "@nestjs/graphql";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exercises } from "./physicalTherapyExercise.entity";
import { TemplateSections } from "./templateSections.entity";
//entities

@Entity({ name: 'QuestionTemplate' })
@ObjectType()
export class QuestionTemplate {
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
  templateType: string

  @OneToMany(() => TemplateSections, sections => sections.template, { onDelete: 'CASCADE' })
  @Field(() => [TemplateSections], { nullable: true })
  sections: TemplateSections[];

  @OneToMany(() => Exercises, exercise => exercise.template, { onDelete: 'CASCADE' })
  @Field(() => [Exercises], { nullable: true })
  exercise: Exercises[];

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}