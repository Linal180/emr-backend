import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Patient } from "src/patients/entities/patient.entity";
import { SocialAnswer } from "./socialAnswer.entity";

@Entity({ name: 'SocialHistory' })
@ObjectType()
export class SocialHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string

  @OneToOne(() => Patient, patient => patient.surgicalHistories, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => SocialAnswer, socialAnswer => socialAnswer.socialHistory, { onDelete: 'CASCADE' })
  @Field(() => [SocialAnswer], { nullable: true })
  socialAnswer: SocialAnswer[];
  
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}