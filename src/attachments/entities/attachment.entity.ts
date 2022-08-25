import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AttachmentMetadata } from './attachmentMetadata.entity';

export enum AttachmentType {
  PATIENT = "patient",
  DOCTOR = "doctor",
  lab = "lab",
  FORM_BUILDER = 'form builder',
  SUPER_ADMIN = 'super-admin',
  STAFF = 'staff',
  PRACTICE = 'practice'
}

registerEnumType(AttachmentType, {
  name: "AttachmentType",
  description: "The type is assigned",
});

@Entity({ name: 'Attachments' })
@ObjectType()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum", enum: AttachmentType, default: AttachmentType.PATIENT
  })
  @Field(type => AttachmentType)
  type: AttachmentType;

  @Column()
  @Field()
  typeId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  key: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  attachmentName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  parentAttachmentId: string;

  @Field(() => AttachmentMetadata, { nullable: true, })
  @OneToOne(() => AttachmentMetadata, (attachmentMetadata) => attachmentMetadata.attachment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  attachmentMetadata: AttachmentMetadata;

  @Field({ nullable: true })
  attachmentMetadataId: string;

  @Field(() => Attachment, { nullable: true })
  childAttachment: Attachment

  @Field({ nullable: true })
  preSignedUrl: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
