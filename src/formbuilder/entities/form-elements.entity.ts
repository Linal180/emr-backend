import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Element } from './element.entity';
import { Form } from './form.entity';

@Entity({ name: 'FormElements' })
@ObjectType()
export class FormElement {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  placeholder: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  defaultValue: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  required: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  errorMsg: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  label: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  columnName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tableName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tableContactType: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  fieldId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  sectionId: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isDeleted: boolean;

  @ManyToOne(() => Form, form => form.formElements, { onDelete: "CASCADE" })
  form: Form;

  @ManyToOne(() => Element, element => element.formElement)
  @Field(() => Element, { nullable: true })
  element: Element;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
