import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Allergies } from './allergies.entity';
import { ICDCodes } from './icdcodes.entity';
import { SnoMedCodes } from './snowmedCodes.entity';

// export enum AllergyType {
//   drug = "drug",
//   FOOD = "food",
//   ENVIRONMENT = "environment"
// }

// registerEnumType(AllergyType, {
//   name: "AllergyType",
//   description: "The patient's allergy type assigned",
// });

export enum AllergySeverity {
  MILD = "mild",
  ACUTE = "acute",
  MODERATE = "moderate",
  VERY_MILD = "very-mild"
}

registerEnumType(AllergySeverity, {
  name: "AllergySeverity",
  description: "The patient's allergy severity type assigned",
});

export enum AllergyOnset {
  CHILDHOOD = "childhood",
  ADULTHOOD = "adulthood",
  UNNKOWN = "unknown"
}

registerEnumType(AllergyOnset, {
  name: "AllergyOnset",
  description: "The patient's allergy onset type assigned",
});

@Entity({ name: 'PatientAllergies' })
@ObjectType()
export class PatientAllergies {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // @Column({
  //   type: "enum",
  //   enum: AllergyType,
  //   default: AllergyType.FOOD
  // })
  // @Field(type => AllergyType)
  // allergyType: AllergyType
    
  @Column({
    type: "enum",
    enum: AllergySeverity,
    default: AllergySeverity.MILD  
  })
  @Field(type => AllergySeverity)
  allergySeverity: AllergySeverity

  @Column({
    type: "enum",
    enum: AllergyOnset,
    default: AllergyOnset.ADULTHOOD  
  })
  @Field(type => AllergyOnset)
  allergyOnset: AllergyOnset

  @Column({ nullable: true })
  @Field({nullable: true})
  allergyStartDate: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  comments: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  isActive: boolean;

  @ManyToOne(() => Allergies, allergies => allergies.patientAllergies)
  @Field(type => Allergies, { nullable: true })
  allergy: Allergies;
  
  @ManyToOne(() => Patient, patient => patient.patientAllergies,{onDelete: "CASCADE"})
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.patientAllergies, { onDelete: 'CASCADE' })
  @Field(type => Doctor, { nullable: true })
  doctor: Doctor;

  @ManyToOne(() => Staff, staff => staff.patientAllergies, { onDelete: 'CASCADE' })
  @Field(type => Staff, { nullable: true })
  staff: Staff;

  @ManyToOne(() => Appointment, appointment => appointment.patientAllergies, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
