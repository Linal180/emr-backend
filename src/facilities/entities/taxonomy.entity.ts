import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'taxonomies' })
@ObjectType()
export class Taxonomy {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  code: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  classification: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  specialization: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  definition: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  section: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
