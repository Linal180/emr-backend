import { ObjectType, Field } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Staff } from '../entities/staff.entity';

@ObjectType()
export class AllStaffPayload extends ResponsePayloadResponse {
    @Field(type => [Staff], { nullable: 'itemsAndList' })
    allstaff: Staff[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
