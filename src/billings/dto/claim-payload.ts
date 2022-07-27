import { Field, Int, ObjectType } from "@nestjs/graphql";
import { OrderOfBenefitType } from "src/insurance/entities/policy.entity";
import { ResponsePayload } from "src/users/dto/response-payload.dto";
import { OnsetDateType } from "../entities/billing.entity";

@ObjectType()
export class Charge {
  @Field({ nullable: true })
  proc_code: string;

  @Field({ nullable: true })
  diagPointer: string;

  @Field(() => Int, { nullable: true })
  charge: number;

  @Field({ nullable: true })
  units: string;
}

@ObjectType()
export class Claim {
  @Field({ nullable: true })
  claim_form?: string

  @Field({ nullable: true })
  payerid?: string

  @Field({ nullable: true })
  payer_name?: string

  @Field({ nullable: true })
  pcn?: string

  @Field({ nullable: true })
  pat_name_l?: string

  @Field({ nullable: true })
  pat_name_f?: string

  @Field({ nullable: true })
  pat_addr_1?: string

  @Field({ nullable: true })
  pat_city?: string

  @Field({ nullable: true })
  pat_state?: string

  @Field({ nullable: true })
  pat_zip?: string

  @Field({ nullable: true })
  pat_dob?: string

  @Field({ nullable: true })
  pat_sex?: string

  @Field({ nullable: true })
  pat_rel?: string

  @Field({ nullable: true })
  ins_number?: string

  @Field({ nullable: true })
  accept_assign?: string

  @Field(() => Int, { nullable: true })
  total_charge?: number

  @Field({ nullable: true })
  bill_name?: string

  @Field({ nullable: true })
  bill_addr_1?: string

  @Field({ nullable: true })
  bill_addr_2?: string

  @Field({ nullable: true })
  bill_city?: string

  @Field({ nullable: true })
  bill_state?: string

  @Field({ nullable: true })
  bill_zip?: string

  @Field({ nullable: true })
  bill_phone?: string

  @Field({ nullable: true })
  bill_taxid?: string

  @Field({ nullable: true })
  bill_taxid_type?: string

  @Field({ nullable: true })
  from_date?: string

  @Field({ nullable: true })
  diag_1?: string

  @Field({ nullable: true })
  diag_2?: string

  @Field({ nullable: true })
  diag_3?: string

  @Field({ nullable: true })
  diag_4?: string

  @Field({ nullable: true })
  diag_5?: string

  @Field({ nullable: true })
  diag_6?: string

  @Field({ nullable: true })
  diag_7?: string

  @Field({ nullable: true })
  diag_8?: string

  @Field({ nullable: true })
  diag_9?: string

  @Field({ nullable: true })
  diag_10?: string

  @Field({ nullable: true })
  diag_11?: string

  @Field({ nullable: true })
  diag_12?: string

  @Field(() => [Charge], { nullable: true })
  charge?: Charge[]
}

@ObjectType()
export class ClaimPayload {
  @Field(type => Claim)
  claim: Claim;

  @Field({ nullable: true })
  response?: ResponsePayload
}

@ObjectType()
export class ClaimFilePayload {
  @Field(() => [Int], { nullable: true })
  claimFile?: number[]

  @Field({ nullable: true })
  response?: ResponsePayload
}

@ObjectType()
export class ClaimNumberPayload {
  @Field({ nullable: true })
  claimNumber?: string

  @Field({ nullable: true })
  response?: ResponsePayload
}

@ObjectType()
export class ChargeItem {

  @Field(() => String, { nullable: true })
  m1: string;

  @Field(() => String, { nullable: true })
  m2: string;

  @Field(() => String, { nullable: true })
  m3: string;

  @Field(() => String, { nullable: true })
  m4: string;

  @Field(() => String, { nullable: false })
  unit: string;

  @Field(() => String, { nullable: false })
  units: string;

  @Field(() => Number, { nullable: false })
  charge: number;

  @Field(() => String, { nullable: false })
  diag_ref: string;

  @Field(() => String, { nullable: false })
  proc_code: string;

  @Field(() => String, { nullable: false })
  diagPointer: string
}

@ObjectType()
export class ClaimMdPayload {
  @Field(() => String, { nullable: false })
  claim_form: string;

  @Field(() => String, { nullable: false })
  payerid: string;

  @Field(() => String, { nullable: false })
  payer_name: string;

  @Field(() => String, { nullable: false })
  pcn: string

  @Field(() => String, { nullable: false })
  pat_name_l: string

  @Field(() => String, { nullable: false })
  pat_name_f: string

  @Field(() => String, { nullable: false })
  pat_addr_1: string

  @Field(() => String, { nullable: false })
  pat_city: string

  @Field(() => String, { nullable: false })
  pat_state: string

  @Field(() => String, { nullable: false })
  pat_zip: string

  @Field(() => String, { nullable: false })
  pat_dob: string;

  @Field(() => String, { nullable: false })
  pat_sex: string

  @Field(() => String, { nullable: false })
  pat_rel: string;

  @Field(() => String, { nullable: false })
  ins_number: string

  @Field(() => String, { nullable: false })
  accept_assign: string

  @Field(() => Number, { nullable: false })
  total_charge: number

  @Field(() => String, { nullable: false })
  bill_name: string

  @Field(() => String, { nullable: false })
  bill_addr_1: string

  @Field(() => String, { nullable: true })
  bill_addr_2: string

  @Field(() => String, { nullable: false })
  bill_city: string

  @Field(() => String, { nullable: false })
  bill_state: string

