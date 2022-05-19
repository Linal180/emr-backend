import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Observations } from '../entities/observations.entity';

@ObjectType()
export class LabTestObservationPayload extends ResponsePayloadResponse {
    @Field(()=> Observations, { nullable: true })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    labTestObservation: Observations;

    @Field({ nullable: true })
    response?: ResponsePayload
}
