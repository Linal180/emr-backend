import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Allergies } from '../entities/allergies.entity';

@ObjectType()
export class AllergiesPayload extends ResponsePayloadResponse {
    @Field(type => [Allergies], { nullable: 'itemsAndList' })
    allergies: Allergies[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
