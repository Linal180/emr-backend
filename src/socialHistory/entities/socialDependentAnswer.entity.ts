import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialAnswer } from "./socialAnswer.entity";


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
  @Field({ nullable: true })
  socialAnswerId: string

  @ManyToOne(() => SocialAnswer, socialHistory => socialHistory.socialDependentAnswer, { onDelete: 'CASCADE' })
  @Field(() => SocialAnswer, { nullable: true })
  socialAnswer: SocialAnswer;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}