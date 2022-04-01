import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProblemInput } from '../dto/create-problem.input';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemPayload } from '../dto/problem-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { GetPatientProblem, RemoveProblem, UpdateProblemInput } from '../dto/update-problem.input';
import { PatientProblems } from '../entities/patientProblems.entity';
import { ProblemService } from '../services/patientProblem.service';

@Resolver(() => PatientProblems)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) { }

  @Mutation(() => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'addPatientProblem')
  async addPatientProblem(@Args('createProblemInput') createProblemInput: CreateProblemInput) {
    return {
      patientProblem: await this.problemService.addPatientProblem(createProblemInput),
      response: { status: 200, message: 'Problem created successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientProblem')
  async updatePatientProblem(@Args('updateProblemInput') updateProblemInput: UpdateProblemInput) {
    return {
      patientProblem: await this.problemService.updatePatientProblem(updateProblemInput),
      response: { status: 200, message: 'Problem updated successfully' }
    };
  }

  @Query(returns => PatientProblemsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPatientProblem')
  async findAllPatientProblem(@Args('patientProblemInput') patientProblemInput: PatientProblemInput): Promise<PatientProblemsPayload> {
    const problems = await this.problemService.findAllPatientProblem(patientProblemInput)
    if (problems) {
      return {
        ...problems,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Facility not found',
    });
  }

  @Query(returns => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientProblem')
  async getPatientProblem(@Args('getPatientProblem') getPatientProblem: GetPatientProblem): Promise<PatientProblemPayload> {
    const patientProblem = await this.problemService.GetPatientProblem(getPatientProblem.id)
    return {
      patientProblem,
      response: { status: 200, message: 'Patient problem fetched successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removePatientProblem')
  async removePatientProblem(@Args('removeProblem') removeProblem: RemoveProblem) {
    await this.problemService.removePatientProblem(removeProblem);
    return { response: { status: 200, message: 'Patient problem Deleted' } };
  }
}
