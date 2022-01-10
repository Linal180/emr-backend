import { CreateStaffInput } from './create-staff.input';
import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';
import { CreateDoctorInput } from './create-doctor.input';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {
  @Field()
  id: string;
}

@InputType()
export class GetDoctor extends PickType(UpdateDoctorInput, ['id'] as const) { }

@InputType()
export class RemoveDoctor extends PickType(UpdateDoctorInput, ['id'] as const) { }

@InputType()
export class DisableDoctor extends PickType(UpdateDoctorInput, ['id'] as const) { }
