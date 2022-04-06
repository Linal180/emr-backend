import { Field, InputType } from '@nestjs/graphql';
import { HeadCircumferenceType, SmokingStatus, TempUnitType, UnitType, WeightType } from '../entities/patientVitals.entity';

@InputType()
export class CreateVitalInput {

  @Field(type => UnitType)
  unitType: UnitType

  @Field(type => WeightType)
  weightUnit: WeightType

  @Field(type => HeadCircumferenceType)
  headCircumference: HeadCircumferenceType

  @Field(type => TempUnitType)
  temperatureUnitType: TempUnitType

  @Field(type => SmokingStatus)
  smokingStatus: SmokingStatus

  @Field({nullable: true})
  patientTemperature: string;

  @Field({nullable: true})
  bloodPressure: string;

  @Field({nullable: true})
  respiratoryRate: string;

  @Field({nullable: true})
  oxygenSaturation: string;

  @Field({nullable: true})
  PatientHeight: string;

  @Field({nullable: true})
  PatientWeight: string;

  @Field({nullable: true})
  PatientBMI: string;

  @Field({nullable: true})
  PainRange: string;

  @Field({nullable: true})
  patientHeadCircumference: string;

  @Field({nullable: true})
  vitalCreationDate: string;

  @Field({ nullable: true })
  appointmentId?: string;

  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: true })
  staffId: string;
}