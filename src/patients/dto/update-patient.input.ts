import { Field, InputType } from '@nestjs/graphql';
import { UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UpdateEmployerItemInput } from './update-employer.input';
import { UpdatePatientItemInput } from './update-patientItem.input';

@InputType()
export class UpdatePatientInput {
  @Field()
  updatePatientItemInput: UpdatePatientItemInput

  @Field(() => UpdateContactInput)
  updateContactInput?: UpdateContactInput

  @Field(() => UpdateContactInput)
  updateEmergencyContactInput?: UpdateContactInput

  @Field(() => UpdateContactInput)
  updateNextOfKinContactInput?: UpdateContactInput

  @Field(() => UpdateContactInput)
  updateGuardianContactInput?: UpdateContactInput

  @Field(() => UpdateContactInput)
  updateGuarantorContactInput?: UpdateContactInput

  @Field(() => UpdateEmployerItemInput)
  updateEmployerInput?: UpdateEmployerItemInput
}

@InputType()
export class UpdatePatientNoteInfoInputs {
  @Field({ nullable: false })
  id: string;

  @Field(() => Boolean, { nullable: true })
  patientNoteOpen?: boolean;

  @Field({ nullable: true })
  patientNote?: string;

}