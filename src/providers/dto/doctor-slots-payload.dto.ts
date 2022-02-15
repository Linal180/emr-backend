import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Slots } from './slots-payload.dto';

@ObjectType()
export class DoctorSlotsPayload extends ResponsePayloadResponse {
    @Field(type=> [Slots], { nullable: true })
    slots: Slots[];

    @Field({ nullable: true })
    response?: ResponsePayload
}