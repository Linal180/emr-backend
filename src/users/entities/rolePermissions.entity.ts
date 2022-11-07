import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
//entities
import { Permission } from './permissions.entity';
import { Role } from './role.entity';

@Entity({ name: 'RolePermissions' })
@ObjectType()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true, default: true })
  @Field({ nullable: true })
  isMutable: boolean

  //relationships

  @ManyToOne(() => Permission, permission => permission.rolePermissions, { eager: true })
  @Field(() => Permission, { nullable: true })
  permission: Permission;

  @ManyToOne(() => Role, role => role.rolePermissions, { onDelete: "CASCADE" })
  @Field(() => Role, { nullable: true })
  role: Role;

  //relationship columns

  @Column({ nullable: true })
  @Field({ nullable: true })
  roleId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  permissionId: string

  //dates

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
