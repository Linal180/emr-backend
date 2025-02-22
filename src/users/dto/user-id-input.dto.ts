import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserIdInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  adminId?: string;

  @Field({ nullable: true })
  isEnabled?: boolean;
}