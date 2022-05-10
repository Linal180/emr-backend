import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserLog } from './user-logs.entity';


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

  @Column({ nullable: true, default: false })
  @Field()
  isTwoFactorEnabled: boolean;

  @Column()
  password: string;

  @Column()
  @Field()
  email: string;

  @Column({nullable: true})
  @Field({nullable: true})
  phone: string;

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

  @Column({ nullable: true, default: '2' })
  @Field({ nullable: true })
  autoLogoutTime: string;

  @Column({ nullable: true })
  @Field()
  userType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @ManyToOne(() => Facility, facility => facility.staff, { eager: true, onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
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

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
}