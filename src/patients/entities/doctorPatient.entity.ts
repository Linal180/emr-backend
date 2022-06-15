import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';

export enum DoctorPatientRelationType {
  PREFERRED_PROVIDER = "Preferred provider in practice",
  BACKUP_PROVIDER = "Backup provider in practice",
  PRIMARY_PROVIDER = "Primary care provider",
  REFERRING_PROVIDER = "Referring provider",
  ORDERING_PROVIDER = 'Ordering provider',
  OTHER_PROVIDER = "Other provider"
}

registerEnumType(DoctorPatientRelationType, {
  name: "DoctorPatientRelationType",
  description: "The relationship of patient with doctor",
});

@Entity({ name: 'DoctorPatients' })
@ObjectType()
export class DoctorPatient {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  currentProvider: boolean;

  @ManyToOne(() => Doctor, doctor => doctor.doctorPatients)
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.doctorPatients, { onDelete: "CASCADE" })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  otherRelation: string;

  @Column({
    type: "enum",
    enum: DoctorPatientRelationType,
    default: DoctorPatientRelationType.PRIMARY_PROVIDER
  })
  @Field(() => DoctorPatientRelationType, { nullable: true })
  relation: DoctorPatientRelationType
}
