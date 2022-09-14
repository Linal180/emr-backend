import { Field, ObjectType } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'SurgicalHistory' })
@ObjectType()
export class SurgicalHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  codeType: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  surgeryDate: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  @ManyToOne(() => Patient, patient => patient.surgicalHistories, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
