import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CPTCodes } from "./cptCode.entity";
import { Practice } from "src/practice/entities/practice.entity";

@Entity({ name: 'FeeSchedule' })
@ObjectType()
export class FeeSchedule {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  modifier: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cptCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  effectiveDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expireDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  longDescription: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  serviceFee: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  revenueCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  //relationships

  @ManyToOne(() => Practice, practice => practice.feeSchedules, { onDelete: 'CASCADE' })
  @Field(() => Practice, { nullable: true })
  practice: Practice;

  //fields
  
  @Field(() => CPTCodes, { nullable: true })
  CPTCodes: CPTCodes

}