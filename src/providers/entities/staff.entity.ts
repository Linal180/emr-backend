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
  @Field()
  dob: string;

  @Column({ nullable: true })
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
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
