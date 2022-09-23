import { Field, InputType, PickType } from "@nestjs/graphql"
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


@InputType()
export class FindAllVaccineInput {

  @Field({ nullable: true })
  patientId: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput;

}

@InputType()
export class AddVaccineInput {

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
  cvxId: string;

  @Field({ nullable: true })
  mvxId: string;

  @Field({ nullable: true })
  ndcId: string;

  @Field({ nullable: true })
  patientId: string

}

@InputType()
export class UpdateVaccineInput extends AddVaccineInput {

  @Field()
  id: string

}

@InputType()
export class RemoveVaccineInput extends PickType(UpdateVaccineInput, ['id'] as const) { }

@InputType()
export class GetVaccineInput extends PickType(UpdateVaccineInput, ['id'] as const) { }