import { Field, InputType } from '@nestjs/graphql';
import { CreatePatientItemInput } from 'src/patients/dto/create-patientItem.input ';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { CreateExternalAppointmentItemInput } from './create-external-appointmentItem.input';

@InputType()
export class CreateExternalAppointmentInput {
    
    @Field()
    createExternalAppointmentItemInput: CreateExternalAppointmentItemInput

    @Field()
    createPatientItemInput: CreatePatientItemInput

    @Field(type => CreateContactInput)
    createGuardianContactInput?: CreateContactInput
}
