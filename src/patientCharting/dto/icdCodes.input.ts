import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class CreateIcdCodeInput {

  @Field()
  code: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true, defaultValue: 'ICD10' })
  version: string;

}


@InputType()
export class UpdateIcdCodeInput extends PartialType(CreateIcdCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetIcdCodeInput extends PickType(UpdateIcdCodeInput, ['id'] as const) { }

@InputType()
export class RemoveIcdCodeInput extends PickType(UpdateIcdCodeInput, ['id'] as const) { }

@InputType()
export class FindAllIcdCodesInput {

  @Field({ nullable: true })
  searchQuery: string;

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}