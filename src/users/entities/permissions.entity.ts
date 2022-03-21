import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';


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

  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}