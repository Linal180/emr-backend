import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Policy } from './policy.entity';

export enum POLICY_HOLDER_GENDER_IDENTITY {
  MALE = "Identifies as Male",
  FEMALE = "Identifies as Female",
  TRANSGENDER_MALE = "Transgender Male/Female-to-Male (FTM)",
  TRANSGENDER_FEMALE = "Transgender Female/Male-to-Female (MTF)",
  DECLINE_TO_SPECIFY = "Decline to specify",
  NONE = "Choose not to disclose"
}

registerEnumType(POLICY_HOLDER_GENDER_IDENTITY, {
  name: "POLICY_HOLDER_GENDER_IDENTITY",
  description: "The Policy Holder gender Type",
});

@Entity({ name: 'policyHolder' })
@ObjectType()
export class PolicyHolder {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  certificationNumber?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  employer?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  suffix?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  zipCode?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  addressCTD?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  state?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ssn?: string

  @Column({
    type: "enum",
    enum: POLICY_HOLDER_GENDER_IDENTITY,
    default: POLICY_HOLDER_GENDER_IDENTITY.NONE
  })
  @Field(type => POLICY_HOLDER_GENDER_IDENTITY, { nullable: true })
  sex: POLICY_HOLDER_GENDER_IDENTITY

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob?: string

  @OneToMany(() => Policy, policy => policy.policyHolder, { onDelete: "CASCADE" })
  @Field(type => [Policy], { nullable: true })
  policies?: Policy[];

  @OneToMany(() => Patient, patient => patient.policyHolder, { onDelete: "CASCADE" })
  @Field(type => [Patient], { nullable: true })
  patients?: Patient[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}