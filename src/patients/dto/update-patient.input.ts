import { Field, InputType } from '@nestjs/graphql';
import { UpdateBillingAddressInput } from 'src/facilities/dto/update-billing-address.input';
import { UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UpdatePatientItemInput } from './update-patientItem.input';

@InputType()
export class UpdatePatientInput {
  @Field()
  updatePatientItemInput: UpdatePatientItemInput

  @Field(type => UpdateContactInput)
  updateContactInput?: UpdateContactInput

  @Field(type => UpdateBillingAddressInput)
  updateBillingAddressInput?: UpdateBillingAddressInput
}