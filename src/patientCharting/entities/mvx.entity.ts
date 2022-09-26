import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { CVX } from "./cvx.entity";
import { NDC } from "./ndc.entity";

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
  mvxStatus: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxCode: string

  //relationship Fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  cvxId: string;

  //relationship

  @OneToMany(() => NDC, mvx => mvx.mvx, { onDelete: 'CASCADE' })
  @Field(() => [NDC], { nullable: true })
  ndc: NDC[];

  @ManyToOne(() => CVX, cvx => cvx.mvx, { onDelete: 'CASCADE' })
  @Field(() => CVX, { nullable: true })
  cvx: CVX

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}