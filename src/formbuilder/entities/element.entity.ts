import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormElement } from './form-elements.entity';

export enum ElementType {
  TEXT = "text",
  NUMBER = "number",
  DROPDOWN = "dropdown",
  RADIO = "radio",
  DATE = "date",
  FILE = "file",
  TIME = 'time',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  TEL = 'tel',
  EMAIL = 'email',
  COLOR = 'color',
  IMAGE = 'image',
  MONTH = 'month',
  PASSWORD = 'password',
  URL = 'url',
  WEEK = 'week',
}

registerEnumType(ElementType, {
  name: "ElementType",
  description: "The form's element types",
});

@Entity({ name: 'Elements' })
@ObjectType()
export class Element {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: ElementType,
    default: ElementType.TEXT
  })
  @Field(type => ElementType)
  type: ElementType

  @OneToMany(() => FormElement, formElement => formElement.form)
  formElement: FormElement[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
