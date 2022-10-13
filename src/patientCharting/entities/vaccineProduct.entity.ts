import { Field, ObjectType } from "@nestjs/graphql";
import { CPTCodes } from "src/feeSchedule/entities/cptCode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CVX } from "./cvx.entity";
import { MVX } from "./mvx.entity";
import { NdcVaccineProduct } from "./ndcVaccineProduct.entity";

@Entity({ name: 'VaccineProduct' })
@ObjectType()
export class VaccineProduct {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  updateDate: string

  //relationship columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxId: string;

  //relationships

  @ManyToOne(() => CVX, cvx => cvx.vaccineProduct, { onDelete: "CASCADE" })
  @Field(() => CVX, { nullable: true })
  cvx: CVX

  @ManyToOne(() => MVX, cvx => cvx.vaccineProduct, { onDelete: "CASCADE" })
  @Field(() => MVX, { nullable: true })
  mvx: MVX

  @OneToMany(() => NdcVaccineProduct, cvx => cvx.vaccineProduct, { onDelete: "CASCADE" })
  @Field(() => [NdcVaccineProduct], { nullable: true })
  ndcVaccine: NdcVaccineProduct[]

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
