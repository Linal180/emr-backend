import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity({ name: 'Employers' })
@ObjectType()
export class Employer {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  usualOccupation: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @ManyToOne(() => Patient, patient => patient.contacts, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
