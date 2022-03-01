import { CreateFacilityInput } from '../../facilities/dto/create-facility.input';
import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';
import { CreateContactInput } from './create-contact.input';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field({nullable: true})
  id?: string;
}

@InputType()
export class GetContact extends PickType(UpdateContactInput, ['id'] as const) { }

@InputType()
export class RemoveContact extends PickType(UpdateContactInput, ['id'] as const) { }
