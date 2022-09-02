import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LabTests } from '../entities/labTests.entity';

@ObjectType()
export class LabTestPayload extends ResponsePayloadResponse {
    @Field(() => LabTests, { nullable: true })
    labTest: LabTests;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class LabResultPayload extends ResponsePayloadResponse {
    @Field(() => Patient, { nullable: true })
    patientInfo: Patient;

    @Field(() => Facility, { nullable: true })
    facilityInfo: Facility;

    @Field(() => Doctor, { nullable: true })
    doctor: Doctor;

    @Field(() => [LabTests], { nullable: true })
    labTests: LabTests[];

    @Field({ nullable: true })
    response?: ResponsePayload
}
