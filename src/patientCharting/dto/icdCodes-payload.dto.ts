import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { ICDCodes } from '../entities/icdcodes.entity';
import { SnoMedCodes } from '../entities/snowmedCodes.entity';

@ObjectType()
export class IcdCodesPayload extends ResponsePayloadResponse {
    @Field(type => [ICDCodesWithSnowMedCode], { nullable: 'itemsAndList' })
    icdCodes: ICDCodesWithSnowMedCode[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}

@ObjectType()
export class ICDCodesWithSnowMedCode extends ICDCodes {
    @Field(type=>SnoMedCodes, { nullable: true })
    snoMedCode: SnoMedCodes
}
