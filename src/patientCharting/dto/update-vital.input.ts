import { Field, InputType, PickType } from '@nestjs/graphql';
import { HeadCircumferenceType, SmokingStatus, TempUnitType, UnitType, WeightType } from '../entities/patientVitals.entity';

@InputType()
export class UpdateVitalInput {

  @Field()
  id: string

  @Field(type => UnitType, { nullable: true })
  unitType?: UnitType

  @Field(type => WeightType, { nullable: true })
  weightUnit?: WeightType

  @Field(type => HeadCircumferenceType, { nullable: true })
  headCircumference?: HeadCircumferenceType

  @Field(type => TempUnitType, { nullable: true })
  temperatureUnitType?: TempUnitType

  @Field(type => SmokingStatus, { nullable: true })
  smokingStatus?: SmokingStatus

  @Field({ nullable: true })
  patientTemperature?: string;

  @Field({ nullable: true })
  systolicBloodPressure?: string;

  @Field({ nullable: true })
  diastolicBloodPressure?: string;

  @Field({ nullable: true })
  respiratoryRate?: string;

  @Field({ nullable: true })
  oxygenSaturation?: string;

  @Field({ nullable: true })
  PatientHeight?: string;

  @Field({ nullable: true })
  PatientWeight?: string;

  @Field({ nullable: true })
  PatientBMI?: string;

  @Field({ nullable: true })
  PainRange?: string;

  @Field({ nullable: true })
  patientHeadCircumference?: string;

  @Field({ nullable: true })
  vitalCreationDate?: string;

  @Field({ nullable: true })
  pulseRate?: string;
}



@InputType()
export class GetPatientVital extends PickType(UpdateVitalInput, ['id'] as const) { }

@InputType()
export class RemoveVital extends PickType(UpdateVitalInput, ['id'] as const) { }
