import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateFacilityItemInput } from './create-facilityItem.input ';
import { CreateServiceInput } from './create-service.input';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  @Field()
  id: string;
}

@InputType()
export class GetService extends PickType(UpdateServiceInput, ['id'] as const) { }

@InputType()
export class RemoveService extends PickType(UpdateServiceInput, ['id'] as const) { }
