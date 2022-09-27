import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
// import { TestSpecimens } from 'src/labs/entities/testSpecimens.entity';
import { LabTests } from 'src/labs/entities/labTests.entity';
import { FamilyHistory } from './familyHistory.entity';
import { PatientProblems } from './patientProblems.entity';

@Entity({ name: 'ICDCode' })
@ObjectType()
export class ICDCodes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  version: string;

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.ICDCode)
  patientProblems: PatientProblems[];

  @OneToMany(() => FamilyHistory, familyHistory => familyHistory.icdCode)
  familyHistory: FamilyHistory[];

  @ManyToMany(() => LabTests, labTests => labTests.diagnoses)
  labTests: LabTests[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
