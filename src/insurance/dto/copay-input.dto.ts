import { Field, InputType } from "@nestjs/graphql"
import { CopayType } from "../entities/copay.entity"
import { CreatePolicyInput } from "./policy-input.dto"

@InputType()
export class CopayInput {
  @Field(() => CopayType, { nullable: true })
  type?: CopayType

  @Field({ nullable: true })
  amount?: string

  @Field(() => CreatePolicyInput, { nullable: true })
  policy?: Omit<CreatePolicyInput, 'copays'>

  @Field({ nullable: true })
  policyId?: string
}

@InputType()
export class UpdateCopayInput extends CopayInput {
  @Field({ nullable: true })
  id?: string
}