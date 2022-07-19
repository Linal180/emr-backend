import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class FindAllCPTCodesInput {

  @Field({ nullable: true })
  code?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}

@InputType()
export class CreateCPTCodeInput { 
  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  longDescription: string;
}

@InputType()
export class UpdateCPTCodeInput extends PartialType(CreateCPTCodeInput) {
  @Field()
  id: string;
}

@InputType()
export class GetCPTCodeInput extends PickType(UpdateCPTCodeInput, ['id'] as const) { }

@InputType()
export class RemoveCPTCodeInput extends PickType(UpdateCPTCodeInput, ['id'] as const) { }