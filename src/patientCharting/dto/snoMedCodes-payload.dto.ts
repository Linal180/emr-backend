import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { SnoMedCodes } from '../entities/snowMedCodes.entity';

@ObjectType()
export class snoMedCodesPayload extends ResponsePayloadResponse {
    @Field(type => [SnoMedCodes], { nullable: 'itemsAndList' })
    snoMedCodes: SnoMedCodes[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
