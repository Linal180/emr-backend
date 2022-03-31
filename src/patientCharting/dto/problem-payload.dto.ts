import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { PatientProblems } from '../entities/patientProblems.entity';

@ObjectType()
export class PatientProblemPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patientProblem: PatientProblems;

    @Field({ nullable: true })
    response?: ResponsePayload
}
