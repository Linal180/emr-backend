import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Form } from '../entities/form.entity';

@ObjectType()
export class FormsPayload extends ResponsePayloadResponse {
    @Field(type => [Form], { nullable: 'itemsAndList' })
    forms: Form[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
