import { Field, InputType, PartialType, PickType, Float } from '@nestjs/graphql';
//entities
import { OnsetDate, OrderOfBenefit, OtherDate } from '../entities/claim.entity';
import { Billing, OnsetDateType, OtherDateType } from '../entities/billing.entity';
//inputs
import CodesInput from './codes-input.dto';

@InputType()
export class CreateClaimInput {
  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => [CodesInput], { nullable: true })
  codes: CodesInput[]

  @Field({ nullable: true })
  employment: boolean;

  @Field({ nullable: true })
  autoAccident: boolean;

  @Field({ nullable: true })
  otherAccident: boolean;

  @Field(() => OnsetDateType, { nullable: true })
  onsetDateType?: OnsetDateType

  @Field({ nullable: true })
  onsetDate?: string

  @Field(() => OtherDateType, { nullable: true })
  otherDateType?: OtherDateType

  @Field({ nullable: true })
  otherDate?: string

  @Field({ nullable: true })
  from?: string

  @Field({ nullable: true })
  to?: string

  @Field({ nullable: true })
  feeScheduleId?: string

  @Field({ nullable: true })
  shouldCheckout?: boolean

  @Field({ nullable: true })
  uncoveredAmount?: string;

  @Field({ nullable: true })
  facilityId?: string

  @Field({ nullable: true })
  servicingProviderId?: string

  @Field({ nullable: true })
  renderingProviderId?: string

  @Field({ nullable: true })
  pos?: string

  @Field({ nullable: true })
  serviceDate?: string

  @Field({ nullable: true })
  claimDate?: string

  @Field({ nullable: true })
  labOrderNumber?: string

  @Field({ nullable: true })
  claimNo?: string

  @Field({ nullable: true })
  amount?: string;

}



@InputType()
export class GetClaimFileInput {
  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => [CodesInput], { nullable: true })
  codes: CodesInput[]

  @Field({ nullable: true })
  employment: boolean;

  @Field({ nullable: true })
  autoAccident: boolean;

  @Field({ nullable: true })
  otherAccident: boolean;

  @Field(() => OnsetDateType, { nullable: true })
  onsetDateType?: OnsetDateType

  @Field({ nullable: true })
  onsetDate?: string

  @Field(() => OtherDateType, { nullable: true })
  otherDateType?: OtherDateType

  @Field({ nullable: true })
  otherDate?: string

  @Field({ nullable: true })
  from?: string

  @Field({ nullable: true })
  to?: string

}

@InputType()
export class ClaimChargeInput {

  @Field({ nullable: true })
  m1?: string;

  @Field({ nullable: true })
  m2?: string;

  @Field({ nullable: true })
  m3?: string;

  @Field({ nullable: true })
  m4?: string;

  @Field(() => Float, { nullable: false })
  units?: number;

  @Field(() => Float, { nullable: false })
  charge: number;

  @Field({ nullable: false })
  diag_ref: string;

  @Field({ nullable: false })
  proc_code: string;

  @Field({ nullable: false })
  diagPointer: string

}

@InputType()
export class ClaimInput {

  //response columns

  @Field( { nullable: true })
  claimMdId?: string

  @Field({ nullable: true })
  batchId?: string

  @Field( { nullable: true })
  billNpi?: string

  @Field( { nullable: true })
  billTaxId?: string

  @Field({ nullable: true })
  claimId?: string

  @Field({ nullable: true })
  facilityDateOfService?: string

  @Field({ nullable: true })
  fileName?: string

  @Field( { nullable: true })
  fileId?: string

  @Field({ nullable: true })
  insuranceNumber?: string

  @Field({ nullable: true })
  receivePayerId?: string

  @Field({ nullable: true })
  pcn?: string

  @Field({ nullable: true })
  sendIcn?: string

  @Field({ nullable: true })
  senderName?: string

  @Field({ nullable: true })
  senderId?: string

  @Field({ nullable: true })
  totalCharge?: string;

  @Field(() => [String], { nullable: true })
  errorMessages: string[]

  //polymorphic columns of claimStatus

  @Field({ nullable: true })
  billingId?: string;

  //request columns

  @Field({ nullable: true })
  cond_date?: string;

  @Field({ nullable: true })
  onset_date?: string;

  @Field({ nullable: true })
  hosp_from_date?: string;

  @Field({ nullable: true })
  hosp_thru_date?: string;

  @Field({ nullable: true })
  clia_number?: string;

  @Field({ nullable: true })
  facility_name?: string;

  @Field({ nullable: true })
  facility_addr_1?: string;

  @Field({ nullable: true })
  facility_addr_2?: string

  @Field({ nullable: true })
  facility_city?: string;

  @Field({ nullable: true })
  facility_state?: string;

  @Field({ nullable: true })
  facility_zip?: string;

  @Field({ nullable: true })
  facility_npi?: string;

  @Field({ nullable: true })
  facility_id?: string;

  @Field({ nullable: true })
  prov_name_l?: string;

  @Field({ nullable: true })
  prov_name_f?: string;

