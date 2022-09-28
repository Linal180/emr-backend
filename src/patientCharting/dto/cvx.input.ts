import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllCvxInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}