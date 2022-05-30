import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Attachment } from './attachment.entity';

export enum AttachmentMetadataType {
  PROFILE_PICTURE = "Profile Picture",
  DRIVING_LICENSE1 = "Driving License 1",
  DRIVING_LICENSE2 = "Driving License 2",
  INSURANCE_CARD1 = "Insurance Card 1",
  INSURANCE_CARD2 = "Insurance Card 2",
  PROVIDER_UPLOADS = "Provider Uploads",
  SIGNATURE = "Signature",
  LAB_ORDERS = "Lab Orders",
}

registerEnumType(AttachmentMetadataType, {
    name: "AttachmentMetaDataType",
    description: "The type is assigned",
});

@Entity({ name: 'AttachmentMetadata' })
@ObjectType()
export class AttachmentMetadata {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum", enum: AttachmentMetadataType,
  })
  @Field(type => AttachmentMetadataType)
  metadataType: AttachmentMetadataType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  labOrderNum: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  assignedTo: string;

  @Column({nullable: true, default: true})
  @Field({nullable: true})
  pending: boolean

  @Field(() => Attachment, { nullable: true })
  @OneToOne(() => Attachment, (attachment) => attachment.attachmentMetadata, { onDelete:'CASCADE', onUpdate:'CASCADE' })
  attachment: Attachment;

  @Field({ nullable: true })
  attachmentId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
