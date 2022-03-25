import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolePermission } from './rolePermissions.entity';
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
  @Field((type)=> User, {nullable: true})
  users: User[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role, {eager: true})
  @Field((type)=>[RolePermission], {nullable: true})
  rolePermissions: RolePermission[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field({nullable: true})
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field({nullable: true})
  updatedAt: string;

}