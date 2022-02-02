import { InputType, PickType } from '@nestjs/graphql';
import { UpdatePatientItemInput } from './update-patientItem.input';

@InputType()
export class PatientInfoItemInput extends PickType(UpdatePatientItemInput, ['id','maritialStatus','ethnicity','race','ssn','pharmacy','language','voiceCallPermission','phonePermission','preferredCommunicationMethod'] as const) {
}