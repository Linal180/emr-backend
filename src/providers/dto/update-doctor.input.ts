import { InputType, Field } from '@nestjs/graphql';
import { UpdateContactInput } from './update-contact.input';
import { UpdateBillingAddressInput } from 'src/facilities/dto/update-billing-address.input';
import { UpdateDoctorItemInput } from './update-doctorItem.input';

@InputType()
export class UpdateDoctorInput {
  @Field()
  updateDoctorItemInput: UpdateDoctorItemInput

  @Field(type => UpdateContactInput)
  updateContactInput?: UpdateContactInput

  @Field(type => UpdateBillingAddressInput)
  updateBillingAddressInput?: UpdateBillingAddressInput
}