import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UserToRole } from './user-role.entity';


export enum UserStatus {
  DEACTIVATED = 0,
  ACTIVE,
}

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "The user status",
});

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: "enum", enum: UserStatus, default: UserStatus.ACTIVE
  })
  @Field(type => UserStatus)
  status: UserStatus;

  @Column({ nullable: true, default: false })
  @Field()
  emailVerified: boolean;

  @Column()
  password: string;

  @Column()
  @Field()
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  inviteSentAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  inviteAcceptedAt: string;

  @Column({ nullable: true })
  @Field()
  userId: string;

  @Column({ nullable: true })
  @Field()
  token: string;

  @Column({ nullable: true })
  @Field()
  userType: string;

  @OneToMany(() => UserToRole, userToRole => userToRole.user, { eager: true })
  @Field(type => UserToRole)
  roles: UserToRole[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}