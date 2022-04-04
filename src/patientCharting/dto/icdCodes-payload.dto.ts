import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { ICDCodes } from '../entities/icdcodes.entity';

@ObjectType()
export class IcdCodesPayload extends ResponsePayloadResponse {
    @Field(type => [ICDCodes], { nullable: 'itemsAndList' })
    icdCodes: ICDCodes[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
