import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Facility } from '../entities/facility.entity';

@ObjectType()
export class FacilitiesPayload extends ResponsePayloadResponse {
    @Field(type => [Facility], { nullable: 'itemsAndList' })
    facilities: Facility[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
