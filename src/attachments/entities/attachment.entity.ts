import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum AttachmentType {
  PATIENT = "patient",
  DOCTOR = "doctor",
  lab = "lab",
  FORM_BUILDER = 'form builder',
  SUPER_ADMIN = 'super-admin',
  STAFF = 'staff'
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
  providerName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  comments: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  signedByProvider: boolean ;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
