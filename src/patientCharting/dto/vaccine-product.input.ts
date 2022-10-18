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
export class AddVaccineProductInput {

  @Field({ nullable: true })
  administrationDate: string;

  @Field({ nullable: true })
  administerBy: string;

  @Field({ nullable: true })
  amount: string;

  @Field({ nullable: true })
  units: string;

  @Field({ nullable: true })
  route: string;

  @Field({ nullable: true })
  site: string;

  @Field({ nullable: true })
  lotNo: string;

  @Field({ nullable: true })
  expiryDate: string;

  @Field({ nullable: true })
  visGiven: string;

  @Field({ nullable: true })
  visDate: string;

  @Field({ nullable: true })
  vaccineProductId: string;

  @Field({ nullable: true })
  mvxId: string;

  @Field({ nullable: true })
  ndcId: string;

  @Field({ nullable: true })
  patientId: string

  @Field({ nullable: true })
  appointmentId?: string

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