import { ManyToMany, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserToRole } from './user-role.entity';

export enum UserRole {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  DOCTOR = "doctor",
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

  @OneToMany(() => UserToRole, userToRole => userToRole.role, { onDelete: 'CASCADE' })
  users: UserToRole[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}