import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}