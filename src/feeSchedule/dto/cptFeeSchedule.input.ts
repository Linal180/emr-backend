import { Field, InputType, PartialType, PickType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class findAllCptFeeScheduleInput {

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
export class createCptFeeScheduleInput {

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
export class updateCptFeeScheduleInput extends PartialType(createCptFeeScheduleInput) {
  @Field()
  id: string;
}

@InputType()
export class getCptFeeScheduleInput extends PickType(updateCptFeeScheduleInput, ['id'] as const) { }

@InputType()
export class removeCptFeeScheduleInput extends PickType(updateCptFeeScheduleInput, ['id'] as const) { }
