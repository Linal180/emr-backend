import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"

//inputs types

@InputType()
export class FindAllFeeScheduleInput {

  @Field({ nullable: true })
  practiceId?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}

@InputType()
export class CreateFeeScheduleInput {

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  procedureCode: string;

  @Field({ nullable: true })
  modifier: string;

  @Field({ nullable: true })
  cptCode: string;

  @Field({ nullable: true })
  effectiveDate: string;

  @Field({ nullable: true })
  expireDate: string;

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
  practiceId: string

}

@InputType()
export class UpdateFeeScheduleInput extends PartialType(CreateFeeScheduleInput) {
  @Field()
  id: string;
}

@InputType()
export class GetFeeScheduleInput extends PickType(UpdateFeeScheduleInput, ['id'] as const) { }

@InputType()
export class RemoveFeeScheduleInput extends PickType(UpdateFeeScheduleInput, ['id'] as const) { }
