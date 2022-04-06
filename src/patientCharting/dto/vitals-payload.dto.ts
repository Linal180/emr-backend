import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientVitals } from '../entities/patientVitals.entity';

@ObjectType()
export class PatientVitalsPayload extends ResponsePayloadResponse {
    @Field(type => [PatientVitals], { nullable: 'itemsAndList' })
    patientVitals: PatientVitals[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
