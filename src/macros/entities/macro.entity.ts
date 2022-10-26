import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities

@Entity({ name: 'Macros' })
@ObjectType()
export class Macros {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expansion: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  providers: string

  @Column({ nullable: true, type: 'text', array: true })
  @Field(() => [String], { nullable: true })
  section: string[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortcut: string

  @Column({ nullable: true, default: false, type: "boolean" })
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  systematic: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;

}