import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PolicyEligibility } from './policy-eligibility.entity';

@Entity({ name: 'policyCoverage' })
@ObjectType()
export class PolicyCoverage {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  benefitCode?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitCoverageCode?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitCoverageDescription?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitDescription?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitNotes?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  dateOfLastUpdated?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitLevelCode?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitLevelCodeDescription?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitPeriodCode?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitPeriodCodeDescription?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  inPlanNetwork?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitAmount?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insuranceTypeCode?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  insuranceTypeCodeDescription?: string

  @Column({ nullable:true })
  @Field({ nullable: true })
  benefitPercent?: string

  @ManyToOne(() => PolicyEligibility, PolicyEligibility => PolicyEligibility.policyCoverages, { onDelete: 'CASCADE' })
  @Field(() => PolicyEligibility, { nullable: true })
  policyEligibility?: PolicyEligibility;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyEligibilityId?: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;
}