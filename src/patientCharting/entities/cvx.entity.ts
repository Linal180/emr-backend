import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// entities
import { VaccineProduct } from "./vaccineProduct.entity";
import { CPTCodes } from "src/feeSchedule/entities/cptCode.entity";

@Entity({ name: 'CVX' })
@ObjectType()
export class CVX {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortDescription: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  updateDate: string

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isDeleted: boolean;

  // relation columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  cptCodeId: string

  //relationships

  @OneToMany(() => VaccineProduct, vaccineProduct => vaccineProduct.cvx)
  @Field(() => [VaccineProduct], { nullable: true })
  vaccineProduct: VaccineProduct[]

  @ManyToOne(() => CPTCodes, cvx => cvx.cvxCodes)
  @Field(() => CPTCodes, { nullable: true })
  cptCode: CPTCodes

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
