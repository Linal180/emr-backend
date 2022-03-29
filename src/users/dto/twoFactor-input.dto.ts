import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TwoFactorInput {
  @Field()
  userId: string;

  @Field()
  isTwoFactorEnabled: boolean;
}