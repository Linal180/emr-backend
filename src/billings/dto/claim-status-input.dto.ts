import { Field, InputType, PartialType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class ClaimStatusInput {
  @Field({ nullable: true })
  statusName?: string

  @Field({ nullable: true })
  statusId?: string
}

@InputType()
export class ClaimStatusPaginationInput {
  @Field({ nullable: true })
  statusName?: string

  @Field({ nullable: true })
  searchString?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class UpdateClaimStatusInput extends PartialType(ClaimStatusInput) {
  @Field({nullable: true})
  id?: string;
}
