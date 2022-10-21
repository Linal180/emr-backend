

import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NDC } from "./ndc.entity";
import { VaccineProduct } from "./vaccineProduct.entity";

@Entity({ name: 'NdcVaccineProduct' })
@ObjectType()
export class NdcVaccineProduct {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  //relation's columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  vaccineProductId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ndcCodeId: string;

  //relationship 

  @ManyToOne(() => VaccineProduct, vaccineProduct => vaccineProduct.ndcVaccine)
  @Field(() => VaccineProduct, { nullable: true })
  vaccineProduct: VaccineProduct;

  @ManyToOne(() => NDC, ndcCode => ndcCode.ndcVaccine)
  @Field(() => NDC, { nullable: true })
  ndcCode: NDC;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
