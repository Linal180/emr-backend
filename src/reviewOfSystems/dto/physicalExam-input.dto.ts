import { Field, InputType } from "@nestjs/graphql";
import { AnswerResponsesInput } from "./answerResponses-input.dto";

@InputType()
export class PhysicalExamInput {

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId: string;

}

@InputType()
export class CreatePhysicalExamInput {

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