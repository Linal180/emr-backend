import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities enums
import { OrderOfBenefitType as OrderOfBenefit } from "src/insurance/entities/policy.entity";
import { OnsetDateType as OnsetDate, OtherDateType as OtherDate } from "./billing.entity";
import { ClaimChargeType } from "../dto/claim-payload";
import { ClaimStatus } from "./claim-status.entity";

registerEnumType(OrderOfBenefit, {
  name: "OrderOfBenefit",
  description: "The order of benefit type",
})

registerEnumType(OtherDate, {
  name: "OtherDate",
  description: "The patient billing status assigned",
});

registerEnumType(OnsetDate, {
  name: "OnsetDate",
  description: "The patient billing status assigned",
});

@Entity({ name: 'claim' })
@ObjectType()
export class Claim {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  //response columns

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  claimMdId: number

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  batchId: number

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  billNpi: number

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  billTaxId: number

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityDateOfService: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  fileName: string

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  fileId: number

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  insuranceNumber: number

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  receivePayerId: number

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  pcn: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  sendIcn: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  senderName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  senderId: string


  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  totalCharge: number;

  //polymorphic columns of claimStatus

  @Column({ nullable: true })
  @Field({ nullable: true })
  claimStatusId: string;

  //request columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  cond_date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  onset_date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  hosp_from_date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  hosp_thru_date: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  clia_number: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_addr_1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_addr_2: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_zip: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prov_name_l: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prov_name_f: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  prov_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  prov_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_name_l: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_name_f: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  place_of_service_1: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_addr_1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_addr_2: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_state: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_zip: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  chg_facility_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facility_clia: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_prov_name_l: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_prov_name_f: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_prov_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ord_prov_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_1: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_2: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_3: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_4: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_5: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_6: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_7: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_8: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_9: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_10: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_11: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  diag_12: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_addr_2: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_country: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_phone: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_marital: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_name_l: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_name_f: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_addr_1: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_addr_2: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_city: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_state: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_zip: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_group: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_dob: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_sex: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  employment_related: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  auto_accident: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  other_accident: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ref_name_l: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ref_name_f: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ref_name_m: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ref_id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ref_npi: string;

  @Column({ enum: OnsetDate, type: "enum", nullable: true })
  @Field(() => OnsetDate, { nullable: true })
  cond: OnsetDate

  @Column({ enum: OtherDate, type: "enum", nullable: true })
  @Field(() => OtherDate, { nullable: true })
  onset: OtherDate

  @Column({ enum: OrderOfBenefit, type: "enum", nullable: true })
  @Field(() => OrderOfBenefit, { nullable: true })
  payer_order: OrderOfBenefit

  @Column({ nullable: true })
  @Field({ nullable: true })
  claim_form: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payerid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payer_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_name_l: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_name_f: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_addr_1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_zip: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_dob: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_sex: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pat_rel: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ins_number: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  accept_assign: string;

  @Column({ nullable: true, type: "float" })
  @Field(() => Number, { nullable: true })
  total_charge: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_addr_1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_addr_2: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_zip: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_taxid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_taxid_type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bill_taxonomy: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  from_date_1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  thru_date: string;

  @Column({ array: false, type: "jsonb", nullable: true })
  @Field(() => [ClaimChargeType], { nullable: true })
  charge: ClaimChargeType[]

  //relationship 

  @OneToOne(() => ClaimStatus, claimStatus => claimStatus.claim)
  @JoinColumn()
  @Field(() => ClaimStatus, { nullable: true })
  claimStatus: ClaimStatus;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}