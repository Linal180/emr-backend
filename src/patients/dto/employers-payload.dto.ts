import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Employer } from '../entities/employer.entity';

@ObjectType()
export class EmployersPayload extends ResponsePayloadResponse {
    @Field(type => [Employer], { nullable: 'itemsAndList' })
    employer: Employer[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
