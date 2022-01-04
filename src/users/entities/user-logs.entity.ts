import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';


export enum ChangeType {
  ADDED = "added",
  EDITED = "edited",
  DELETED = "deleted"
}

registerEnumType(ChangeType, {
  name: "ChangeType",
  description: "The user log status",
});

@Entity({ name: 'UserLogs' })
@ObjectType()
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field()
  entityName: string

  @Column({
    type: "enum", enum: ChangeType, default: ChangeType.ADDED
  })
  @Field(type => ChangeType)
  action: ChangeType;

  @Column({ nullable: true })
  @Field()
  facilityId: string;

  @ManyToOne(() => User, user => user.UserLogs)
  @Field(type => User)
  userId: User

  @ManyToOne(() => User, user => user.UserLogs)
  @Field(type => User)
  assignedById: User;

  @ManyToOne(() => User, user => user.UserLogs)
  @Field(type => User)
  removedById: User;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  assignedAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  removedAt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}