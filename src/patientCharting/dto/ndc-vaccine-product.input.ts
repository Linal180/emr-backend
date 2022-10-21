import { Field, InputType } from "@nestjs/graphql"
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


@InputType()
export class FindAllNdcVaccineProductsInput {

  @Field({ nullable: true })
  searchQuery?: string

  @Field({ nullable: true })
  ndcId?: string

  @Field({ nullable: true })
  vaccineProductId?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput;

}


@InputType()
export class CreateNdcVaccineProductInput {

@Field({ nullable: true })
vaccineProductId: string;

@Field({ nullable: true })
ndcCodeId: string;
}