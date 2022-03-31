import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProblemInput } from './create-problem.input';

@InputType()
export class UpdateProblemInput extends PartialType(CreateProblemInput) {
  @Field()
  id: string;
}

@InputType()
export class GetProblem extends PickType(UpdateProblemInput, ['id'] as const) { }

@InputType()
export class RemoveProblem extends PickType(UpdateProblemInput, ['id'] as const) { }
