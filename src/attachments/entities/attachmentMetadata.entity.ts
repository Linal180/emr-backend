import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Attachment } from './attachment.entity';
import { DocumentType } from './documentType.entity';
@Entity({ name: 'AttachmentMetadata' })
@ObjectType()
export class AttachmentMetadata {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => DocumentType, documentType => documentType.attachments, { onDelete: 'CASCADE' })
  @Field(type => DocumentType, { nullable: true })
  documentType: DocumentType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  documentTypeId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  labOrderNum: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  assignedTo: string;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  pending: boolean

  @Field(() => Attachment, { nullable: true })
  @OneToOne(() => Attachment, (attachment) => attachment.attachmentMetadata, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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
