import { SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpExceptionFilterGql } from 'src/exception-filter';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { AttachmentsService } from './attachments.service';
import { AttachmentMediaPayload, AttachmentPayload } from './dto/attachment-payload.dto';
import { AttachmentsPayload } from './dto/attachments-payload.dto';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { GetAttachment, GetMedia, RemoveAttachment, UpdateAttachmentInput } from './dto/update-attachment.input';

@Resolver('attachments')
@UseFilters(HttpExceptionFilterGql)
export class AttachmentsResolver {
  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Query(returns => AttachmentsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getAttachments')
  async getAttachments(@Args('getAttachment') getAttachment: GetAttachment): Promise<AttachmentsPayload> {
    const attachments = await this.attachmentsService.findAttachmentsById(getAttachment.typeId)
    return {
      attachments,
      response: { status: 200, message: 'Attachments fetched successfully' }
    };
  }

  @Mutation(returns => AttachmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createAttachmentData')
  async createAttachmentData(@Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput) {
    const attachment = await this.attachmentsService.createAttachmentData(createAttachmentInput);
    return {
      attachment,
      response: { status: 200, message: 'Attachment data created successfully' }
    };
  }

  @Mutation(returns => AttachmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeAttachmentData')
  async removeAttachmentData(@Args('removeAttachment') removeAttachment: RemoveAttachment) {
    await this.attachmentsService.removeAttachmentData(removeAttachment.id);
    return {
      response: { status: 200, message: 'Attachment data deleted successfully' }
    };
  }

  @Mutation(returns => AttachmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateAttachmentData')
  async updateAttachmentData(@Args('updateAttachmentInput') updateAttachmentInput: UpdateAttachmentInput) {
    const attachment = await this.attachmentsService.updateAttachmentData(updateAttachmentInput);
    return {
      attachment,
      response: { status: 200, message: 'Attachment data updated successfully' }
    };
  }

  @Query(returns => AttachmentMediaPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getAttachment')
  async getAttachment(@Args('getMedia') getMedia: GetMedia) {
    const preSignedUrl = await this.attachmentsService.getMedia(getMedia.id);
    return {
      preSignedUrl,
      response: { status: 200, message: 'Attachment presigned url fetched successfully' }
    };
  }
}
