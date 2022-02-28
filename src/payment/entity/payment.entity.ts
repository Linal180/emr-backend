import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';



@Entity({name: 'Transactions'})
@ObjectType()
export class Transactions {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column({nullable: false})
    @Field({nullable: false})
    transactionId: string;

    @OneToMany(() => Patient, patient => patient.id)
    patients: Patient[];

    @OneToMany(() => Doctor, doctor => doctor.id)
    doctors: Doctor[];

    @OneToMany(() => Facility, facility => facility.id)
    facilities: Facility[];

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    createdAt: string;
  
    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    updatedAt: string;

}