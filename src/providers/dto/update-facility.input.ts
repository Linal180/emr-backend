import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateStaffItemInput } from './create-staff.inputItem';

@InputType()
export class UpdateStaffItemInput extends PartialType(CreateStaffItemInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateStaffInput {
  @Field()
  updateStaffItemInput: UpdateStaffItemInput

  @Field(type => [String], {nullable: true})
  providers?: string[]
}

@InputType()
export class GetStaff extends PickType(UpdateStaffItemInput, ['id'] as const) { }

@InputType()
export class RemoveStaff extends PickType(UpdateStaffItemInput, ['id'] as const) { }

@InputType()
export class DisableStaff extends PickType(UpdateStaffItemInput, ['id'] as const) { }
