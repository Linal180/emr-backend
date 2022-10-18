import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { CVX } from "../entities/cvx.entity";

@ObjectType()
export class FindAllCvxPayload {
  @Field(() => [CVX], { nullable: true })
  cvxs: CVX[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class CvxPayload {
  @Field(() => CVX, { nullable: true })
  cvx: CVX;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}