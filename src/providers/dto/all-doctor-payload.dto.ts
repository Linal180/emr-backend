import { ObjectType, Field } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Doctor } from '../entities/doctor.entity';

@ObjectType()
export class AllDoctorPayload extends ResponsePayloadResponse {
    @Field(type => [Doctor], { nullable: 'itemsAndList' })
    doctors: Doctor[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
