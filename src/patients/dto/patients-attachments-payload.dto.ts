import { Field, ObjectType } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';

@ObjectType()
export class PatientAttachmentsPayload extends ResponsePayloadResponse {
    @Field(type => [Attachment], { nullable: 'itemsAndList' })
    attachments: Attachment[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
