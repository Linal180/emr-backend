import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';


@InputType()
export class MacroPaginationInput {
  @Field({ nullable: true })
  searchString?: string

  @Field({ nullable: true })
  section?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}


@InputType()
export class MacroInput {
  @Field({ nullable: true })
  payerName?: string

  @Field({ nullable: true })
  payerId?: string
}


@InputType()
export class GetMacroInput {
  @Field({ nullable: true })
  id: string
}