import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PatientMedication } from './patientMedication.entity';

@Entity({ name: 'Medications' })
@ObjectType()
export class Medications {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({nullable: true})
  @Field({nullable: true})
  fullName: string

  @Column({nullable: true})
  @Field({nullable: true})
  termType: string

  @Column({nullable: true})
  @Field({nullable: true})
  rxNumber: string

  @OneToMany(() => PatientMedication, patientMedication => patientMedication.medication, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientMedication], { nullable: true })
  patientMedications: PatientMedication[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
