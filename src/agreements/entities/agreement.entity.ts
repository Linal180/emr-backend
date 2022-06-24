import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
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
}
