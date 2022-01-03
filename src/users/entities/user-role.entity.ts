import { ManyToMany, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';
import { Role } from './role.entity';


@Entity({ name: 'UserRole' })
@ObjectType()
export class UserToRole {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => Role, role => role.users)
  @Field(type => Role)
  role: Role;

  @ManyToOne(() => User, user => user.roles)
  @Field(type => User)
  user: User;

  @Column()
  userId: string;

  @Column()
  roleId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  assignedAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  removedAt: string;

  @ManyToOne(() => User, user => user.roles)
  @Field(type => User)
  assignedById: User;

  @ManyToOne(() => User, user => user.roles)
  @Field(type => User)
  removedById: User;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}