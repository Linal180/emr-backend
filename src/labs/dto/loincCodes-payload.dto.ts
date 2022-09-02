import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LoincCodes } from '../entities/loincCodes.entity';


@ObjectType()
export class LoincCodesPayload extends ResponsePayloadResponse {
    @Field(type => [LoincCodes], { nullable: true })
    loincCodes: LoincCodes[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
