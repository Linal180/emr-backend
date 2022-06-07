import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";


@Entity({ name: 'Contract' })
@ObjectType()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    contractNumber: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    organizationName: string;

    @Field(() => Appointment, { nullable: true })
    @OneToOne(() => Appointment, (appointment) => appointment.contract)
    @JoinColumn()
    appointment: Appointment;
}