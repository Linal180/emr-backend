import { Field, InputType } from "@nestjs/graphql";
//user import
import { LayoutJSONInputType } from "./create-form.input";

//create template form inputs

@InputType()
export class CreateFormTemplateInput {

  @Field({ nullable: false })
  name: string;

  @Field(() => LayoutJSONInputType, { nullable: false })
  layout: LayoutJSONInputType;

}