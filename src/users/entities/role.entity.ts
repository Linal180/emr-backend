import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum UserRole {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  DOCTOR = "doctor",
  DOCTOR_ASSISTANT = "doctor-assistant",
  NURSE_PRACTITIONER = "nurse-practitioner",
  OFFICE_MANAGER = "office-manager",
  PATIENT = "patient",
  NURSE = "nurse",
  BILLING = "billing",
  STAFF = "staff"
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "The user role assigned",
});

@Entity({ name: 'Roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ADMIN
  })
  @Field(type => UserRole)
  role: UserRole

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}