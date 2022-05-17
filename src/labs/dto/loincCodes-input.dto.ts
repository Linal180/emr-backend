import { Field, InputType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class SearchLoincCodesInput {
  @Field({ nullable: true })
  searchTerm?: string

  @Field({ nullable: true })
  loincNum: string

  @Field({ nullable: true })
  component: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}