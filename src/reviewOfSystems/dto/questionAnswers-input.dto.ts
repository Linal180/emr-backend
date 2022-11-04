import { Field, InputType, PickType } from "@nestjs/graphql";
import { SectionQuestions } from "../entities/sectionQuestions.entity";

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

@InputType()
export class SectionQuestionAnswersInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  answerType: string

  @Field({ nullable: true })
  specialId: string

  @Field(() => [String], { nullable: true })
  options?: string[]

  @Field(() => SectionQuestions, { nullable: true })
  question: SectionQuestions
}