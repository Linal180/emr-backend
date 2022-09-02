import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Practice } from 'src/practice/entities/practice.entity';
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
  @Field(() => [AttachmentMetadata], { nullable: true })
  attachments: AttachmentMetadata[];

  @ManyToOne(() => Practice, practice => practice.documentTypes, { onDelete: 'CASCADE' })
  @Field(() => Practice, { nullable: true })
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
