import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllImagingTestInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateImagingTestCodeInput {

  @Field()
  name: string;

}

@InputType()
export class UpdateImagingTestCodeInput extends PartialType(CreateImagingTestCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetImagingTestCodeInput extends PickType(UpdateImagingTestCodeInput, ['id'] as const) { }

@InputType()
export class RemoveImagingTestCodeInput extends PickType(UpdateImagingTestCodeInput, ['id'] as const) { }