import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LabTests } from './labTests.entity';
import { TestSpecimens } from './testSpecimens.entity';


@Entity({ name: 'SpecimenTypes' })
@ObjectType()
export class SpecimenTypes {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})
  name: string;

  @OneToMany(() => TestSpecimens, testSpecimens => testSpecimens.specimenTypes, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [TestSpecimens], { nullable: true })
  testSpecimens: TestSpecimens[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
