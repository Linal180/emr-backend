import { ObjectType, Field } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Facility } from '../entities/facility.entity';

@ObjectType()
export class FacilityPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    facility: Facility;

    @Field({ nullable: true })
    response?: ResponsePayload
}
