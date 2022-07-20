import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CptFeeSchedule } from "./cptFeeSchedule.entity";
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
  effectiveDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expiryDate: string;

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
  @OneToMany(() => CptFeeSchedule, cptFeeSchedule => cptFeeSchedule.feeSchedule, { onDelete: 'CASCADE' })
  @Field(() => [CptFeeSchedule], { nullable: true })
  cptFeeSchedule: CptFeeSchedule[]

}