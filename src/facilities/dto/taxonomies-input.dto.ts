import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class TaxonomyInput {
  @Field({ nullable: true })
  searchString?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}