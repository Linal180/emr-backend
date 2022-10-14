import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { NdcVaccineProduct } from "./ndcVaccineProduct.entity";

@Entity({ name: 'NDC' })
@ObjectType()
export class NDC {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  // relationships

  @OneToMany(() => NdcVaccineProduct, cvx => cvx.ndcCode, { onDelete: "CASCADE" })
  ndcVaccine: NdcVaccineProduct[]

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
