import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateDoctorItemInput } from './create-doctorItem.input ';

@InputType()
export class UpdateDoctorItemInput extends PartialType(CreateDoctorItemInput) {
  @Field()
  id: string;
}

@InputType()
export class GetDoctor extends PickType(UpdateDoctorItemInput, ['id'] as const) { }

@InputType()
export class RemoveDoctor extends PickType(UpdateDoctorItemInput, ['id'] as const) { }

@InputType()
export class DisableDoctor extends PickType(UpdateDoctorItemInput, ['id'] as const) { }
