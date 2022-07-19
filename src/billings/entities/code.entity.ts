import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Billing } from './billing.entity';

export enum CodeType {
  ICD_10_CODE = "Icd10 Code",
  CPT_CODE = "Cpt Code",
  HCPCS_CODE = "Hcpcs Code",
  CUSTOM_CODE = "Custom Code"
}

registerEnumType(CodeType, {
  name: "CodeType",
  description: "The code type assigned with the code",
});

@Entity({ name: 'Codes' })
@ObjectType()
export class Code {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  price: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diagPointer: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  m1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  m2: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  m3: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  m4: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  unit: string;

  @Column({
    type: "enum",
    enum: CodeType,
    default: CodeType.CUSTOM_CODE
  })
  @Field(type => CodeType)
  codeType: CodeType;

  @ManyToOne(() => Billing, billing => billing.codes, { onDelete: 'CASCADE' })
  @Field(type => Billing, { nullable: true })
  billing: Billing;

  @Column({ nullable: true })
  @Field({ nullable: true })
  billingId: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
