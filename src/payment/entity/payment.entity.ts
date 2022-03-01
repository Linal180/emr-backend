import { Field, ObjectType } from "@nestjs/graphql";
import { Facility } from "src/facilities/entities/facility.entity";
import { Doctor } from "src/providers/entities/doctor.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "../../patients/entities/patient.entity";
import { Appointment } from "../../appointments/entities/appointment.entity";

@Entity({ name: "Transactions" })
@ObjectType()
export class Transactions {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  transactionId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  patientId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  doctorId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  facilityId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  appointmentId: string;

  @OneToMany(() => Patient, (patient) => patient.id)
  @Field(() => [Patient], { nullable: true })
  patient: Patient[];

  @OneToMany(() => Doctor, (doctor) => doctor.id)
  @Field(() => [Doctor], { nullable: true })
  doctor: Doctor[];

  @OneToMany(() => Facility, (facility) => facility.id)
  @Field(() => [Facility], { nullable: true })
  facility: Facility[];

  @OneToOne(() => Appointment)
  @JoinTable()
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;

  @CreateDateColumn({ type: "timestamptz", nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
