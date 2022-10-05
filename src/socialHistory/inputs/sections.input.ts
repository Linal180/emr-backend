import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


@InputType()
export class FindAllSectionsInput {

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}