  @Field(() => String, { nullable: false })
  bill_zip: string

  @Field(() => String, { nullable: false })
  bill_npi: string

  @Field(() => String, { nullable: false })
  bill_phone: string

  @Field(() => String, { nullable: false })
  bill_taxid: string

  @Field(() => String, { nullable: false })
  bill_taxid_type: string

  @Field(() => String, { nullable: false })
  bill_taxonomy: string

  @Field(() => String, { nullable: false })
  from_date_1: string

  @Field(() => String, { nullable: false })
  thru_date: string

  @Field(() => [ChargeItem], { nullable: false })
  charge: ChargeItem[]

  @Field(() => OrderOfBenefitType, { nullable: false })
  payer_order: string

  @Field(() => String, { nullable: true })
  pat_name_m: string

  @Field(() => String, { nullable: false })
  pat_addr_2: string

  @Field(() => String, { nullable: false })
  pat_country: string

  @Field(() => String, { nullable: false })
  pat_phone: string

  @Field(() => String, { nullable: false })
  pat_marital: string

  @Field(() => String, { nullable: false })
  ins_name_l: string

  @Field(() => String, { nullable: false })
  ins_name_f: string

  @Field(() => String, { nullable: false })
  ins_name_m: string

  @Field(() => String, { nullable: false })
  ins_addr_1: string

  @Field(() => String, { nullable: true })
  ins_addr_2: string

  @Field(() => String, { nullable: false })
  ins_city: string

  @Field(() => String, { nullable: false })
  ins_state: string

  @Field(() => String, { nullable: false })
  ins_zip: string

  @Field(() => String, { nullable: false })
  ins_group: string

  @Field(() => String, { nullable: false })
  ins_dob: string

  @Field(() => String, { nullable: false })
  ins_sex: string

  @Field(() => String, { nullable: false })
  employment_related: string

  @Field(() => String, { nullable: false })
  auto_accident: string

  @Field(() => String, { nullable: false })
  other_accident: string

  @Field(() => String, { nullable: false })
  ref_name_l: string

  @Field(() => String, { nullable: false })
  ref_name_f: string

  @Field(() => String, { nullable: true })
  ref_name_m: string

  @Field(() => String, { nullable: false })
  ref_id: string

  @Field(() => String, { nullable: false })
  ref_npi: string

  @Field(() => OnsetDateType, { nullable: false })
  cond: OnsetDateType

  @Field(() => OnsetDateType, { nullable: false })
  onset: OnsetDateType

  @Field(() => String, { nullable: false })
  cond_date: string

  @Field(() => String, { nullable: false })
  onset_date: string

  @Field(() => String, { nullable: false })
  hosp_from_date: string

  @Field(() => String, { nullable: false })
  hosp_thru_date: string

  @Field(() => String, { nullable: false })
  clia_number: string

  @Field(() => String, { nullable: false })
  facility_name: string

  @Field(() => String, { nullable: false })
  facility_addr_1: string

  @Field(() => String, { nullable: true })
  facility_addr_2: string

  @Field(() => String, { nullable: false })
  facility_city: string

  @Field(() => String, { nullable: false })
  facility_state: string

  @Field(() => String, { nullable: false })
  facility_zip: string

  @Field(() => String, { nullable: false })
  facility_npi: string

  @Field(() => String, { nullable: false })
  facility_id: string

  @Field(() => String, { nullable: false })
  prov_name_l: string

  @Field(() => String, { nullable: false })
  prov_name_f: string

  @Field(() => String, { nullable: true })
  prov_name_m: string

  @Field(() => String, { nullable: false })
  prov_npi: string

  @Field(() => String, { nullable: false })
  ord_name_l: string

  @Field(() => String, { nullable: false })
  ord_name_f: string

  @Field(() => String, { nullable: true })
  ord_name_m: string

  @Field(() => String, { nullable: false })
  ord_npi: string

  @Field(() => String, { nullable: false })
  place_of_service_1: string

  @Field(() => String, { nullable: false })
  chg_facility_name: string

  @Field(() => String, { nullable: false })
  chg_facility_addr_1: string


  @Field(() => String, { nullable: true })
  chg_facility_addr_2: string

  @Field(() => String, { nullable: false })
  chg_facility_city: string

  @Field(() => String, { nullable: false })
  chg_facility_state: string

  @Field(() => String, { nullable: false })
  chg_facility_zip: string

  @Field(() => String, { nullable: false })
  chg_facility_npi: string

  @Field(() => String, { nullable: false })
  facility_clia: string

  @Field(() => String, { nullable: false })
  ord_prov_name_l: string

  @Field(() => String, { nullable: false })
  ord_prov_name_f: string

  @Field(() => String, { nullable: true })
  ord_prov_name_m: string

  @Field(() => String, { nullable: false })
  ord_prov_npi: string

  @Field(() => String, { nullable: true })
  diag_1?: string

  @Field(() => String, { nullable: true })
  diag_2?: string

  @Field(() => String, { nullable: true })
  diag_3?: string

  @Field(() => String, { nullable: true })
  diag_4?: string

  @Field(() => String, { nullable: true })
  diag_5?: string

  @Field(() => String, { nullable: true })
  diag_6?: string

  @Field(() => String, { nullable: true })
  diag_7?: string

  @Field(() => String, { nullable: true })
  diag_8?: string

  @Field(() => String, { nullable: true })
  diag_9?: string

  @Field(() => String, { nullable: true })
  diag_10?: string

  @Field(() => String, { nullable: true })
  diag_11?: string

  @Field(() => String, { nullable: true })
  diag_12?: string
}