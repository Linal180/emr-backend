import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Patient } from '../entities/patient.entity';

@ObjectType()
export class PatientPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    patient: Patient;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class PatientProviderPayload extends ResponsePayloadResponse {
    @Field(() => [DoctorPatient], { nullable: true })
    providers: DoctorPatient[];

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class PatientDoctorPayload extends ResponsePayloadResponse {
    @Field(() => DoctorPatient, { nullable: true })
    provider: DoctorPatient;

    @Field({ nullable: true })
    response?: ResponsePayload
}