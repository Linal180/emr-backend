import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { FeeSchedule } from "./feeSchedule.entity";

@Entity({ name: 'CPTCodes' })
@ObjectType()
export class CPTCodes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  longDescription: string;

  //relationships

  @Field(() => [FeeSchedule], { nullable: true })
  feeSchedules: FeeSchedule[]

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}