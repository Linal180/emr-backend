import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity({ name: 'Schedules' })
@ObjectType()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'timestamptz' })
  @Field()
  startAt: Date;

  @Column({ type: 'timestamptz' })
  @Field()
  endAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  recurringEndDate: Date;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
