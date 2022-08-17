import { InputType, Field, PartialType } from '@nestjs/graphql';
@InputType()
export class CreateAttachmentMetaDataInput {
  @Field({ nullable: true })
  assignedTo?: string

  @Field({ nullable: true })
  pending?: boolean

  @Field({ nullable: true })
  labOrderNum?: string

  @Field({ nullable: true })
  policyId?: string

  @Field({ nullable: true })
  documentTypeId?: string

  @Field({ nullable: true })
  documentTypeName?: string;

  @Field({ nullable: true })
  practiceId?: string;
}
