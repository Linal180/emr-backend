import { Field, InputType, PickType } from "@nestjs/graphql"
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


@InputType()
export class FindAllVaccineProductsInput {

  @Field({ nullable: true })
  searchQuery?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput;

}


@InputType()
export class FetchAllVaccineProductsInput extends FindAllVaccineProductsInput {

}


@InputType()
export class AddVaccineProductInput {

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  status: string

  @Field({ nullable: true })
  cvxId: string

  @Field({ nullable: true })
  mvxId: string;

  @Field({ nullable: true })
  ndcCodeId: string;

}

@InputType()
export class UpdateVaccineProductInput extends AddVaccineProductInput {

  @Field()
  id: string

}

@InputType()
export class RemoveVaccineProductInput extends PickType(UpdateVaccineProductInput, ['id'] as const) { }

@InputType()
export class GetVaccineProductInput extends PickType(UpdateVaccineProductInput, ['id'] as const) { }