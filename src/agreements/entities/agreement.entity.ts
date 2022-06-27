import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Practice } from 'src/practice/entities/practice.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { PatientConsent } from 'src/patients/entities/patientConsent.entity';
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientConsentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  //dates

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  //relationships

  @ManyToOne(() => PatientConsent, patientConsent => patientConsent.agreements)
  @Field(() => PatientConsent, { nullable: true })
  patientConsent: PatientConsent;

  @ManyToOne(() => Facility, facility => facility.agreements, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Practice, practice => practice.agreements, { onDelete: 'CASCADE' })
  @Field(type => Practice, { nullable: true })
  practice: Practice;

}
