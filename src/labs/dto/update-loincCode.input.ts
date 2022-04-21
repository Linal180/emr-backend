import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import LoincCodeInput from './create-loincCode-input.dto';

@InputType()
export class UpdateLoincCodeInput extends PartialType(LoincCodeInput) {
  @Field()
  id: string;
}

@InputType()
export class GetLoincCode extends PickType(UpdateLoincCodeInput, ['id'] as const) { }

@InputType()
export class RemoveLoincCode extends PickType(UpdateLoincCodeInput, ['id'] as const) { }
