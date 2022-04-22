import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientAllergies } from '../entities/patientAllergies.entity';

@ObjectType()
export class PatientAllergiesPayload extends ResponsePayloadResponse {
    @Field(type => [PatientAllergies], { nullable: 'itemsAndList' })
    patientAllergies: PatientAllergies[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
