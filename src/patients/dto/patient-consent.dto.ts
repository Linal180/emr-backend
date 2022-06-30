import { Field, ObjectType } from "@nestjs/graphql";

import { PatientConsent } from "../entities/patientConsent.entity";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";

@ObjectType()
export class PatientConsentPayload {
  @Field({ nullable: true })
  patientConsent: PatientConsent;

  @Field({ nullable: true })
  response?: ResponsePayloadResponse
}