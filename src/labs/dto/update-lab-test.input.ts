import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import CreateLabTestInput from './create-lab-test-input.dto';

@InputType()
export class UpdateLabTestInput extends PartialType(CreateLabTestInput) {
  @Field()
  id: string;
}

@InputType()
export class GetLabTest extends PickType(UpdateLabTestInput, ['id'] as const) { }

@InputType()
export class RemoveLabTest extends PickType(UpdateLabTestInput, ['id'] as const) { }
