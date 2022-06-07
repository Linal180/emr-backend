import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Practice } from 'src/practice/entities/practice.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentMetadata } from './attachmentMetadata.entity';

@Entity({ name: 'DocumentType' })
@ObjectType()
export class DocumentType {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @OneToMany(() => AttachmentMetadata, attachments => attachments.documentType, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [AttachmentMetadata], { nullable: true })
  attachments: AttachmentMetadata[];

  @ManyToOne(() => Practice, practice => practice.documentTypes, { onDelete: 'CASCADE' })
  @Field(type => Practice, { nullable: true })
  practice: Practice;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
