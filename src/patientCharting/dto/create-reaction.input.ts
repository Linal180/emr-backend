import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateReactionInput {

  @Field({ nullable: true })
  name: string;
}