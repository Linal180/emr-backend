import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TwoFactorInput {
  @Field({nullable: false})
  userId: string;

  @Field({nullable: true})
  password?: string;

  @Field()
  isTwoFactorEnabled: boolean;
}