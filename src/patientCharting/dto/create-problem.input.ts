import { Field, InputType } from '@nestjs/graphql';
import { ProblemSeverity, ProblemType } from '../entities/patientProblems.entity';

@InputType()
export class CreateProblemInput {
  @Field()
  icdCodeId: string

  @Field({ nullable: true })
  snowMedCodeId?: string

  @Field()
  patientId: string

  @Field({ nullable: true })
  providerId?: string

  @Field({ nullable: true })
  staffId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => [String], { nullable: true })
  medicationIds?: string[]

  @Field(() => [String], { nullable: true })
  testIds?: string[]

  @Field(type => ProblemType, { nullable: true })
  problemType?: ProblemType

  @Field(type => ProblemSeverity, { nullable: true })
  problemSeverity: ProblemSeverity

  @Field({ nullable: true })
  problemStartDate: string;

  @Field({ nullable: true })
  note: string;

  @Field({ nullable: true, defaultValue: false })
  isSigned: boolean;

  @Field({ nullable: true, defaultValue: false })
  forOrders: boolean;

  @Field({ nullable: true, defaultValue: false })
  shouldCreateTemplate: boolean;
}