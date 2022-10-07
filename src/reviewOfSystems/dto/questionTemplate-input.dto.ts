import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


@InputType()
export class FindAllTemplatesInput {
  @Field({ nullable: true })
  templateType?: string

  @Field({ nullable: true })
  searchString?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}