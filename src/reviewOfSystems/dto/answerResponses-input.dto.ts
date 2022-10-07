import { Field, InputType, PickType } from "@nestjs/graphql";

@InputType()
export class AnswerResponsesInput {
  @Field()
  answerId: string

  @Field({ nullable: true })
  note?: string;

  @Field({ nullable: true })
  value?: string
}

@InputType()
export class CreateAnswerResponsesInput extends PickType(AnswerResponsesInput, ["answerId", 'note', 'value']) { }

@InputType()
export class UpdateAnswerResponsesInput extends CreateAnswerResponsesInput {

  @Field({ nullable: true })
  id?: string
}