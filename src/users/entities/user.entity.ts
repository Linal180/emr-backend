import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from './role.entity';
import { UserLog } from './user-logs.entity';
import { Facility } from 'src/facilities/entities/facility.entity';


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
  @Field({ nullable: true })
  token: string;

  @Column({ nullable: true })
  @Field()
  userType: string;

  @ManyToOne(() => Facility, facility => facility.staff, { onDelete: 'CASCADE' })
  @Field(type => [Facility], { nullable: true })
  facility: Facility;

  @Field(type => [Role], { nullable: 'itemsAndList' })
  @ManyToMany(type => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'UserRoles' })
  roles: Role[];

  @OneToMany(() => UserLog, Userlog => Userlog.userId)
  UserLogs: UserLog[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}