import { InputType, Field } from '@nestjs/graphql';
import { CreateBillingAddressInput } from 'src/providers/dto/create-billing-address.input';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { CreateFacilityItemInput } from './create-facilityItem.input ';

@InputType()
export class CreateFacilityInput {
  @Field()
  createFacilityItemInput: CreateFacilityItemInput

  @Field(type => CreateContactInput)
  createContactInput?: CreateContactInput

  @Field(type => CreateBillingAddressInput)
  createBillingAddressInput?: CreateBillingAddressInput

}