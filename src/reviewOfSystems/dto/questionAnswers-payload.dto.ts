import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayload } from "src/users/dto/response-payload.dto";
import { QuestionAnswers } from "../entities/questionAnswers.entity";
//entities

@ObjectType()
export class QuestionAnswersPayload {
  @Field(() => [QuestionAnswers], { nullable: 'itemsAndList' })
  answers: QuestionAnswers[];

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload;
}