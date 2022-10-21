import { SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HttpExceptionFilterGql } from 'src/exception-filter';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { AttachmentMediaPayload, AttachmentPayload } from '../dto/attachment-payload.dto';
import { AttachmentsPayload } from '../dto/attachments-payload.dto';
import { CreateAttachmentInput } from '../dto/create-attachment.input';
import DocumentTypeInput from '../dto/documentType-input.dto';
import { DocumentTypePayload, DocumentTypesPayload } from '../dto/documentTypes-payload.dto';
import { GetAttachment, GetAttachmentsByLabOrder, GetAttachmentsByPolicyId, GetMedia, RemoveAttachment, UpdateAttachmentInput } from '../dto/update-attachment.input';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentMetadata } from '../entities/attachmentMetadata.entity';
import { DocumentType } from '../entities/documentType.entity';
import { AttachmentsService } from '../services/attachments.service';
import { DocumentTypesService } from '../services/documentType.service';

@Resolver(DocumentType)
export class DocumentTypesResolver {
  constructor(private readonly documentTypeService: DocumentTypesService) { }

  @Query(returns => DocumentTypesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchDocumentTypes')
  async fetchDocumentTypes(@Args('documentTypeInput') documentTypeInput: DocumentTypeInput): Promise<DocumentTypesPayload> {
    const documentTypes = await this.documentTypeService.fetchAllDocumentTypes(documentTypeInput)
    return {
      ...documentTypes,
      response: { status: 200, message: 'Document Types fetched successfully' }
    };
  }

  @Query(returns => DocumentTypesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchDocumentType')
  async fetchDocumentType(@Args('id') id: string): Promise<DocumentTypePayload> {
    const documentType = await this.documentTypeService.fetchDocumentType(id)
    return {
      ...documentType,
      response: { status: 200, message: 'Document Type fetched successfully' }
    };
  }

  @Query(returns => DocumentTypePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchDocumentTypeByName')
  async fetchDocumentTypeByName(@Args('name') name: string): Promise<DocumentTypePayload> {
    const documentType = await this.documentTypeService.fetchDocumentTypeByName(name)
    return {
      ...documentType,
      response: { status: 200, message: 'Document Type fetched successfully' }
    };
  }
}
