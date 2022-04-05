import { Field, ObjectType } from '@nestjs/graphql';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';


@Entity({ name: 'DoctorPatients' })
@ObjectType()
export class DoctorPatient {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  doctorId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  currentProvider: boolean;

  @ManyToOne(() => Doctor, doctor => doctor.doctorPatients)
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;
  
  @ManyToOne(() => Patient, patient => patient.doctorPatients,{onDelete: "CASCADE"})
  patient: Patient;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
