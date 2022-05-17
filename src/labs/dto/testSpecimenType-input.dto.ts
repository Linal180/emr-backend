import { Field, InputType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class TestSpecimenTypeInput {
  @Field({ nullable: true })
  specimenTypeName?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}