import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreatePracticeItemInput } from './create-practiceItem.input';

@InputType()
export class UpdatePracticeInput extends PartialType(CreatePracticeItemInput) {
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetPractice extends PickType(UpdatePracticeInput, ['id'] as const) { }

@InputType()
export class RemovePractice extends PickType(UpdatePracticeInput, ['id'] as const) { }



