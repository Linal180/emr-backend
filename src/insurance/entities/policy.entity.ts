import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Copay } from './copay.entity';
import { Insurance } from './insurance.entity';
import { PolicyHolder } from './policy-holder.entity';

export enum OrderOfBenefitType {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  TERTIARY = "Tertiary"
}

registerEnumType(OrderOfBenefitType, {
  name: "OrderOfBenefitType",
  description: "The order of benefit type",
});

export enum PolicyHolderRelationshipType {
  SELF = "Self",
  SPOUSE = "Spouse",
  CHILD = "Child",
  CHILD_MOTHER_INSURANCE = "Child (Mother's Insurance)",
  CHILD_FATHER_INSURANCE = "Child (Father's Insurance)",
  OTHER = "Other",
  GRANDPARENT = "Grandparent",
  GRANDCHILD = "Grandchild",
  NEPHEW_OR_NIECE = "Nephew or Niece",
  FOSTER_CHILD = "Foster Child",
  WARD = "Ward",
  STEPSON_OR_STEPDAUGTER = "Stepson or Stepdaughter",
  STEPSON_OR_STEPDAUGTER_STEPMOTHER_INSURANCE = "Stepson or Stepdaughter (Stepmother's Insurance)",
  STEPSON_OR_STEPDAUGTER_STEPFATHER_INSURANCE = "Stepson or Stepdaughter (Stepfather's Insurance)",
  EMPLOYEE = "Employee",
  UNKNOWN = "Unknown",
  HANDICAPPED_DEPENDENT = "Handicapped Dependent",
  SPONSORED_DEPENDENT = "Sponsored Dependent",
  DEPENDENT_OF_MINOR_DEPENDENT = "Dependent of a Minor Dependent",
  SIGNIFICANT_OTHER = "Significant Other",
  MOTHER = "Mother",
  FATHER = "Father",
  EMANCIPATED_MINOR = "Emancipated Minor",
  ORGAN_DONOR = "Organ Donor",
  CADAVER_DONOR = "Cadaver Donor",
  INJURED_PLAINTIFF = "Injured Plaintiff",
  CHILD_INS_NOT_FINANCIALLY_RESPONSE = "Child (Ins. not Financially Respons.)",
  CHILD_MOTHER_INS_NOT_FINANCIALLY_RESPONSE = "Child (Mother's Ins., Ins. not Financially Respons.)",
  CHILD_FATHER_INS_NOT_FINANCIALLY_RESPONSE = "Child (Father's Ins., Ins. not Financially Respons.)",
  LIFE_PARTNER = "Life Partner",
}

registerEnumType(PolicyHolderRelationshipType, {
  name: "PolicyHolderRelationshipType",
  description: "The Policy Holder Relationship Type",
});

export enum PricingProductType {
  AUTOMOBILE_MEDICAL = "Automobile Medical",
  BLUE_CROSS_BLUE_SHIELD = "Blue Cross/Blue Shield",
  CHAMPUS = "Champus",
  COMMERCIAL_INSURANCE_CO = "Commercial Insurance Co.",
  DENTAL_MAINTENANCE_ORGANIZATION = "Dental Maintenance Organization",
  DISABILITY = "Disability",
  EXCLUSIVE_PROVIDER_ORGANIZATION_EPO = "Exclusive Provider Organization (EPO)",
  FEDERAL_EMPLOYEES_PROGRAM = "Federal Employees Program",
  HEALTH_MAINTENANCE_ORGANIZATION = "Health Maintenance Organization",
  HEALTH_MAINTENANCE_ORGANIZATION_HMO_MEDICARE_RISK = "Health Maintenance Organization (HMO) Medicare Risk",
  INDEMNITY_INSURANCE = "Indemnity Insurance",
  LIABILITY_MEDICAL = "Liability Medical",
  MEDICAID = "Medicaid",
  MEDICARE_PART_A = "Medicare Part A",
  MEDICARE_PART_B = "Medicare Part B",
  MUTUALLY_DEFINED = "Mutually Defined",
  OTHER_FEDERAL_PROGRAM = "Other Federal Program",
  OTHER_NON_FEDERAL_PROGRAM = "Other Non-Federal Programs",
  POINT_OF_SERVICE_POS = "Point of Service (POS)",
  PREFERRED_PROVIDER_ORGANIZATION_PPO = "Preferred Provider Organization (PPO)",
  TITLE_V = "Title V",
  VETERANS_AFFAIRS_PLAN = "Veterans Affairs Plan",
  WORKERS_COMPENSATION_HEALTH_CLAIM = "Workers' Compensation Health Claim",
}

registerEnumType(PricingProductType, {
  name: "PricingProductType",
  description: "The Policy Holder Relationship Type",
});


@Entity({ name: 'policies' })
@ObjectType()
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string

  @Column({
    type: "enum", enum: OrderOfBenefitType, default: OrderOfBenefitType.PRIMARY
  })
  @Field(() => OrderOfBenefitType, { nullable: true })
  orderOfBenefit?: OrderOfBenefitType

  @Column({
    type: "enum", enum: PolicyHolderRelationshipType, default: PolicyHolderRelationshipType.SELF
  })
  @Field(() => PolicyHolderRelationshipType, { nullable: true })
  policyHolderRelationship?: PolicyHolderRelationshipType

  @Column({ nullable: true })
  @Field({ nullable: true })
  memberId?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  groupNumber?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  issueDate?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  expirationDate?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  coinsurancePercentage?: string

  @ManyToOne(() => Doctor, doctor => doctor.policyOfReferringProvider, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  referringProvider?: Doctor

  @ManyToOne(() => Doctor, doctor => doctor.policyOfPrimaryCareProvider, { onDelete: 'CASCADE' })
  @Field(() => Doctor, { nullable: true })
  primaryCareProvider?: Doctor

  @Column({
    type: "enum", enum: PricingProductType, default: PricingProductType.AUTOMOBILE_MEDICAL
  })
  @Field(() => PricingProductType, { nullable: true })
  pricingProductType?: PricingProductType

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes?: string

  @ManyToOne(() => Insurance, insurance => insurance.policies, { onDelete: 'CASCADE' })
  @Field(() => Insurance, { nullable: true })
  insurance?: Insurance;

  @ManyToOne(() => PolicyHolder, policyHolder => policyHolder.policies, { onDelete: 'CASCADE' })
  @Field(() => PolicyHolder, { nullable: true })
  policyHolder?: PolicyHolder;

  @ManyToOne(() => Patient, patient => patient.policies, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient?: Patient;

  @OneToMany(() => Copay, copay => copay.policy, { onDelete: "CASCADE" })
  @Field(() => [Copay], { nullable: true })
  copays?: Copay[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyHolderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  insuranceId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  referringProviderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  primaryCareProviderId: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}