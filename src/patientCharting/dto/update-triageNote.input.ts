import { Field, InputType, PickType } from '@nestjs/graphql';
import { HeadCircumferenceType, SmokingStatus, TempUnitType, UnitType, WeightType } from '../entities/patientVitals.entity';
import { CreateTriageNoteInput } from './create-triageNote.input';

@InputType()
export class UpdateTriageNoteInput extends CreateTriageNoteInput {
  @Field()
  id: string
}



@InputType()
export class GetPatientTriageNote extends PickType(UpdateTriageNoteInput, ['id'] as const) { }

@InputType()
export class RemoveTriageNote extends PickType(UpdateTriageNoteInput, ['id'] as const) { }
