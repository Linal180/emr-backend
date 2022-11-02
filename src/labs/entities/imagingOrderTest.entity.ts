import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { ImagingTest } from "./imagingTest.entity";
import { ImagingOrder } from "./imagingOrder.entity";

@Entity({ name: 'ImagingOrderTest' })
@ObjectType()
export class ImagingOrderTest {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // relationship columns 

  @Column({ nullable: true })
  @Field({ nullable: true })
  imagingOrderId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imagingTestId: string;

  // relationships

  @ManyToOne(() => ImagingOrder, imagingOrder => imagingOrder.imagingOrderTest, { onDelete: "CASCADE" })
  imagingOrder: ImagingOrder;

  @ManyToOne(() => ImagingTest, imagingTest => imagingTest.imagingOrderTest)
  @Field(() => ImagingTest, { nullable: true })
  imagingTest: ImagingTest;

  // dates

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}