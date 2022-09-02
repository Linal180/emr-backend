import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PatientAllergies } from './patientAllergies.entity';

export enum AllergyType {
  DRUG = "drug",
  FOOD = "food",
  ENVIRONMENT = "environment"
}

registerEnumType(AllergyType, {
  name: "AllergyType",
  description: "The patient's allergy type assigned",
});

@Entity({ name: 'Allergies' })
@ObjectType()
export class Allergies {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({nullable: true})
  @Field({nullable: true})
  name: string

  @Column({
    type: "enum",
    enum: AllergyType,
    default: AllergyType.FOOD
  })
  @Field(type => AllergyType)
  allergyType: AllergyType

  @Column({nullable: true})
  @Field({nullable: true})
  drugAllergyTypes: string

  @OneToMany(() => PatientAllergies, patientAllergies => patientAllergies.allergy, {onDelete: "CASCADE"})
  @Field(type => [PatientAllergies], { nullable: true })
  patientAllergies: PatientAllergies[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
