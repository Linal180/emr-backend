import { InputType, Field } from '@nestjs/graphql';
import { AttachmentType } from '../../attachments/entities/attachment.entity';
import { AttachmentMetadataType } from '../entities/attachmentMetadata.entity';
@InputType()
export class CreateAttachmentMetaDataInput {
  @Field(type => AttachmentMetadataType, { description: 'enum type for module type - Upload Media' })
  metadataType: AttachmentMetadataType;

  @Field({ nullable: true })
  labOrderNum?: string

  @Field({ nullable: true })
  assignedTo?: string
  
  @Field({ nullable: true })
  pending?: boolean
}
