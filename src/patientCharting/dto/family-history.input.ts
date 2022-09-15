import { Field, InputType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";
import { CreateFamilyHistoryRelativeInput, UpdateFamilyHistoryRelativeInput } from "./family-history-relative.input";

@InputType()
export class CreateFamilyHistoryInput {

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  icdCodeId: string;

  @Field(() => [CreateFamilyHistoryRelativeInput], { nullable: true })
  familyHistoryRelatives: CreateFamilyHistoryRelativeInput[];
}


@InputType()
export class UpdateFamilyHistoryInput extends PickType(CreateFamilyHistoryInput, ['name', 'patientId', 'icdCodeId']) {
  @Field({ nullable: true })
  id: string;

  @Field(() => [UpdateFamilyHistoryRelativeInput], { nullable: true })
  familyHistoryRelatives: UpdateFamilyHistoryRelativeInput[];

}

@InputType()
export class GetFamilyHistoryInput extends PickType(UpdateFamilyHistoryInput, ['id'] as const) { }

@InputType()
export class RemoveFamilyHistoryInput extends PickType(UpdateFamilyHistoryInput, ['id'] as const) { }

@InputType()
export class FindAllFamilyHistoryInput {
  @Field({ nullable: true })
  patientId: string;

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}