import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
