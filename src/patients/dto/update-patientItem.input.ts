import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreatePatientItemInput } from './create-patientItem.input ';

@InputType()
export class UpdatePatientItemInput extends PartialType(CreatePatientItemInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdatePatientProfileItemInput extends PickType(CreatePatientItemInput, ['firstName','lastName'] as const) {
  @Field()
  id: string;
}

@InputType()
export class GetPatient extends PickType(UpdatePatientItemInput, ['id'] as const) { }

@InputType()
export class RemovePatient extends PickType(UpdatePatientItemInput, ['id'] as const) { }
