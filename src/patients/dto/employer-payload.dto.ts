import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Employer } from '../entities/employer.entity';

@ObjectType()
export class EmployerPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    employer: Employer;

    @Field({ nullable: true })
    response?: ResponsePayload
}
