import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { PhysicalExam } from "../entities/physicalExam.entity";
//entities

@ObjectType()
export class PhysicalExamPayload {

  @Field(() => PhysicalExam, { nullable: true })
  physicalExam: PhysicalExam;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;
}