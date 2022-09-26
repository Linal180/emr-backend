import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MVX } from "./mvx.entity";
import { Vaccine } from "./vaccines.entity";

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
  @Field( { nullable: true })
  cvxCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  productStatus: string

  //relationships

  @OneToMany(() => MVX, mvx => mvx.cvx, { onDelete: 'CASCADE' })
  @Field(() => [MVX], { nullable: true })
  mvx: MVX[];
  
  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
