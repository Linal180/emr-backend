import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionTemplate } from "./questionTemplate.entity";



@Entity({ name: 'Exercises' })
@ObjectType()
export class Exercises {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    name: string

    @Column({ nullable: true })
    @Field({ nullable: true })
    templateId: string

    @ManyToOne(() => QuestionTemplate, questionTemplate => questionTemplate.exercise)
    @Field(() => QuestionTemplate, { nullable: true })
    template: QuestionTemplate

    @CreateDateColumn({ nullable: true, type: 'timestamptz' })
    @Field({ nullable: true })
    createdAt: string

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    updatedAt: string

}