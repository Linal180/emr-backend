import { Field, InputType } from "@nestjs/graphql";
import { AnswerResponsesInput } from "./answerResponses-input.dto";

@InputType()
export class ReviewOfSystemInput {

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId: string;

}

@InputType()
export class CreateReviewOfSystemInput {

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId: string;

  @Field(() => [AnswerResponsesInput])
  answerResponses: AnswerResponsesInput[]

}