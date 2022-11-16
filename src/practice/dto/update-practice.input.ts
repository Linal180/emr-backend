import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/users/dto/update-user-input.dto';
import { CreatePracticeItemInput } from './create-practiceItem.input';

@InputType()
export class UpdatePracticeItemInput extends PartialType(CreatePracticeItemInput) {
  @Field({ nullable: true })
  id: string;
}

@InputType()
export class UpdatePracticeInput {
  @Field({ nullable: true })
  updatePracticeItemInput?: UpdatePracticeItemInput

  @Field({ nullable: true })
  updateUserInput?: UpdateUserInput
}

@InputType()
export class GetPractice extends PickType(UpdatePracticeItemInput, ['id', 'active'] as const) { }

@InputType()
export class RemovePractice extends PickType(UpdatePracticeItemInput, ['id', 'active'] as const) { }



