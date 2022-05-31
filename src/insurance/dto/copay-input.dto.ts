import { Field, InputType, Int } from "@nestjs/graphql"
import { CopayType } from "../entities/copay.entity"
import { CreatePolicyInput } from "./policy-input.dto"

@InputType()
export class CopayInput {
  @Field(type => CopayType, { nullable: true })
  type?: CopayType

  @Field({ nullable: true })
  amount?: string

  @Field(() => CreatePolicyInput, { nullable: true })
  policy?: Omit<CreatePolicyInput, 'copays'>
}

@InputType()
export class UpdateCopayInput extends  CopayInput{
  @Field()
  id: string
}