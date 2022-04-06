import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientVitals } from '../entities/patientVitals.entity';

@ObjectType()
export class PatientVitalPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patientVital: PatientVitals;

    @Field({ nullable: true })
    response?: ResponsePayload
}
