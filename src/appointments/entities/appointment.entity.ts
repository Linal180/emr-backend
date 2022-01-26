import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'Appointments' })
@ObjectType()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cliaIdNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  federalTaxId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  revenueCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })  
  color: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tamxonomyCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insurancePlanType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timeZone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mammographyCertificationNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  npi: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
