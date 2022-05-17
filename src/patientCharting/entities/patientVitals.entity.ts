import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UnitType {
  INCH = "Inch",
  CENTIMETER = "Centimeter"
}

registerEnumType(UnitType, {
  name: "UnitType",
  description: "The patient's vital unit type assigned",
});

export enum WeightType {
  POUND = "Pound",
  KG = "Kg",
  POUND_OUNCE = "Pound-Ounce"
}

registerEnumType(WeightType, {
  name: "WeightType",
  description: "The patient's weight unit type assigned",
});

export enum HeadCircumferenceType {
  INCH = "Inch",
  CENTIMETER = "Centimeter"
}

registerEnumType(HeadCircumferenceType, {
  name: "HeadCircumferenceType",
  description: "The patient's head circumference unit type assigned",
});

export enum TempUnitType {
  DEG_F = "DegF",
  DEG_C = "DegC"
}

registerEnumType(TempUnitType, {
  name: "TempUnitType",
  description: "The patient's temperature unit type assigned",
});

export enum SmokingStatus {
  NEVER_SMOKED = "NeverSmoked",
  CURRENT_EVERYDAY_SMOKER = "CurrentEveryDaySmoker",
  CURRENT_SOMEDAY_SMOKER = "CurrentSomeDaySmoker",
  FORMER_SMOKER = "FormerSmoker",
  SMOKER_CURRENT_STATUS_UNKNOWN = "SmokerCurrentStatusUnknown",
  UNKNOWN_IF_EVER_SMOKED = "UnknownIfEverSmoked"
}

registerEnumType(SmokingStatus, {
  name: "SmokingStatus",
  description: "The patient's smoking status type assigned",
});


@Entity({ name: 'PatientVital' })
@ObjectType()
export class PatientVitals {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({
    type: "enum",
    enum: UnitType,
    default: UnitType.INCH
  })
  @Field(type => UnitType)
  unitType: UnitType

  @Column({
    type: "enum",
    enum: WeightType,
    default: WeightType.POUND
  })
  @Field(type => WeightType)
  weightUnit: WeightType

  @Column({
    type: "enum",
    enum: HeadCircumferenceType,
    default: HeadCircumferenceType.CENTIMETER
  })
  @Field(type => HeadCircumferenceType)
  headCircumference: HeadCircumferenceType

  @Column({
    type: "enum",
    enum: TempUnitType,
    default: TempUnitType.DEG_C
  })
  @Field(type => TempUnitType)
  temperatureUnitType: TempUnitType

  @Column({
    type: "enum",
    enum: SmokingStatus,
    default: SmokingStatus.NEVER_SMOKED
  })
  @Field(type => SmokingStatus)
  smokingStatus: SmokingStatus

  @Column({ nullable: true })
  @Field({nullable: true})
  patientTemperature: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  systolicBloodPressure: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  diastolicBloodPressure: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  respiratoryRate: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  oxygenSaturation: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  PatientHeight: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  PatientWeight: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  PatientBMI: string;

  @Column({ nullable: true })   
  @Field({nullable: true})
  PainRange: string;

  @Column({ nullable: true })   
  @Field({nullable: true})
  pulseRate: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  patientHeadCircumference: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  vitalCreationDate: string;
  
  @Column({ nullable: true })
  @Field({nullable: true})
  patientId: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  appointmentId: string;

  @ManyToOne(() => Appointment, appointment => appointment.patientProblem, { onDelete: 'CASCADE' })
  @Field(type => Appointment, { nullable: true })
  appointment: Appointment;

  @ManyToOne(() => Patient, patient => patient.patientVitals, { onDelete: 'CASCADE' })
  @Field(type => Patient, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Staff, staff => staff.patientVitals, { onDelete: 'CASCADE' })
  @Field(type => Staff, { nullable: true })
  addedBy: Staff;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

}
