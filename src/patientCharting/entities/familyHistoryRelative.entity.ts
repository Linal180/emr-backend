import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { FamilyHistory } from "./familyHistory.entity";


@Entity({ name: 'FamilyHistoryRelative' })
@ObjectType()
export class FamilyHistoryRelative {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    relativeName: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    onsetAge: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    died: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    notes: string

    @ManyToOne(() => FamilyHistory, familyHistory => familyHistory.familyHistoryRelatives)
    @Field(() => FamilyHistory, { nullable: true })
    familyHistory: FamilyHistory;

    @Column({ nullable: true })
    @Field({ nullable: true })
    familyHistoryId: string;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    updatedAt: string;
}