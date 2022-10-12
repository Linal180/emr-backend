import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VaccineProduct } from "./vaccineProduct.entity";

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

  //relationships

  @OneToMany(() => VaccineProduct, vaccineProduct => vaccineProduct.cvx, { onDelete: "CASCADE" })
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
