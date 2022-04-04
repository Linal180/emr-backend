import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TwoFactorInput {
  @Field({nullable: false})
  userId: string;

  @Field({nullable: true})
  phone?: string;

  @Field()
  isTwoFactorEnabled: boolean;
}