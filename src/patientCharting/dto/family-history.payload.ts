import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { FamilyHistory } from "../entities/familyHistory.entity";


@ObjectType()
export class FamilyHistoryPayload {
	@Field(() => FamilyHistory, { nullable: true })
	familyHistory: FamilyHistory;

	@Field(() => ResponsePayloadResponse, { nullable: true })
	response: ResponsePayloadResponse
}