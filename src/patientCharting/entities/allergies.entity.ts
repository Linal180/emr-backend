import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  @Field()
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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
