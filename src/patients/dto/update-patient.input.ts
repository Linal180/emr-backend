import { Field, InputType } from '@nestjs/graphql';
import { UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UpdateEmployerItemInput } from './update-employer.input';
import { UpdatePatientItemInput } from './update-patientItem.input';

@InputType()
export class UpdatePatientInput {
  @Field()
  updatePatientItemInput: UpdatePatientItemInput

  @Field(type => UpdateContactInput)
  updateContactInput?: UpdateContactInput

  @Field(type => UpdateContactInput)
  updateEmergencyContactInput?: UpdateContactInput

  @Field(type => UpdateContactInput)
  updateNextOfKinContactInput?: UpdateContactInput

  @Field(type => UpdateContactInput)
  updateGuardianContactInput?: UpdateContactInput

  @Field(type => UpdateContactInput)
  updateGuarantorContactInput?: UpdateContactInput

  @Field(type => UpdateEmployerItemInput)
  updateEmployerInput?: UpdateEmployerItemInput
}