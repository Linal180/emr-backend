import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Service } from '../entities/services.entity';

@ObjectType()
export class ServicesPayload extends ResponsePayloadResponse {
    @Field(type => [Service], { nullable: 'itemsAndList' })
    services: Service[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
