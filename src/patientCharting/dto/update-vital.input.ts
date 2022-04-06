import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateVitalInput } from './create-vital.input';

@InputType()
export class UpdateVitalInput extends PartialType(CreateVitalInput) { 
  @Field()
  id: string;
}

@InputType()
export class GetPatientVital extends PickType(UpdateVitalInput, ['id'] as const) { }

@InputType()
export class RemoveVital extends PickType(UpdateVitalInput, ['id'] as const) { }
