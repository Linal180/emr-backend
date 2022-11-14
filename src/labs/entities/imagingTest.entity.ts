import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { ImagingOrder } from "./imagingOrder.entity";
import { ImagingOrderTest } from "./imagingOrderTest.entity";


@Entity({ name: 'ImagingTest' })
@ObjectType()
export class ImagingTest {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  active: boolean;

  // relationships

  @OneToMany(() => ImagingOrderTest, imagingOrderTest => imagingOrderTest.imagingTest)
  imagingOrderTest: ImagingOrderTest[];

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}