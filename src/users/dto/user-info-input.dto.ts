import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInfoInput {
  @Field()
  id: string;
  @Field({nullable: true})
  email?: string;
  @Field({ nullable: true })
  phone?: string;
}
