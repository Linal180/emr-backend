import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { ImagingOrder } from "./imagingOrder.entity";


@Entity({ name: 'ImagingTest' })
@ObjectType()
export class ImagingTest {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  // relationship fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  imagingOrderId: string;

  // relationships

  @ManyToOne(() => ImagingOrder, image => image.imagingTests)
  @Field(() => ImagingOrder, { nullable: true })
  imagingOrder: ImagingOrder;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}