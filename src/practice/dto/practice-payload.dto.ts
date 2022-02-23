import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Practice } from '../entities/practice.entity';

@ObjectType()
export class PracticePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    practice: Practice;

    @Field({ nullable: true })
    response?: ResponsePayload
}
