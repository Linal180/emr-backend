import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ArrayOfStringsType } from '../dto/userFormElements.dto';
import { UserForms } from './userforms.entity';

@Entity({ name: 'UsersFormsElements' })
@ObjectType()
export class UsersFormsElements {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    UsersFormsId: string;

    @Column()
    @Field()
    FormsElementsId: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    value: string;

    @Column({ array: false, type: 'jsonb', nullable: true })
    @Field(() => [ArrayOfStringsType])
    arrayOfObjects: ArrayOfStringsType[];

    @Column({ array: false, type: 'jsonb', nullable: false })
    @Field(() => [String])
    arrayOfStrings: string[]

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    @Field({ nullable: true })
    updatedAt: string;

    @Field(() => UserForms, { nullable: true })
    @ManyToOne(() => UserForms, userElement => userElement)
    userForm: UserForms;

}
