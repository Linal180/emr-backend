import { Field, InputType } from '@nestjs/graphql';
import { ProblemSeverity, ProblemType } from '../entities/patientProblems.entity';

@InputType()
export class CreateProblemInput {
  @Field()
  icdCodeId: string

  @Field()
  patientId: string

  @Field({nullable: true})
  providerId?: string

  @Field({nullable: true})
  staffId?: string

  @Field({nullable: true})
  appointmentId?: string

  @Field(type => ProblemType, {nullable: true})
  problemType?: ProblemType
    
  @Field(type => ProblemSeverity, {nullable: true})
  problemSeverity: ProblemSeverity

  @Field({nullable: true})
  problemStartDate: string;

  @Field({nullable: true})
  note: string;
}