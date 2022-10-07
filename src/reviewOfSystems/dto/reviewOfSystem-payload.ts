import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { ReviewOfSystem } from "../entities/reviewOfSystem.entity";
//entities

@ObjectType()
export class ReviewOfSystemPayload {

  @Field(() => ReviewOfSystem, { nullable: true })
  reviewOfSystem: ReviewOfSystem;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;
}