import { InputType, Field } from '@nestjs/graphql';
import { CreateBillingAddressInput } from './create-billing-address.input';
import { CreateContactInput } from './create-contact.input';
import { CreateDoctorItemInput } from './create-doctorItem.input ';

@InputType()
export class CreateDoctorInput {
  @Field()
  createDoctorItemInput: CreateDoctorItemInput

  @Field(type => CreateContactInput)
  createContactInput?: CreateContactInput

  @Field(type => CreateBillingAddressInput)
  createBillingAddressInput?: CreateBillingAddressInput

}