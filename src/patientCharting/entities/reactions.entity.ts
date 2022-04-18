import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PatientAllergies } from './patientAllergies.entity';

@Entity({ name: 'Reactions' })
@ObjectType()
export class Reactions {

  @PrimaryGeneratedColumn('uuid')
  @Field()  
  id: string

  @Column()
  @Field()
  name: string

  @ManyToMany(type => PatientAllergies, patientAllergies => patientAllergies.reactions)
  @Field((type)=> PatientAllergies, {nullable: true})
  patientAllergies: PatientAllergies[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
