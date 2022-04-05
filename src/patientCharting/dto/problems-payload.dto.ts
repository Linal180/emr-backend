import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientProblems } from '../entities/patientProblems.entity';

@ObjectType()
export class PatientProblemsPayload extends ResponsePayloadResponse {
    @Field(type => [PatientProblems], { nullable: 'itemsAndList' })
    patientProblems: PatientProblems[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
