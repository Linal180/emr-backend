import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LabTests } from '../entities/labTests.entity';

@ObjectType()
export class LabTestPayload extends ResponsePayloadResponse {
    @Field(()=> LabTests, { nullable: true })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    labTest: LabTests;

    @Field({ nullable: true })
    response?: ResponsePayload
}
