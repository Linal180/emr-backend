import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateReactionInput } from './create-reaction.input';

@InputType()
export class UpdateReactionInput extends PartialType(CreateReactionInput) {
  @Field({nullable: true})
  id: string;
}

@InputType()
export class GetReaction extends PickType(UpdateReactionInput, ['id'] as const) { }

@InputType()
export class RemoveReaction extends PickType(UpdateReactionInput, ['id'] as const) { }