  @Field({ nullable: true })
  prov_name_m?: string

  @Field({ nullable: true })
  prov_npi?: string;

  @Field({ nullable: true })
  ord_name_l?: string;

  @Field({ nullable: true })
  ord_name_f?: string;

  @Field({ nullable: true })
  ord_name_m?: string

  @Field({ nullable: true })
  ord_npi?: string;

  @Field({ nullable: true })
  place_of_service_1?: string

  @Field({ nullable: true })
  chg_facility_name?: string;

  @Field({ nullable: true })
  chg_facility_addr_1?: string;

  @Field({ nullable: true })
  chg_facility_addr_2?: string

  @Field({ nullable: true })
  chg_facility_city?: string;

  @Field({ nullable: true })
  chg_facility_state?: string

  @Field({ nullable: true })
  chg_facility_zip?: string;

  @Field({ nullable: true })
  chg_facility_npi?: string;

  @Field({ nullable: true })
  facility_clia?: string;

  @Field({ nullable: true })
  ord_prov_name_l?: string;

  @Field({ nullable: true })
  ord_prov_name_f?: string;

  @Field({ nullable: true })
  ord_prov_name_m?: string

  @Field({ nullable: true })
  ord_prov_npi?: string;

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

  @Field({ nullable: true })
  pat_name_m?: string

  @Field({ nullable: true })
  pat_addr_2?: string

  @Field({ nullable: true })
  pat_country?: string

  @Field({ nullable: true })
  pat_phone?: string

  @Field({ nullable: true })
  pat_marital?: string

  @Field({ nullable: true })
  ins_name_l?: string

  @Field({ nullable: true })
  ins_name_f?: string

  @Field({ nullable: true })
  ins_name_m?: string

  @Field({ nullable: true })
  ins_addr_1?: string

  @Field({ nullable: true })
  ins_addr_2?: string

  @Field({ nullable: true })
  ins_city?: string

  @Field({ nullable: true })
  ins_state?: string

  @Field({ nullable: true })
  ins_zip?: string

  @Field({ nullable: true })
  ins_group?: string

  @Field({ nullable: true })
  ins_dob?: string

  @Field({ nullable: true })
  ins_sex?: string

  @Field({ nullable: true })
  employment_related?: string

  @Field({ nullable: true })
  auto_accident?: string

  @Field({ nullable: true })
  other_accident?: string

  @Field({ nullable: true })
  ref_name_l?: string

  @Field({ nullable: true })
  ref_name_f?: string

  @Field({ nullable: true })
  ref_name_m?: string

  @Field({ nullable: true })
  ref_id?: string

  @Field({ nullable: true })
  ref_npi?: string;

  @Field(() => OnsetDate, { nullable: true })
  cond?: OnsetDate

  @Field(() => OtherDate, { nullable: true })
  onset?: OtherDate

  @Field(() => OrderOfBenefit, { nullable: true })
  payer_order?: OrderOfBenefit

  @Field({ nullable: true })
  claim_form?: string;

  @Field({ nullable: true })
  payerid?: string;

  @Field({ nullable: true })
  payer_name?: string;

  @Field({ nullable: true })
  pat_name_l?: string;

  @Field({ nullable: true })
  pat_name_f?: string;

  @Field({ nullable: true })
  pat_addr_1?: string;

  @Field({ nullable: true })
  pat_city?: string;

  @Field({ nullable: true })
  pat_state?: string;

  @Field({ nullable: true })
  pat_zip?: string;

  @Field({ nullable: true })
  pat_dob?: string;

  @Field({ nullable: true })
  pat_sex?: string;

  @Field({ nullable: true })
  pat_rel?: string;

  @Field({ nullable: true })
  ins_number?: string;

  @Field({ nullable: true })
  accept_assign?: string;

  @Field(() => Float, { nullable: true })
  total_charge?: number;

  @Field({ nullable: true })
  bill_name?: string;

  @Field({ nullable: true })
  bill_addr_1?: string;

  @Field({ nullable: true })
  bill_addr_2?: string;

  @Field({ nullable: true })
  bill_city?: string;

  @Field({ nullable: true })
  bill_state?: string;

  @Field({ nullable: true })
  bill_zip?: string;

  @Field({ nullable: true })
  bill_npi?: string;

  @Field({ nullable: true })
  bill_phone?: string;

  @Field({ nullable: true })
  bill_taxid?: string;

  @Field({ nullable: true })
  bill_taxid_type?: string;

  @Field({ nullable: true })
  bill_taxonomy?: string;

  @Field({ nullable: true })
  from_date_1?: string;

  @Field({ nullable: true })
  thru_date?: string;

  @Field(() => [ClaimChargeInput], { nullable: true })
  charge?: ClaimChargeInput[];

  @Field(() => Billing, { nullable: true })
  billing?: Billing

}


@InputType()
export class UpdateClaimInput extends PartialType(ClaimInput) {
  @Field()
  id: string
}

@InputType()
export class GetClaimInput extends PickType(UpdateClaimInput, ['id'] as const) { }