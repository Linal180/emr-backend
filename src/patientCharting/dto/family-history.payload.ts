import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
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

@ObjectType()
export class FamilyHistoriesPayload {
	@Field(() => [FamilyHistory], { nullable: true })
	familyHistories: FamilyHistory[];


    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload

	@Field(() => ResponsePayloadResponse, { nullable: true })
	response?: ResponsePayloadResponse
}