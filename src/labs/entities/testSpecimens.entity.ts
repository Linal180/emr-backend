import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LabTests } from './labTests.entity';
import { SpecimenTypes } from './specimenTypes.entity';

@Entity({ name: 'TestSpecimens' })
@ObjectType()
export class TestSpecimens {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({nullable: true})
  @Field({nullable: true})
  collectionDate: string;

  @Column({nullable: true})
  @Field({nullable: true})
  collectionTime: string;

  @Column("text", { nullable: true })
  @Field({nullable: true})
  specimenNotes: string;

  @Column({nullable: true})
  @Field({nullable: true})
  labTestId: string;

  @ManyToOne(() => SpecimenTypes, specimenTypes => specimenTypes.testSpecimens, { onDelete: 'CASCADE' })
  @Field(type => SpecimenTypes, { nullable: true })
  specimenTypes: SpecimenTypes;

  @Column({nullable: true})
  @Field({nullable: true})
  specimenTypesId: string;

  @ManyToOne(() => LabTests, labTests => labTests.testSpecimens, { onDelete: 'CASCADE' })
  @Field(type => LabTests, { nullable: true })
  labTest: LabTests;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;
}
