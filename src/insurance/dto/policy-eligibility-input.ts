import { Field, InputType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class PolicyEligibilityPaginationInput {
  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  searchTerm?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}