import { Field, Int, ObjectType } from "@nestjs/graphql";
import { VaccineProduct } from "src/patientCharting/entities/vaccineProduct.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CptFeeSchedule } from "./cptFeeSchedule.entity";

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

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  @Column({ nullable: true, default: 1, type: 'bigint' })
  @Field(() => Int, { nullable: true })
  priority: number;

  //relationships

  @OneToMany(() => CptFeeSchedule, cptFeeSchedule => cptFeeSchedule.cptCodes, { onDelete: 'CASCADE' })
  @Field(() => [CptFeeSchedule], { nullable: true })
  cptFeeSchedule: CptFeeSchedule[]

  @OneToMany(() => VaccineProduct, vaccineProduct => vaccineProduct.cptCode)
  @Field(() => [VaccineProduct], { nullable: true })
  vaccineProduct: VaccineProduct[]

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}