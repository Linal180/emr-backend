import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class FindAllRoomInput {

  @Field({ nullable: true })
  facilityId?: string

  @Field({ nullable: true })
  practiceId?: string

  @Field({ nullable: true })
  searchString?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateRoomInput {

  @Field({ nullable: true })
  facilityId: string;

  @Field({nullable: true })
  name: string;

  @Field({nullable: true })
  number: string;

}

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field()
  id: string;
}

@InputType()
export class GetRoomInput extends PickType(UpdateRoomInput, ['id'] as const) { }

@InputType()
export class RemoveRoomInput extends PickType(UpdateRoomInput, ['id'] as const) { }