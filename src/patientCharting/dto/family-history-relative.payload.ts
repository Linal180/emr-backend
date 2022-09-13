import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { FamilyHistoryRelative } from "../entities/familyHistoryRelative.entity";


@ObjectType()
export class FamilyHistoryRelativePayload {
	@Field(() => FamilyHistoryRelative, { nullable: true })
	familyHistoryRelative: FamilyHistoryRelative;

	@Field(() => ResponsePayloadResponse, { nullable: true })
	response: ResponsePayloadResponse
}