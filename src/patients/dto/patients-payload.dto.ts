import { Field, ObjectType } from '@nestjs/graphql';

import { Patient } from '../entities/patient.entity';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';

@ObjectType()
export class PatientsPayload extends ResponsePayloadResponse {
    @Field(() => [Patient], { nullable: 'itemsAndList' })
    patients: Patient[];

    @Field({ nullable: true })
    facilityId?: string

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}


@ObjectType()
export class DoctorPatientsPayload extends ResponsePayloadResponse {
    @Field(() => [DoctorPatient], { nullable: 'itemsAndList' })
    doctorPatients: DoctorPatient[];

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
