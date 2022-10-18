import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { NDC } from "../entities/ndc.entity";

@ObjectType()
export class FindAllNdcPayload {
  @Field(() => [NDC], { nullable: true })
  ndcs: NDC[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class NdcPayload {
  @Field(() => NDC, { nullable: true })
  ndcCode: NDC;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}