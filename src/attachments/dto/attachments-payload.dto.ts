import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentWithPreSignedUrl } from './attachment-payload.dto';

@ObjectType()
export class AttachmentsPayload extends ResponsePayloadResponse {
    @Field(type => [Attachment], { nullable: 'itemsAndList' })
    attachments: Attachment[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}


@ObjectType()
export class AttachmentPayload extends ResponsePayloadResponse {
    @Field(type => Attachment, { nullable: true})
    attachments: Attachment;

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}

@ObjectType()
export class AttachmentWithPreSignedUrlPayload extends ResponsePayloadResponse {
    @Field(type => [AttachmentWithPreSignedUrl], { nullable: true})
    attachmentsWithPreSignedUrl: AttachmentWithPreSignedUrl[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
