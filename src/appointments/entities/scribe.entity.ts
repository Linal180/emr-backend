import { Field, ObjectType } from "@nestjs/graphql";
import { Doctor } from "src/providers/entities/doctor.entity";
import { Staff } from "src/providers/entities/staff.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";


@Entity({ name: 'Scribe' })
@ObjectType()
export class Scribe {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    userType: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    userId: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    lastName: string

    @Column({ nullable: true, default: false })
    @Field({ nullable: true })
    isScribed: boolean

    @Field(() => Appointment, { nullable: true })
    @OneToOne(() => Appointment, (appointment) => appointment.contract)
    @JoinColumn()
    appointment: Appointment;
}