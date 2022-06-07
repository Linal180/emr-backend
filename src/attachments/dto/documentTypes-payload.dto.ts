import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { DocumentType } from '../entities/documentType.entity';

@ObjectType()
export class DocumentTypesPayload extends ResponsePayloadResponse {
    @Field(type => [DocumentType], { nullable: 'itemsAndList' })
    documentTypes: DocumentType[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}


@ObjectType()
export class DocumentTypePayload extends ResponsePayloadResponse {
    @Field(type => DocumentType, { nullable: true})
    documentType: DocumentType;

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
