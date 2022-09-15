import { Field, InputType, PickType } from '@nestjs/graphql';
import { CreateSurgicalHistoryInput } from './create-surgicalHistory.input';

@InputType()
export class UpdateSurgicalHistoryInput extends CreateSurgicalHistoryInput {
  @Field()
  id: string
}

@InputType()
export class GetSurgicalHistory extends PickType(UpdateSurgicalHistoryInput, ['id'] as const) { }

@InputType()
export class RemoveSurgicalHistory extends PickType(UpdateSurgicalHistoryInput, ['id'] as const) { }
