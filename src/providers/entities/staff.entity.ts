import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
//entities
import { Doctor } from './doctor.entity';
import { User } from 'src/users/entities/user.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { PatientVitals } from 'src/patientCharting/entities/patientVitals.entity';
import { PatientProblems } from 'src/patientCharting/entities/patientProblems.entity';
import { PatientAllergies } from 'src/patientCharting/entities/patientAllergies.entity';

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

registerEnumType(Gender, {
  name: "Gender",
  description: "The user gender assigned",
});

@Entity({ name: 'Staff' })
@ObjectType()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  facilityId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE
  })
  @Field(() => Gender)
  gender: Gender

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Facility, facility => facility.staff, { eager: true, onDelete: 'CASCADE' })
  @Field(() => Facility, { nullable: true })
  facility: Facility;

  @ManyToOne(() => Practice, practice => practice.staff, { eager: true, onDelete: 'CASCADE' })
  @Field(() => Practice, { nullable: true })
  practice: Practice;

  @ManyToMany(() => Doctor, doctor => doctor.staff)
  providers: Doctor[];

  @OneToMany(() => PatientProblems, patientProblems => patientProblems.staff, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientProblems], { nullable: true })
  patientProblem: PatientProblems[];

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.staff, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(() => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @OneToMany(() => PatientVitals, patientVitals => patientVitals.addedBy)
  @Field(() => PatientVitals, { nullable: true })
  patientVitals: PatientVitals;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];

}
