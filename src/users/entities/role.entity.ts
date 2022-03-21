import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Permission } from './permissions.entity';
import { User } from './user.entity';


@Entity({ name: 'Roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})  
  role: string

  @Column({nullable: true, default: true})
  @Field({nullable: true})
  customRole: boolean
  
  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @Field(type => [Permission], { nullable: 'itemsAndList' })
  @ManyToMany(type => Permission, permission => permission.roles, { eager: true })
  @JoinTable({ name: 'RolePermission' })
  permissions: Permission[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}