import { Field, InputType } from '@nestjs/graphql';
import { UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UpdatePatientProfileItemInput } from './update-patientItem.input';

@InputType()
export class UpdatePatientProfileInput {
  @Field()
  updatePatientProfileItemInput: UpdatePatientProfileItemInput

  @Field(type => UpdateContactInput)
  updateContactInput?: UpdateContactInput
}