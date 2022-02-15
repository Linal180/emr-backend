import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { ScheduleServices } from 'src/providers/entities/scheduleServices.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Facility } from './facility.entity';

export enum ServiceType {
  INTERNAL = "internal",
  EXTERNAL = "external"
}

registerEnumType(ServiceType, {
  name: "ServiceType",
  description: "The service type assigned type",
});

@Entity({ name: 'Services' })
@ObjectType()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: ServiceType,
    default: ServiceType.EXTERNAL
  })
  @Field(type => ServiceType)
  serviceType: ServiceType;

  @Column({ nullable: false })
  @Field({ nullable: false })
  duration: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  price: string;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @ManyToOne(() => Facility, facility => facility.contacts, { onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @OneToMany(() => Appointment, appointment => appointment.appointmentType, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  appointments: Appointment[];

  @OneToMany(() => ScheduleServices, scheduleService => scheduleService.schedule, { onDelete: "CASCADE"})
  @Field(type => [ScheduleServices], { nullable: true })
  scheduleServices: ScheduleServices[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
