import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Policy } from './policy.entity';

export enum CopayType {
  OFFICE_VISIT = "Office Visit",
  SPECIALTY_CARE = "Specialty Care",
  ALLERGY = "Allergy",
  DERMATOLOGY = "Dermatology",
  PT_OT_ST = "PT/OT/ST",
  MH_GROUP = "MH Group",
  MH_INDIVIDUAL = "MH Individual",
  ER_VISIT = "ER Visit",
  OB_GYN = "OB/GYN",
  URGENT_CARE = "Urgent Care",
  TELE_HEALTH = "Telehealth",
  AMBULATORY_SURGERY = "Ambulatory Surgery",
  AUDIOLOGIST = "Audiologist",
  BRAND_DRUG = "Brand Drug",
  CHIROPRACTIC_COPAYMENT = "Chiropractic Copayment",
  DME = "DME",
  DEDUCTIBLE = "Deductible",
  GENERIC_DRUG = "Generic Drug",
  GLOBAL = "Global",
  LAB = "Lab",
  NON_FORMULARY_DRUG = "Non-Formulary Drug",
  NURSE_VISIT = "Nurse visit",
  OFFICE_VISIT_FU = "Office Visit - F/U",
  OFFICE_VISIT_NEW = "Office Visit - New",
  OUT_OF_NETWORK = "Out of Network",
  PHYSICIANS_ASSISTANT = "Physician's Assistant",
  PODIATRY = "Podiatry",
  POST_OP = "Post Op",
  PREFERRED_DRUG = "Preferred Drug",
  PRENATAL_CARE = "Prenatal Care",
  PREVENTIVE_CARE = "Preventive Care",
  RETAIL_CONVENIENCE = "Retail/Convenience",
  ULTRASOUND = "Ultrasound",
  WELL_CHILD = "Well Child",
  XRAY_IMAGING = "Xray/Imaging",

}

registerEnumType(CopayType, {
  name: "CopayType",
  description: "The type of copay",
});

@Entity({ name: 'copays' })
@ObjectType()
export class Copay {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum", enum: CopayType, default: CopayType.OFFICE_VISIT
  })
  @Field(type => CopayType, { nullable: true })
  type?: CopayType

  @Column({ nullable: true })
  @Field({ nullable: true })
  amount?: string

  @ManyToOne(() => Policy, policy => policy.copays, { onDelete: 'CASCADE' })
  @Field(type => Policy, { nullable: true })
  policy?: Policy;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyId?: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}