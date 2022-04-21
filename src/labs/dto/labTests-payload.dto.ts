import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LabTests } from '../entities/labTests.entity';

@ObjectType()
export class LabTestPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    LabTest: LabTests;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class LabTestsPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    LabTests: LabTests[];

    @Field({ nullable: true })
    response?: ResponsePayload
}
