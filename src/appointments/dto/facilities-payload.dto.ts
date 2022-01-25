import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';

@ObjectType()
export class FacilitiesPayload extends ResponsePayloadResponse {
    // @Field(type => [Facility], { nullable: 'itemsAndList' })
    // facility: Facility[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
