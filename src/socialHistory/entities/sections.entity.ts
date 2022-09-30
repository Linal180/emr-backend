import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Questions } from "./questions.entity";
import { SocialHistory } from "./socialHistory.entity";

@Entity({ name: 'Sections' })
@ObjectType()
export class Sections {
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
  socialHistoryId: string

  @ManyToOne(() => SocialHistory, socialHistory => socialHistory.sections, { onDelete: 'CASCADE' })
  @Field(() => SocialHistory, { nullable: true })
  socialHistory: SocialHistory;

  @OneToMany(() => Questions, question => question.sections, { onDelete: 'CASCADE' })
  @Field(() => [Questions], { nullable: true })
  questions: Questions[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}