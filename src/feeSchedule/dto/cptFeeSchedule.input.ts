import { Field, InputType, PartialType, PickType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class FindAllCptFeeScheduleInput {

  @Field({ nullable: true })
  practiceId?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  searchString?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}


@InputType()
export class CreateCptFeeScheduleInput {

  @Field({ nullable: true })
  modifier: string;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  longDescription: string;

  @Field({ nullable: true })
  serviceFee: string;

  @Field({ nullable: true })
  revenueCode: string;

  @Field({ nullable: true })
  feeScheduleId: string;

  @Field({ nullable: true })
  CPTCodesId: string;
}

@InputType()
export class UpdateCptFeeScheduleInput extends PartialType(CreateCptFeeScheduleInput) {
  @Field()
  id: string;
}

@InputType()
export class GetCptFeeScheduleInput extends PickType(UpdateCptFeeScheduleInput, ['id'] as const) { }

@InputType()
export class RemoveCptFeeScheduleInput extends PickType(UpdateCptFeeScheduleInput, ['id'] as const) { }
