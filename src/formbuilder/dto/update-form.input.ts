import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateFormInput } from './create-form.input';

@InputType()
export class UpdateFormInput extends PartialType(CreateFormInput) {
  @Field()
  id: string;
}

@InputType()
export class GetForm extends PickType(UpdateFormInput, ['id'] as const) { }

@InputType()
export class RemoveForm extends PickType(UpdateFormInput, ['id'] as const) { }
