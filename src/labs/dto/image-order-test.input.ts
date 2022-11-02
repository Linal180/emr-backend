import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllImagingOrderTestInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateImagingOrderTestInput {

  @Field()
  imagingOrderId: string;

  @Field()
  imagingTestId: string;

}

@InputType()
export class UpdateImagingOrderTestInput extends PartialType(CreateImagingOrderTestInput) {

  @Field()
  id: string;
}

@InputType()
export class GetImagingOrderTestInput extends PickType(UpdateImagingOrderTestInput, ['id'] as const) { }

@InputType()
export class RemoveImagingOrderTestInput extends PickType(UpdateImagingOrderTestInput, ['id'] as const) { }