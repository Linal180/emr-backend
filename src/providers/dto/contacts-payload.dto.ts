import { ObjectType, Field } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Contact } from '../entities/contact.entity';

@ObjectType()
export class ContactsPayload extends ResponsePayloadResponse {
    @Field(type => [Contact], { nullable: 'itemsAndList' })
    contacts: Contact[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
