import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolePermission } from './rolePermissions.entity';

@Entity({ name: 'Permissions' })
@ObjectType()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})
  name: string

  @Column({nullable: true})
  @Field({nullable: true})
  moduleType: string

  @Column({nullable: true, default: true})
  @Field({nullable: true})
  status: boolean

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission, {onDelete: "CASCADE"})
  @Field(type => [RolePermission], { nullable: true })
  rolePermissions: RolePermission[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}