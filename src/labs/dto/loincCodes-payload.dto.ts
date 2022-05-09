import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { LoincCodes } from '../entities/loincCodes.entity';


@ObjectType()
export class LoincCodesPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    loincCodes: LoincCodes[];

    @Field({ nullable: true })
    response?: ResponsePayload
}
