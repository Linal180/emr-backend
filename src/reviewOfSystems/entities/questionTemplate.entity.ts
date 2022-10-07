import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}