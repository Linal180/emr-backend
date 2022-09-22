import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllMvxInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field({ nullable: true })
  cvxId: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}