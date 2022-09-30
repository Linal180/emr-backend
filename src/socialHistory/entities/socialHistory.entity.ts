import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//entities
import { Sections } from "./sections.entity";
import { Patient } from "src/patients/entities/patient.entity";

@Entity({ name: 'SocialHistory' })
@ObjectType()
export class SocialHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @OneToOne(() => Patient, patient => patient.surgicalHistories, { onDelete: 'CASCADE' })
  @Field(() => Patient, { nullable: true })
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => Sections, section => section.socialHistory, { onDelete: 'CASCADE' })
  @Field(() => [Sections], { nullable: true })
  sections: Sections[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}