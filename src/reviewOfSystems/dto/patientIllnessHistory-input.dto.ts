import { Field, InputType } from "@nestjs/graphql";
import { SocialAnswerInput } from "src/socialHistory/inputs/socialAnswer.inputs";
import { AnswerResponsesInput } from "./answerResponses-input.dto";
import { QuestionAnswersInput } from "./questionAnswers-input.dto";

@InputType()
export class PatientIllnessHistoryInput {

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId: string;

}

@InputType()
export class CreatePatientIllnessHistoryInput {

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId: string;

  @Field(() => [String], { nullable: true })
  templateIds: string[];

  @Field(() => [AnswerResponsesInput])
  answerResponses: AnswerResponsesInput[]

}