import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { TemplateType } from "src/lib/constants";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto"


registerEnumType(TemplateType, {
  name: "TemplateType",
  description: "The charting template type is assigned",
});
@InputType()
export class FindAllTemplatesInput {
  @Field(() => TemplateType, { nullable: true })
  templateType?: TemplateType

  @Field({ nullable: true })
  searchString?: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}