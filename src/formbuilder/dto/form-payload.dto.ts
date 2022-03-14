import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Form } from '../entities/form.entity';

@ObjectType()
export class FormPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    form: Form;

    @Field({ nullable: true })
    response?: ResponsePayload
}
