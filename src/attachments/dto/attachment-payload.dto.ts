import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentsPayload } from './attachments-payload.dto';

@ObjectType()
export class AttachmentPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    attachment: Attachment;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class AttachmentMediaPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    preSignedUrl: string;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class AttachmentWithPreSignedUrl extends Attachment {
    @Field({ nullable: true })
    preSignedUrl: string;
}

