import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VaccineProduct } from "./vaccineProduct.entity";

@Entity({ name: 'MVX' })
@ObjectType()
export class MVX {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  manufacturerName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  mvxStatus: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  updateDate: string

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  //relationships

  @OneToMany(() => VaccineProduct, vaccineProduct => vaccineProduct.mvx, { onDelete: "CASCADE" })
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