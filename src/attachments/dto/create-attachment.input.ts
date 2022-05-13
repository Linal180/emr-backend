import { InputType, Field } from '@nestjs/graphql';
import { AttachmentType } from '../../attachments/entities/attachment.entity';
@InputType()
export class CreateAttachmentInput {
  @Field(type => AttachmentType, { description: 'enum type for module type - Upload Media' })
  type: AttachmentType;

  @Field()
  typeId: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subTitle?: string
  
  @Field({ nullable: true })
  providerName?: string
    
  @Field({ nullable: true })
  attachmentName?: string

  @Field({ nullable: true })
  comments?: string

  @Field({ nullable: true })
  signedByProvider?: boolean

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  url?: string;
}
