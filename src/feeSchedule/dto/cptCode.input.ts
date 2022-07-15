import { Field, InputType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"

@InputType()
export class FindAllCPTCodesInput {

  @Field({ nullable: true })
  code?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}

@InputType()
export class CreateCPTCodesInput { 
  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  longDescription: string;
}