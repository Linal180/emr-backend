import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'UserLogs', database: 'logDatabase' })
@ObjectType()
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  operationName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ array: false, type: 'jsonb', nullable: false })
  @Field({ nullable: true })
  reqInfo: string

  @Column({ array: false, type: 'jsonb', nullable: false })
  @Field({ nullable: true })
  resInfo: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  statusCode: string;

  // @ManyToOne(() => User, user => user.UserLogs)
  // @Field(type => User)
  // user: User

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}