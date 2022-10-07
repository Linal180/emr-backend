import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayload } from "src/users/dto/response-payload.dto";
//entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";

@ObjectType()
export class FindAllQuestionTemplatesPayload {
  @Field(() => [QuestionTemplate])
  templates: QuestionTemplate[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload;

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload;
}

@ObjectType()
export class QuestionTemplatePayload {
  @Field(() => QuestionTemplate)
  template: QuestionTemplate;

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload;
}