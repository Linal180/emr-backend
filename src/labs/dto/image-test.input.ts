import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllImagingTestInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active: boolean
}

@InputType()
export class CreateImagingTestInput {

  @Field()
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active: boolean

}

@InputType()
export class UpdateImagingTestInput extends PartialType(CreateImagingTestInput) {

  @Field()
  id: string;
}

@InputType()
export class GetImagingTestInput extends PickType(UpdateImagingTestInput, ['id'] as const) { }

@InputType()
export class RemoveImagingTestInput extends PickType(UpdateImagingTestInput, ['id'] as const) { }