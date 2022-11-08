import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
//entities
import { Role } from './role.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';


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
  @Field(() => UserStatus)
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  inviteSentAt: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

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
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @Field(() => [Role], { nullable: 'itemsAndList' })
  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'UserRoles' })
  roles: Role[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
}