import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Medications } from '../entities/medications.entity';
import { PatientMedication } from '../entities/patientMedication.entity';

@ObjectType()
export class PatientMedicationPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patientMedication: PatientMedication;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class PatientMedicationsPayload extends ResponsePayloadResponse {
    @Field(() => [PatientMedication], { nullable: true })
    patientMedications: PatientMedication[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}

@ObjectType()
export class MedicationsPayload extends ResponsePayloadResponse {
    @Field(() => [Medications], { nullable: true })
    medications: Medications[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
