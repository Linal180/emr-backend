import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { PatientIllnessHistory } from "../entities/patientIllnessHistory.entity";
//entities

@ObjectType()
export class PatientIllnessHistoryPayload {

  @Field(() => PatientIllnessHistory, { nullable: true })
  patientIllnessHistory: PatientIllnessHistory;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;
}