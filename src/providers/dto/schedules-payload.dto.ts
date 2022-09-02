import { ObjectType, Field } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Schedule } from '../entities/schedule.entity';

@ObjectType()
export class SchedulesPayload extends ResponsePayloadResponse {
    @Field(type => [Schedule], { nullable: 'itemsAndList' })
    schedules: Schedule[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
