import { Field, ObjectType } from "@nestjs/graphql";
import { UserLogs } from "../entities/user-logs.entity.logs";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";

@ObjectType()
export class UserLogsPayload {
    @Field(() => [UserLogs], { nullable: 'itemsAndList' })
    userLogs: UserLogs[];

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload;

    @Field()
    response?: ResponsePayloadResponse
}