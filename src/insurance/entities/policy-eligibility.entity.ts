import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PolicyCoverage } from './policy-coverage.entity';
import { Policy } from './policy.entity';

@Entity({ name: 'policyEligibility' })
@ObjectType()
export class PolicyEligibility {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  eligibilityResultDate?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerName?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerId?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  eligibilityResultTime?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  eligibilityId?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  groupNumber?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insAddress1?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insCity?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insDob?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insFirstName?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insLastName?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insSex?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insState?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insZip?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  planBeginDate?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  planNumber?: string

  @ManyToOne(() => Policy, policy => policy.policyEligibilities, { onDelete: 'CASCADE' })
  @Field(type => Policy, { nullable: true })
  policy?: Policy;

  @OneToMany(() => PolicyCoverage, policyCoverage => policyCoverage.policyEligibility, { onDelete: "CASCADE" })
  @Field(() => [PolicyCoverage], { nullable: true })
  policyCoverages: PolicyCoverage[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyId?: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;
}