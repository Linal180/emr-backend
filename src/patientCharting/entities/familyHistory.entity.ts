import { Field, ObjectType } from "@nestjs/graphql";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { FamilyHistoryRelative } from "./familyHistoryRelative.entity";


@Entity({ name: 'FamilyHistory' })
@ObjectType()
export class FamilyHistory {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    name: string

    @OneToMany(() => FamilyHistoryRelative, familyHistoryRelative => familyHistoryRelative.familyHistory, { onDelete: "CASCADE" })
    @Field(() => [FamilyHistoryRelative], { nullable: true })
    familyHistoryRelatives: FamilyHistoryRelative[];

    @ManyToOne(() => Patient, patient => patient.familyHistory)
    @Field(() => Patient, { nullable: true })
    patient: Patient;

    @Column({ nullable: true })
    @Field({ nullable: true })
    patientId: string;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    updatedAt: string;
}