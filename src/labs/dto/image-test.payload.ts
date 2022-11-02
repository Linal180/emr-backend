import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { ImagingTest } from "../entities/imagingTest.entity"

@ObjectType()
export class FindAllImagingTestPayload {
  @Field(() => [ImagingTest], { nullable: true })
  imagingTests: ImagingTest[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class ImagingTestPayload {
  @Field(() => ImagingTest, { nullable: true })
  imagingTest: ImagingTest;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}