import { Field, InputType, PickType } from "@nestjs/graphql";

@InputType()
export class QuestionAnswersInput {
  @Field()
  name: string

  @Field()
  note: string;

  @Field()
  value: string
}

@InputType()
export class CreateQuestionAnswersInput extends PickType(QuestionAnswersInput, ['name', 'note', 'value']) { }

@InputType()
export class UpdateQuestionAnswersInput extends CreateQuestionAnswersInput {

  @Field({ nullable: true })
  id?: string
}