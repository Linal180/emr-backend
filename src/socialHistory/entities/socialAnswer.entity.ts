import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Questions } from "./questions.entity";
import { SocialDependentAnswer } from "./socialDependentAnswer.entity";
import { SocialHistory } from "./socialHistory.entity";


@Entity({ name: 'SocialAnswer' })
@ObjectType()
export class SocialAnswer {
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
  value: string

  @Column({ nullable: true })
  socialHistoryId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  questionId: string

  @ManyToOne(() => SocialHistory, socialHistory => socialHistory.socialAnswer, { onDelete: 'CASCADE' })
  socialHistory: SocialHistory;

  @OneToOne(() => Questions, question => question.socialAnswer, { onDelete: 'CASCADE' })
  @Field(() => Questions, { nullable: true })
  @JoinColumn()
  question: Questions;

  @OneToMany(() => SocialDependentAnswer, socialDependentAnswer => socialDependentAnswer.socialAnswer, { onDelete: 'CASCADE' })
  @Field(() => [SocialDependentAnswer], { nullable: true })
  socialDependentAnswer: SocialDependentAnswer[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}