import { Field, InputType, PickType } from "@nestjs/graphql";
import { SocialDependentAnswerInput } from "./socialDependentAnswer.input";

@InputType()
export class SocialAnswerInput {
  @Field()
  name: string

  @Field()
  note: string;

  @Field()
  value: string

  @Field(() => [SocialDependentAnswerInput])
  socialDependentAnswer: SocialDependentAnswerInput[]

}

@InputType()
export class CreateSocialAnswerInput extends PickType(SocialAnswerInput, ['name', 'note', 'value']) { }

@InputType()
export class UpdateSocialAnswerInput extends CreateSocialAnswerInput {

  @Field({ nullable: true })
  id?: string
}