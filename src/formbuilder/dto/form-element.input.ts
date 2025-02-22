import { Field, InputType, PartialType } from "@nestjs/graphql";
import { ElementType } from "../entities/element.entity";

@InputType()
export class FormElementInputs {

  @Field({ nullable: false })
  placeholder: string;

  @Field({ nullable: true })
  defaultValue: string;

  @Field({ nullable: true })
  required: boolean;

  @Field({ nullable: true })
  errorMsg: string;

  @Field({ nullable: true })
  tableName: string;

  @Field({ nullable: true })
  columnName: string;

  @Field({ nullable: false })
  fieldId: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => ElementType)
  type: ElementType

  @Field({ nullable: true })
  tableContactType: string;

}

@InputType()
export class CreateElementInputs extends FormElementInputs {
  @Field()
  sectionId: string
}

export class UpdateElementsInputs extends PartialType(FormElementInputs) { }