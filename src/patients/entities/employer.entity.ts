import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  zipCode: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string

  @ManyToOne(() => Patient, patient => patient.contacts, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
