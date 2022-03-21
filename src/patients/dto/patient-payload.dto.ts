import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Patient } from '../entities/patient.entity';

@ObjectType()
export class PatientPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patient: Patient;

    @Field({ nullable: true })
    response?: ResponsePayload
}

