import { Field, InputType } from '@nestjs/graphql';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { CreateEmployerInput } from './create-employer.input';
import { CreatePatientItemInput } from './create-patientItem.input ';

@InputType()
export class CreatePatientInput {
  @Field()
  createPatientItemInput: CreatePatientItemInput

  @Field()
  registerUserInput: RegisterUserInput

  @Field(type => CreateContactInput)
  createContactInput?: CreateContactInput

  @Field(type => CreateContactInput)
  createEmergencyContactInput?: CreateContactInput

  @Field(type => CreateContactInput)
  createNextOfKinContactInput?: CreateContactInput

  @Field(type => CreateContactInput)
  createGuardianContactInput?: CreateContactInput

  @Field(type => CreateContactInput)
  createGuarantorContactInput?: CreateContactInput

  @Field(type => CreateEmployerInput)
  createEmployerInput?: CreateEmployerInput

}