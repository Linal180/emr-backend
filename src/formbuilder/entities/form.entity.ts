import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormElement } from './form-elements.entity';

export enum FormType {
  APPOINTMENT = "Appointment",
  DOCTOR = "Doctor",
  PATIENT = "Patient",
  STAFF = "Staff"
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

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: FormType,
    default: FormType.APPOINTMENT
  })
  @Field(type => FormType)
  type: FormType

  @Column({ nullable: false })
  @Field({ nullable: false })
  facilityId: string;

  @Column({ nullable: false, type: "text" })
  @Field({ nullable: false })
  layout: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSystemForm: boolean;

  @OneToMany(() => FormElement, formElement => formElement.element, { onDelete: "CASCADE" })
  @Field(type => [FormElement], { nullable: true })
  formElements: FormElement[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
