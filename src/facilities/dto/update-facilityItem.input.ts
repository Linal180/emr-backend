import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';
import { CreateFacilityItemInput } from './create-facilityItem.input ';

@InputType()
export class UpdateFacilityItemInput extends PartialType(CreateFacilityItemInput) {
  @Field()
  id: string;
}

@InputType()
export class GetFacility extends PickType(UpdateFacilityItemInput, ['id'] as const) { }

@InputType()
export class RemoveFacility extends PickType(UpdateFacilityItemInput, ['id'] as const) { }
