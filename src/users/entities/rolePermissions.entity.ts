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

  @Column({nullable: true, default: true})
  @Field({nullable: true})
  isMutable: boolean

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  @Field(type => Permission, { nullable: true })
  permission: Permission;
  
  @ManyToOne(() => Role, role => role.rolePermissions,{onDelete: "CASCADE"})
  role: Role;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}