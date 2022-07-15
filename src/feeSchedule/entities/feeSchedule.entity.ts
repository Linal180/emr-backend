import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
  procedureCode: string;

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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}