import { Field, ObjectType } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'Practice' })
@ObjectType()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  practiceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ein: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  upin: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicare: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  medicaid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  champus: string;

  @OneToMany(() => Facility, facility => facility.practice, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Facility], { nullable: true })
  facilities: Facility[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
