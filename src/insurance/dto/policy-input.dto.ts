import { Field, InputType } from '@nestjs/graphql';
import { CopayInput, UpdateCopayInput } from './copay-input.dto';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { PolicyHolderInput, UpdatePolicyHolderInput } from './policy-holder-input';
import { OrderOfBenefitType, PolicyHolderRelationshipType, PricingProductType } from '../entities/policy.entity';


@InputType()
export class PolicyPaginationInput {
  @Field({ nullable: true })
  patientId?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreatePolicyInput {
  @Field(() => OrderOfBenefitType, { nullable: true })
  orderOfBenifit?: OrderOfBenefitType

  @Field(() => PolicyHolderRelationshipType, { nullable: true })
  policyHolderRelationship?: PolicyHolderRelationshipType

  @Field({ nullable: true })
  memberId?: string

  @Field({ nullable: true })
  groupNumber?: string

  @Field({ nullable: true })
  issueDate?: string

  @Field({ nullable: true })
  expirationDate?: string

  @Field({ nullable: true })
  coinsurancePercentage?: string

  @Field({ nullable: true })
  referringProviderId?: string

  @Field({ nullable: true })
  primaryCareProviderId?: string

  @Field(() => PricingProductType, { nullable: true })
  pricingProductType?: PricingProductType

  @Field({ nullable: true })
  notes?: string

  @Field({ nullable: true })
  insuranceId?: string

  @Field({ nullable: true })
  patientId?: string

  @Field(() => [CopayInput], { nullable: true })
  copays?: CopayInput[]

  @Field(() => PolicyHolderInput, { nullable: true })
  policyHolderInfo?: PolicyHolderInput
}

@InputType()
export class UpdatePolicyInput extends CreatePolicyInput {
  @Field()
  id: string

  @Field(() => UpdatePolicyHolderInput, { nullable: true })
  policyHolderInfo?: UpdatePolicyHolderInput

  @Field(() => [UpdateCopayInput], { nullable: true })
  copays?: UpdateCopayInput[];
}