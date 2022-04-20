import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Form } from './form.entity';
import { UsersFormsElements } from './userFormElements.entity';

@Entity({ name: 'UsersForms' })
@ObjectType()
export class UserForms {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  PatientId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  DoctorId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  StaffId: string

  @Column({ nullable: false })
  @Field({ nullable: false })
  FormId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  SubmitterId: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  @ManyToOne(() => Form, form => form)
  @Field(() => Form, { nullable: true })
  form: Form;

  @Field(() => [UsersFormsElements], { nullable: true })
  @OneToMany(() => UsersFormsElements, userElement => userElement)
  userFormElements: UsersFormsElements[];

}
