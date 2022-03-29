import { Field, InputType, Int } from '@nestjs/graphql';
import { ElementType } from '../entities/element.entity';
import { FormType } from '../entities/form.entity';


@InputType()
export class LayoutJSONInputType {
  @Field(() => [SectionsInputs])
  sections: SectionsInputs[]
}
@InputType()
export class SectionsInputs {
  @Field({ nullable: false })
  id: string;

  @Field(() => Int, { nullable: false })
  col: number;

  @Field(() => [FieldsInputs])
  fields: FieldsInputs[]
}


@InputType()
export class FieldsInputs {

  @Field({ nullable: false })
  label: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => ElementType)
  type: ElementType;

  @Field({ nullable: false })
  css: string;

  @Field(() => Int, { nullable: false })
  column: number;

  @Field({ nullable: false })
  placeholder: string;

  @Field({ nullable: false })
  defaultValue: string;

  @Field(() => Boolean, { nullable: false })
  required: boolean;

  @Field({ nullable: false })
  errorMsg: string;

  @Field({ nullable: true })
  tableName: string;

  @Field({ nullable: true })
  columnName: string;

  @Field({ nullable: false })
  fieldId: string;
}
@InputType()
export class CreateFormInput {

  @Field({ nullable: false })
  name: string;

  @Field(() => FormType, { nullable: false })
  type: FormType;

  @Field({ nullable: false })
  facilityId: string;

  @Field(() => LayoutJSONInputType, { nullable: false })
  layout: LayoutJSONInputType;

  @Field({ nullable: true })
  isSystemForm: boolean;

}


