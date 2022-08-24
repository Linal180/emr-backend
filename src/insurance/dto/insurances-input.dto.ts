import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';


@InputType()
export class InsurancePaginationInput {
  @Field({ nullable: true })
  searchString?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}


@InputType()
export class InsuranceInput {
  @Field({ nullable: true })
  payerName?: string

  @Field({ nullable: true })
  payerId?: string
}


@InputType()
export class GetInsuranceInput {
  @Field({ nullable: true })
  id: string
}