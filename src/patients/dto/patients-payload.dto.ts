import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Patient } from '../entities/patient.entity';

@ObjectType()
export class PatientsPayload extends ResponsePayloadResponse {
    @Field(type => [Patient], { nullable: 'itemsAndList' })
    patients: Patient[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
