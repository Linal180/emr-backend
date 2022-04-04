import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { ProblemSeverity, ProblemType } from '../entities/patientProblems.entity';
import { CreateProblemInput } from './create-problem.input';

@InputType()
export class UpdateProblemInput {
  @Field()
  id: string;

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

@InputType()
export class GetPatientProblem extends PickType(UpdateProblemInput, ['id'] as const) { }

@InputType()
export class RemoveProblem extends PickType(UpdateProblemInput, ['id'] as const) { }
