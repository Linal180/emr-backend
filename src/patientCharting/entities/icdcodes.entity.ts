import { Field, ObjectType } from '@nestjs/graphql';
import { LabTests } from 'src/labs/entities/labTests.entity';
// import { TestSpecimens } from 'src/labs/entities/testSpecimens.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({nullable: true})
  @Field({nullable: true})
  description: string;

  @Column({nullable: true})
  @Field({nullable: true})
  version: string;

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.ICDCode)
  patientProblems: PatientProblems[];
  
  @ManyToMany(type => LabTests, labTests => labTests.diagnoses)
  @Field((type)=> LabTests, {nullable: true})
  labTests: LabTests[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
