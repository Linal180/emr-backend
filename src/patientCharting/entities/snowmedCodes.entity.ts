import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PatientProblems } from './patientProblems.entity';

@Entity({ name: 'SnoMedCodes' })
@ObjectType()
export class SnoMedCodes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})
  recordId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  effectiveTime: string;

  @Column({nullable: true})
  @Field({nullable: true})
  active: string;

  @Column({nullable: true})
  @Field({nullable: true})
  moduleId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  refsetId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  referencedComponentId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapGroup: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapPriority: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapRule: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapAdvice: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapTarget: string;

  @Column({nullable: true})
  @Field({nullable: true})
  correlationId: string;

  @Column({nullable: true})
  @Field({nullable: true})
  mapCategoryId: string;

  @Field(() => [PatientProblems], { nullable: true })
  @OneToMany(() => PatientProblems, patientProblems => patientProblems.snowMedCode, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  patientProblem: PatientProblems[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
