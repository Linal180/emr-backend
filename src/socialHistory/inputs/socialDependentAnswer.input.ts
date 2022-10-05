import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class SocialDependentAnswerInput {

  @Field()
  parentId: string

  @Field()
  name: string

  @Field()
  note: string;

  @Field()
  value: string
}
