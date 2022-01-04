import { CreateFacilityInput } from './create-facility.input';
import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateFacilityInput extends PartialType(CreateFacilityInput) {
  @Field()
  id: string;
}

@InputType()
export class GetFacility extends PickType(UpdateFacilityInput, ['id'] as const) { }

@InputType()
export class RemoveFacility extends PickType(UpdateFacilityInput, ['id'] as const) { }
