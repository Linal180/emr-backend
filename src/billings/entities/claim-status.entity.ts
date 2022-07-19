import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Billing } from './billing.entity';


@Entity({ name: 'claimStatus' })
@ObjectType()
export class ClaimStatus {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  statusName?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  statusId?: string

  @OneToMany(() => Billing, billing => billing.claimStatus, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Billing], { nullable: true })
  billings: Billing[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
