import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Facility } from "src/facilities/entities/facility.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";


@Entity({ name: 'Room' })
@ObjectType()
export class Room {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  number: string;

  //relationship fields

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  //relationship 

  @ManyToOne(() => Facility, facility => facility.rooms)
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @OneToMany(() => Appointment, appointment => appointment.room)
  @Field(() => [Appointment], { nullable: true })
  appointment: Appointment[];

  //dates

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}