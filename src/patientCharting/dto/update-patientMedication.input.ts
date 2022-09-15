import { Field, InputType, PickType } from '@nestjs/graphql';
import { CreatePatientMedicationInput } from './create-patientMedications.input';

@InputType()
export class UpdatePatientMedicationInput extends CreatePatientMedicationInput {
  @Field()
  id: string
}

@InputType()
export class GetPatientMedication extends PickType(UpdatePatientMedicationInput, ['id'] as const) { }

@InputType()
export class RemovePatientMedication extends PickType(UpdatePatientMedicationInput, ['id'] as const) { }
