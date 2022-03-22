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
  @Field()
  id: string;

  @Field(() => Int)
  col: number;

  @Field(() => [FieldsInputs], { nullable: true })
  fields: FieldsInputs[]
}


@InputType()
export class FieldsInputs {

  @Field({ nullable: true })
  label: string;

  @Field()
  name: string;

  @Field(()=>ElementType)
  type: ElementType;

  @Field({ nullable: true })
  css: string;

  @Field(() => Int)
  column: number;

  @Field({ nullable: true })
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
}
@InputType()
export class CreateFormInput {

  @Field({ nullable: false })
  name: string;

  @Field(() => FormType, { nullable: false })
  type: FormType;

  @Field({ nullable: true })
  facilityId: string;

  @Field(() => LayoutJSONInputType, { nullable: false })
  layout: LayoutJSONInputType;

  @Field({ nullable: true })
  isSystemForm: boolean;

}


