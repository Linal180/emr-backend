import { CreateStaffInput } from './create-staff.input';
import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateStaffInput extends PartialType(CreateStaffInput) {
  @Field()
  id: string;
}

@InputType()
export class GetStaff extends PickType(UpdateStaffInput, ['id'] as const) { }

@InputType()
export class RemoveStaff extends PickType(UpdateStaffInput, ['id'] as const) { }

@InputType()
export class DisableStaff extends PickType(UpdateStaffInput, ['id'] as const) { }
