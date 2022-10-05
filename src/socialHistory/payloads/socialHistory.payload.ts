import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { SocialHistory } from "../entities/socialHistory.entity";

@ObjectType()
export class PatientSocialHistoryPayload {

  @Field(() => SocialHistory, { nullable: true })
  socialHistory: SocialHistory;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;
}