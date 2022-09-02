import { Field, InputType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"
import { POLICY_HOLDER_GENDER_IDENTITY } from "../entities/policy-holder.entity"

@InputType()
export class PolicyHolderInput {
  @Field({ nullable: true })
  certificationNumber?: string

  @Field({ nullable: true })
  employer?: string

  @Field({ nullable: true })
  suffix?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  middleName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  zipCode?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  addressCTD?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  ssn?: string

  @Field(type => POLICY_HOLDER_GENDER_IDENTITY, { nullable: true })
  sex?: POLICY_HOLDER_GENDER_IDENTITY

  @Field({ nullable: true })
  dob?: string
}

@InputType()
export class PolicyHolderPaginationInput {
  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class UpdatePolicyHolderInput extends PolicyHolderInput {
  @Field()
  id: string
}

