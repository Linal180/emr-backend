import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  //relationships

  // @OneToMany(() => NdcVaccineProduct, cvx => cvx.vaccineProduct, {onDelete: "CASCADE"})
  // @Field(() => [NdcVaccineProduct], { nullable: true })
  // ndcVaccine: NdcVaccineProduct[]

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
