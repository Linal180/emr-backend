import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Json } from 'aws-sdk/clients/robomaker';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  layout: Json;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  isSystemForm: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
