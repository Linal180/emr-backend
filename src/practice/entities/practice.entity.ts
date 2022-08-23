import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Staff } from 'src/providers/entities/staff.entity';
import { Taxonomy } from 'src/facilities/entities/taxonomy.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Agreement } from 'src/agreements/entities/agreement.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { FeeSchedule } from 'src/feeSchedule/entities/feeSchedule.entity';
import { DocumentType } from 'src/attachments/entities/documentType.entity';

@Entity({ name: 'Practice' })
@ObjectType()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  npi: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ein: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  upin: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicare: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicaid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  champus: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxonomyCodeId: string;

  @Field({ nullable: true })
  taxonomyCode: Taxonomy;

  @Column({ type: "boolean", default: true })
  @Field(() => Boolean, { nullable: true })
  active: boolean;

  //facilities

  @OneToMany(() => Facility, facility => facility.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Facility], { nullable: true })
  facilities: Facility[];

  @OneToMany(() => Agreement, agreement => agreement.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Agreement], { nullable: true })
  agreements: Agreement[];

  @OneToMany(() => DocumentType, documentType => documentType.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [DocumentType], { nullable: true })
  documentTypes: DocumentType[];

  @OneToMany(() => Staff, staff => staff.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [Staff], { nullable: true })
  staff: Staff[];

  @OneToMany(() => FeeSchedule, feeSchedule => feeSchedule.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [FeeSchedule], { nullable: true })
  feeSchedules: FeeSchedule[];

  //fields

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
