import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { MVX } from "./mvx.entity";

@Entity({ name: 'NDC' })
@ObjectType()
export class NDC {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ndcCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  gtin: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastUpdate: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxDescription: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ndcType: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  noUseNDC: string

  //relationship Fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxId: string;

  //relationships

  @ManyToOne(() => MVX, mvx => mvx.ndc, { onDelete: 'CASCADE' })
  @Field(() => MVX, { nullable: true })
  mvx: MVX

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
