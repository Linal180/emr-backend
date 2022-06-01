import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contact } from 'src/providers/entities/contact.entity';
import { Policy } from './policy.entity';

export enum InsurancePayerType {
  P = "Par",
  NP = "Non-Par"
}

registerEnumType(InsurancePayerType, {
  name: "InsurancePayerType",
  description: "The insurance payer type",
});

@Entity({ name: 'Insurances' })
@ObjectType()
export class Insurance {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  payerId: string

  @Column()
  @Field()
  payerName: string

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  enrollmentRequired: boolean

  @Column({
    type: "enum", enum: InsurancePayerType
  })
  @Field(type => InsurancePayerType)
  type: InsurancePayerType;

  @Column()
  @Field()
  lineOfBusiness: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  realTimeEligibility: boolean

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  realTimeClaimStatus: boolean

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  electronicRemittanceAdvice: boolean

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  secondaryCoordinationBenefits: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  Note: string

  @OneToMany(() => Contact, contact => contact.insurance, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Contact], { nullable: true })
  contacts: Contact[];

  @OneToMany(() => Policy, policy => policy.insurance, { onDelete: "CASCADE" })
  @Field(type => [Policy], { nullable: true })
  policies: Policy[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({ nullable: true })
  updatedAt: string;

}