import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"

//inputs types

@InputType()
export class FindAllModifierInput {

  @Field({ nullable: true })
  searchQuery?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}

@InputType()
export class CreateModifierInput {

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

}

@InputType()
export class UpdateModifierInput extends PartialType(CreateModifierInput) {

  @Field()
  id: string;

}

@InputType()
export class GetModifierInput extends PickType(UpdateModifierInput, ['id'] as const) { }

@InputType()
export class RemoveModifierInput extends PickType(UpdateModifierInput, ['id'] as const) { }
