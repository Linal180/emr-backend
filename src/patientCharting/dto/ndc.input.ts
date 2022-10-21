import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllNdcInput {

  @Field({ nullable: true })
  searchQuery?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateNdcCodeInput {

  @Field()
  code: string;

  @Field({ nullable: true })
  description: string;

}

@InputType()
export class UpdateNdcCodeInput extends PartialType(CreateNdcCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetNdcCodeInput extends PickType(UpdateNdcCodeInput, ['id'] as const) { }

@InputType()
export class RemoveNdcCodeInput extends PickType(UpdateNdcCodeInput, ['id'] as const) { }