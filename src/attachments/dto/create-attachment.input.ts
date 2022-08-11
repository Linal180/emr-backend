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
  signedAt?: string

  @Field({ nullable: true })
  signedBy?: string

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

  @Field({ nullable: true })
  labOrderNum?: string

  @Field({ nullable: true })
  policyId?: string

  @Field({ nullable: true })
  documentTypeId?: string

  @Field({ nullable: true })
  documentTypeName?: string

  @Field({ nullable: true })
  practiceId?: string

  @Field({ nullable: true })
  documentDate?: string

  @Field({ nullable: true })
  agreementId?: string
}

@InputType()
export class AttachmentInput {
  @Field({ nullable: true })
  labOrderNum?: string;

  @Field({ nullable: true })
  documentTypeId?: string;

  @Field({ nullable: true })
  policyId?: string;

  @Field({ nullable: true })
  documentTypeName?: string;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  documentDate?: string
  
  @Field({ nullable: true })
  signedAt?: string;

  @Field({ nullable: true })
  signedBy?: string;

  @Field({ nullable: true })
  agreementId?: string
}
