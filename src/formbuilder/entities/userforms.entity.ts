import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormElement } from './form-elements.entity';
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

  @OneToMany(() => FormElement, formElement => formElement.form)
  formElements: FormElement[];

  @Field(() => [UsersFormsElements], { nullable: true })
  @OneToMany(() => UsersFormsElements, userElement => userElement)
  userFormElements: UsersFormsElements[];

}
