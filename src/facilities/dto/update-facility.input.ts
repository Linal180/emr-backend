import { InputType, Field } from '@nestjs/graphql';
import { UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UpdateBillingAddressInput } from './update-billing-address.input';
import { UpdateFacilityItemInput } from './update-facilityItem.input';

@InputType()
export class UpdateFacilityInput {
  @Field()
  updateFacilityItemInput: UpdateFacilityItemInput

  @Field(type => UpdateContactInput)
  updateContactInput?: UpdateContactInput

  @Field(type => UpdateBillingAddressInput)
  updateBillingAddressInput?: UpdateBillingAddressInput
}