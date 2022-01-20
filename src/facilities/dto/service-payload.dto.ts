import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Service } from '../entities/services.entity';

@ObjectType()
export class ServicePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    service: Service;

    @Field({ nullable: true })
    response?: ResponsePayload
}
