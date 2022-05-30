import { Field, InputType } from '@nestjs/graphql';
import { PolicyHolderInput } from 'src/insurance/dto/policy-holder-input';

@InputType()
export class UpdatePatientPolicyHolderInput {
  @Field()
  id:string

  @Field(()=>PolicyHolderInput)
  policyHolder:PolicyHolderInput
}