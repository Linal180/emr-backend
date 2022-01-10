import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity({ name: 'Contacts' })
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

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
  pager: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @ManyToOne(() => Facility, facility => facility.contacts, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  faciltiy: Facility;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
