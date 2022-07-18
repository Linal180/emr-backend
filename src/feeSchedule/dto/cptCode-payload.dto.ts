import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { CPTCodes } from "../entities/cptCode.entity";

@ObjectType()
export class AllCPTCodePayload {
  
  @Field(() => [CPTCodes], { nullable: 'itemsAndList' })
  cptCodes: CPTCodes[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class CPTCodePayload {

  @Field(() => CPTCodes, { nullable: true })
  cptCode: CPTCodes

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}