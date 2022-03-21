import { Field, InputType, Int } from '@nestjs/graphql';
import JSON from 'graphql-type-json'
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
  @Field(() => [FieldsInputs])
  fields: FieldsInputs[]
}


@InputType()
export class FieldsInputs {
  @Field()
  content: string;
  @Field()
  name: string;
  @Field()
  type: string;
  @Field()
  css: string;
  @Field(() => Int)
  column: number;
  @Field()
  placeholder: string;
  @Field(() => Boolean)
  required: boolean;
  @Field()
  id: string;
}
@InputType()
export class CreateFormInput {

  @Field({ nullable: false })
  name: string;

  @Field(() => FormType, { nullable: false })
  type: FormType;

  @Field({ nullable: true })
  facilityId: string;

  @Field(() => JSON, { nullable: false })
  layout: object;

  @Field({ nullable: true })
  isSystemForm: boolean;

}


