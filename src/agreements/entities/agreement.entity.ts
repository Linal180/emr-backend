import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Agreements' })
@ObjectType()
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  body: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  signatureRequired: boolean;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  viewAgreementBeforeAgreeing: boolean;

  @ManyToOne(() => Facility, facility => facility.agreements, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @ManyToOne(() => Practice, practice => practice.agreements, { onDelete: 'CASCADE' })
  @Field(type => Practice, { nullable: true })
  practice: Practice;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
