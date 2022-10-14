import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllCvxInput {

  @Field({ nullable: true })
  searchQuery?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateCvxCodeInput {

  @Field({ nullable: true })
  cptCodeId: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  shortDescription: string

  @Field({ nullable: true })
  cvxCode: string

  @Field({ nullable: true })
  status: string

  @Field({ nullable: true })
  notes: string

  @Field({ nullable: true })
  updateDate?: string

}

@InputType()
export class UpdateCvxCodeInput extends PartialType(CreateCvxCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetCvxCodeInput extends PickType(UpdateCvxCodeInput, ['id'] as const) { }

@InputType()
export class RemoveCvxCodeInput extends PickType(UpdateCvxCodeInput, ['id'] as const) { }