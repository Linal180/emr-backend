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

  @Column({ nullable: true })
  @Field({ nullable: true })
  section: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortcut: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;

}