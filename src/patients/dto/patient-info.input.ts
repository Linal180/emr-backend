import { Field, InputType } from '@nestjs/graphql';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { PatientInfoItemInput } from './patient-info-Item.input';

@InputType()
export class PatientInfoInput {
  @Field()
  patientInfoItemInput: PatientInfoItemInput

  @Field(type => CreateContactInput)
  createContactInput?: CreateContactInput

  @Field(type => CreateContactInput)
  createEmergencyContactInput?: CreateContactInput
}