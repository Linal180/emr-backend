import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Allergies } from './allergies.entity';
import { Reactions } from './reactions.entity';

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
  UNKNOWN = "unknown"
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

  @Column("text", { nullable: true })
  @Field({nullable: true})
  comments: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  isActive: boolean;

  @Column({ nullable: true })
  @Field({nullable: true})
  staffId: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  patientId: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  appointmentId: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  doctorId: string;

  @ManyToOne(() => Allergies, allergies => allergies.patientAllergies, {eager: true})
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

  @Field(type => [Reactions], { nullable: 'itemsAndList' })
  @ManyToMany(type => Reactions, reactions => reactions.patientAllergies, { eager: true })
  @JoinTable({ name: 'PatientAllergyReactions' })
  reactions: Reactions[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
