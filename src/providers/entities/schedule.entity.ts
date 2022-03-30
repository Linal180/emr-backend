import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contact } from './contact.entity';
import { Doctor } from './doctor.entity';
import { ScheduleServices } from './scheduleServices.entity';

@Entity({ name: 'Schedules' })
@ObjectType()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'timestamptz' })
  @Field()
  startAt: string;

  @Column({ type: 'timestamptz' })
  @Field()
  endAt: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  recurringEndDate: Date;

  @Column({nullable: true })
  @Field({nullable: true})
  doctorId: string;

  @Column({nullable: true })
  @Field({nullable: true})
  facilityId: string;

  @ManyToOne(() => Doctor, doctor => doctor.contacts, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Facility, facility => facility.schedule, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;
  
  @OneToMany(() => ScheduleServices, scheduleService => scheduleService.service, { onDelete: "CASCADE"})
  @Field(type => [ScheduleServices], { nullable: true })
  scheduleServices: ScheduleServices[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
