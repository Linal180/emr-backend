import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

registerEnumType(Gender, {
  name: "Gender",
  description: "The user gender assigned",
});

@Entity({ name: 'Dcotor' })
@ObjectType()
export class Dcotor {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column({ nullable: true })
  @Field()
  middleName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field()
  prefix: string;

  @Column({ nullable: true })
  @Field()
  suffix: string;

  @Column({ nullable: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  providerIntials: string;

  @Column({ nullable: true })
  @Field()
  degreeCredentials: string;

  @Column({ nullable: true })
  @Field()
  speciality: string;

  @Column({ nullable: true })
  @Field()
  dob: string;

  @Column({ nullable: true })
  @Field()
  ssn: string;

  @Column({ nullable: true })
  @Field()
  ssnType: string;

  @Column({ nullable: true })
  @Field()
  taxonomyCode: string;

  @Column({ nullable: true })
  @Field()
  deaNumber: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaActiveDate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  deaTermDate: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE
  })
  @Field(type => Gender)
  gender: Gender

  @Column({ nullable: true })
  @Field()
  languagesSpoken: string;

  @Column({ nullable: true })
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
  mobile: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field({ nullable: true })
  user: User;

  @ManyToOne(() => Facility, facility => facility.staff, { onDelete: 'CASCADE' })
  @Field(type => [Facility], { nullable: true })
  facility: Facility;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
