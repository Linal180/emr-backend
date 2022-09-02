import { Field, InputType, PickType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { ProblemSeverity, ProblemType } from '../entities/patientProblems.entity';

@InputType()
export class UpdateProblemInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  appointmentId?: string

  @Field(type => ProblemType, { nullable: true })
  problemType?: ProblemType

  @Field(type => ProblemSeverity, { nullable: true })
  problemSeverity: ProblemSeverity

  @Field({ nullable: true })
  problemStartDate: string;

  @Field({ nullable: true })
  note: string;
}

@InputType()
export class GetPatientProblem extends PickType(UpdateProblemInput, ['id'] as const) { }

@InputType()
export class RemoveProblem extends PickType(UpdateProblemInput, ['id'] as const) { }

@InputType()
export class SearchIcdCodesInput {
  @Field()
  searchTerm: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class SearchSnoMedCodesInput {
  @Field()
  searchTerm: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}