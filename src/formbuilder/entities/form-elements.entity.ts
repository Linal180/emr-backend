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

  @Column({ nullable: false })
  @Field({ nullable: false })
  placeholder: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  defaultValue: string;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  required: boolean;

  @Column({ nullable: false })
  @Field({ nullable: false })
  errorMsg: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  position: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  tableName: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  columnName: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  fieldId: string;

  @ManyToOne(() => Form, form => form.formElements, {onDelete: "CASCADE"})
  form: Form;

  @ManyToOne(() => Element, element => element.formElement)
  @Field(type => Element, { nullable: true })
  element: Element;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
