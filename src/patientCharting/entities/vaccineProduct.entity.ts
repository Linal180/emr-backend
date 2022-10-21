import { Field, ObjectType } from "@nestjs/graphql";
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
  
  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  //relationships

  @ManyToOne(() => CVX, cvx => cvx.vaccineProduct)
  @Field(() => CVX, { nullable: true })
  cvx: CVX

  @ManyToOne(() => MVX, cvx => cvx.vaccineProduct)
  @Field(() => MVX, { nullable: true })
  mvx: MVX

  @OneToMany(() => NdcVaccineProduct, cvx => cvx.vaccineProduct)
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
