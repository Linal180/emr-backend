import { Field, ObjectType } from '@nestjs/graphql';
import { Service } from 'src/facilities/entities/services.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from './schedule.entity';


@Entity({ name: 'ScheduleServices' })
@ObjectType()
export class ScheduleServices {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  serviceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  scheduleId: string;
  
  @ManyToOne(() => Service, service => service.scheduleServices)
  @Field(type => Service, { nullable: true })
  service: Service;
  
  @ManyToOne(() => Schedule, schedule => schedule.scheduleServices, {onDelete: "CASCADE"})
  schedule: Schedule;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
