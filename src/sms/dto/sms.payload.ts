import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { Any } from "typeorm";


@ObjectType()
export class SmsPayload {
    @Field(() => String, { nullable: true })
    sms: string;

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}