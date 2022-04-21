import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//user import
import { LayoutJSONType } from "../dto/form-payload.dto";
//entity
@Entity({ name: 'FormTemplate' })
@ObjectType()
export class FormTemplate {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column({ nullable: false })
    @Field({ nullable: false })
    name: string;

    @Column({ nullable: false, type: "jsonb" })
    @Field(() => LayoutJSONType, { nullable: false })
    layout: LayoutJSONType;
}