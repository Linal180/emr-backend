import { InputType, Field, PartialType } from '@nestjs/graphql';
//entities
import { AttachmentMetadata } from '../entities/attachmentMetadata.entity';
//inputs
import { AttachmentInput } from './create-attachment.input';
import { CreateAttachmentMetaDataInput } from './create-attachment-metaData.input';

@InputType()
export class UpdateAttachmentMetaDataInput extends PartialType(CreateAttachmentMetaDataInput) {
  @Field(() => AttachmentMetadata, { nullable: true })
  attachmentMetaData?: AttachmentMetadata

  @Field(() => AttachmentInput, { nullable: true })
  attachmentInput?: AttachmentInput
}