import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientAllergies } from '../entities/patientAllergies.entity';

@ObjectType()
export class PatientAllergyPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patientAllergy: PatientAllergies;

    @Field({ nullable: true })
    response?: ResponsePayload
}
