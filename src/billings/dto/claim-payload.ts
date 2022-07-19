import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ResponsePayload } from "src/users/dto/response-payload.dto";

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