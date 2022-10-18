import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllMvxInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field({ nullable: true })
  mvxCode: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateMvxCodeInput {

  @Field()
  manufacturerName: string;

  @Field({ nullable: true })
  mvxCode: string;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  mvxStatus: string;

  @Field({ nullable: true })
  updateDate: string

}

@InputType()
export class UpdateMvxCodeInput extends PartialType(CreateMvxCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetMvxCodeInput extends PickType(UpdateMvxCodeInput, ['id'] as const) { }

@InputType()
export class RemoveMvxCodeInput extends PickType(UpdateMvxCodeInput, ['id'] as const) { }