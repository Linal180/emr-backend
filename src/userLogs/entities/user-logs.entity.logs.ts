import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'UserLogs', database: process.env.DATABASE_LOG_ID || 'logs' })
@ObjectType()
export class UserLogs {
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  ipAddress: string;

  // 200, 500
  @Column({ nullable: true })
  @Field({ nullable: true })
  responseCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string

  // patient, doctor
  @Column({ nullable: true })
  @Field({ nullable: true })
  moduleType: string

  // read, create, delete, update
  @Column({ nullable: true })
  @Field({ nullable: true })
  operationType: string

  // frontend url
  @Column({ nullable: true })
  @Field({ nullable: true })
  refererUrl: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  //which columns are update e.g firstName, lastName
  @Column({ nullable: true })
  @Field({ nullable: true })
  activityPayload: string
  
  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}