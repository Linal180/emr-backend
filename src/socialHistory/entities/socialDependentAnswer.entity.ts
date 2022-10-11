import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { SocialAnswer } from "./socialAnswer.entity";
import { DependentQuestions } from "./dependentQuestions.entity";


@Entity({ name: 'SocialDependentAnswer' })
@ObjectType()
export class SocialDependentAnswer {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  parentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  value: string

  @Column({ nullable: true })
  socialAnswerId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  dependentQuestionId: string

  @ManyToOne(() => SocialAnswer, socialHistory => socialHistory.socialDependentAnswer, { onDelete: 'CASCADE' })
  socialAnswer: SocialAnswer;

  @Field(() => DependentQuestions, { nullable: true })
  dependentQuestion: DependentQuestions;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}