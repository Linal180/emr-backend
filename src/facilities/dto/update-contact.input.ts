import { CreateFacilityInput } from './create-facility.input';
import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput extends PartialType(CreateFacilityInput) {
  @Field()
  id: string;
}

@InputType()
export class GetContact extends PickType(UpdateContactInput, ['id'] as const) { }

@InputType()
export class RemoveContact extends PickType(UpdateContactInput, ['id'] as const) { }
