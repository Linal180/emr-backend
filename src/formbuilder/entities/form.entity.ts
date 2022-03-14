import { Field, ObjectType } from '@nestjs/graphql';
import { Json } from 'aws-sdk/clients/robomaker';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'Forms' })
@ObjectType()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  layout: Json;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  isSystemForm: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
