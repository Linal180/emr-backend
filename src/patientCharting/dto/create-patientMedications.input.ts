import { Field, InputType } from '@nestjs/graphql';
import { ProblemSeverity, ProblemType } from '../entities/patientProblems.entity';

@InputType()
export class CreatePatientMedicationInput {
  @Field({ nullable:true })
  oralRoute?: string

  @Field({ nullable:true })
  sig?: string

  @Field({ nullable:true }) 
  takeAmount?: string

  @Field({ nullable:true })
  tabletUnit?: string

  @Field({ nullable:true })
  timeDuration?: string

  @Field({ nullable:true })
  noOfDays?: string

  @Field({ nullable:true })
  startDate?: string

  @Field({ nullable:true })
  status?: string

  @Field({ nullable:true })
  stopDate?: string

  @Field({ nullable:true })
  stopReason?: string

  @Field({ nullable:true })
  note?: string

  @Field({ nullable:true })
  patientId?: string

  @Field({ nullable:true })
  appointmentId?: string

  @Field({ nullable:true })
  medicationId?: string

  @Field({ nullable:true })
  patientProblemId?: string
}