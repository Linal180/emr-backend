import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Billing } from './billing.entity';
import { Claim } from './claim.entity';

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
  statusId?: string;

  @Column({ type: "boolean", default: false })
  @Field(() => Boolean)
  system: boolean

  @OneToMany(() => Billing, billing => billing.claimStatus, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Billing], { nullable: true })
  billings: Billing[];

  @OneToOne(() => Claim, claim => claim.claimStatus)
  @Field(() => Claim, { nullable: true })
  claim: Claim;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
