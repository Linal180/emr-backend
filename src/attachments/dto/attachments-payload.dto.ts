import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Attachment } from '../entities/attachment.entity';

@ObjectType()
export class AttachmentsPayload extends ResponsePayloadResponse {
    @Field(type => [Attachment], { nullable: 'itemsAndList' })
    attachments: Attachment[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}