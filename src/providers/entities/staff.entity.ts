import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

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

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE
  })
  @Field(type => Gender)
  gender: Gender

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(type => User, { nullable: true })
  user: User;

  @ManyToOne(() => Facility, facility => facility.staff, { eager: true, onDelete: 'CASCADE' })
  @Field(type => Facility, { nullable: true })
  facility: Facility;

  @ManyToMany(type => Doctor, doctor => doctor.staff)
  providers: Doctor[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
