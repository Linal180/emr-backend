import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CPTCodes } from "./cptCode.entity";
import { FeeSchedule } from "./feeSchedule.entity";

@Entity({ name: 'CptFeeSchedule' })
@ObjectType()
export class CptFeeSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  modifier: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

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
  feeScheduleId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cptCodesId: string;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  //relationship

  @ManyToOne(() => FeeSchedule, feeSchedule => feeSchedule.cptFeeSchedule, { onDelete: 'CASCADE' })
  @Field(() => FeeSchedule, { nullable: true })
  feeSchedule: FeeSchedule

  @ManyToOne(() => CPTCodes, cptCodes => cptCodes.cptFeeSchedule)
  @Field(() => CPTCodes, { nullable: true })
  cptCodes: CPTCodes

}