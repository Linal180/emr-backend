import { Field, InputType, PartialType } from '@nestjs/graphql';
import CreateSpecimenItemInput from './create-specimen-Item-input.dto';

@InputType()
export class UpdateSpecimenItemInput extends PartialType(CreateSpecimenItemInput) {
  @Field()
  id?: string;
}