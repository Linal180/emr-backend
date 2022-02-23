import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Practice } from '../entities/practice.entity';

@ObjectType()
export class PracticesPayload extends ResponsePayloadResponse {
    @Field(type => [Practice], { nullable: 'itemsAndList' })
    practices: Practice[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
