import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Scribe } from "../entities/scribe.entity";

@ObjectType()
export class ScribePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    scribe: Scribe;

    @Field({ nullable: true })
    response?: ResponsePayload
}