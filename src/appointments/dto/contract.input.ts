import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateContractInput {
  
  @Field({ nullable: true })
  contractNumber: string;

  @Field({ nullable: true })
  organizationName: string;
}