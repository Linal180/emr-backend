import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LabTests } from '../entities/labTests.entity';

@ObjectType()
export class LabTestsPayload extends ResponsePayloadResponse {
    @Field(type => [LabTests], { nullable: 'itemsAndList' })
    labTests: LabTests[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload

}
