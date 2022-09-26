import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class FindAllNdcInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field({ nullable: true })
  mvxId: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}