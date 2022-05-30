import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @ManyToOne(() => Permission, permission => permission.rolePermissions, { eager: true })
  @Field(type => Permission, { nullable: true })
  permission: Permission;

  @Column({ nullable: true })
  @Field({ nullable: true })
  permissionId: string

  @ManyToOne(() => Role, role => role.rolePermissions, { onDelete: "CASCADE" })
  @Field(type => Role, { nullable: true })
  role: Role;

  @Column({ nullable: true })
  @Field({ nullable: true })
  roleId: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
