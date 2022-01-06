import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Contacts' })
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
  mobile: string;

  @Column({ nullable: true })
  @Field()
  pager: string;

  @Column({ nullable: true })
  @Field()
  fax: string;

  @Column({ nullable: true })
  @Field()
  address: string;

  @Column({ nullable: true })
  @Field()
  address2: string;

  @Column({ nullable: true })
  @Field()
  zipCode: string;

  @Column({ nullable: true })
  @Field()
  city: string;

  @Column({ nullable: true })
  @Field()
  state: string;

  @Column({ nullable: true })
  @Field()
  country: string;

  @OneToMany(() => Facility, facility => facility.contact, { onUpdate: 'CASCADE', onDelete: "CASCADE", eager: true })
  facilities: Facility[];

  @Column({ nullable: true })
  @Field()
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;

}
