import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateContractInput {
  
  @Field({ nullable: true })
  contractNumber: string;

  @Field({ nullable: true })
  organizationName: string;
}


@InputType()
export class UpdateContractInput extends  PartialType(CreateContractInput) {
  
  @Field({ nullable: true })
  contractNumber: string;

  @Field({ nullable: true })
  organizationName: string;
}