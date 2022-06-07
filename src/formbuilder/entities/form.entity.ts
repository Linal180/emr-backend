import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LayoutJSONType } from '../dto/form-payload.dto';
import { FormElement } from './form-elements.entity';
import { UserForms } from './userforms.entity';

export enum FormType {
  APPOINTMENT = "Appointment",
  DOCTOR = "Doctor",
  PATIENT = "Patient",
  STAFF = "Staff",
  TEMPLATE = "Template",
  PRE_DEFINED = "Pre-Defined"
}

registerEnumType(FormType, {
  name: "FormType",
  description: "The form's types",
});

@Entity({ name: 'Forms' })
@ObjectType()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({
    type: "enum",
    enum: FormType,
    default: FormType.APPOINTMENT
  })
  @Field(() => FormType)
  type: FormType

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: false, type: "jsonb" })
  @Field(() => LayoutJSONType, { nullable: false })
  layout: LayoutJSONType;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSystemForm: boolean;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  isActive: boolean;

  @OneToMany(() => FormElement, formElement => formElement.element, { onDelete: "CASCADE" })
  @Field(type => [FormElement], { nullable: true })
  formElements: FormElement[];

  @OneToMany(() => UserForms, formElement => formElement.form)
  @Field(type => [UserForms], { nullable: true })
  userForms: UserForms[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
