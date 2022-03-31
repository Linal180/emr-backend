import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { CreateProblemInput } from '../dto/create-problem.input';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemPayload } from '../dto/problem-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { GetProblem, RemoveProblem, UpdateProblemInput } from '../dto/update-problem.input';
import { PatientProblems } from '../entities/patientProblems.entity';
import { ProblemService } from '../services/patientProblem.service';

@Resolver(() => PatientProblems)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) { }

  @Mutation(() => PatientProblemsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'addPatientProblem')
  async addPatientProblem(@Args('createProblemInput') createProblemInput: CreateProblemInput) {
    return {
      problem: await this.problemService.addPatientProblem(createProblemInput),
      response: { status: 200, message: 'Problem created successfully' }
    };
  }

  @Mutation(() => PatientProblemsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientProblem')
  async updatePatientProblem(@Args('updateProblemInput') updateProblemInput: UpdateProblemInput) {
    return {
      problem: await this.problemService.updatePatientProblem(updateProblemInput),
      response: { status: 200, message: 'Problem updated successfully' }
    };
  }

  @Query(returns => PatientProblemsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllPatientProblem')
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

  @Query(returns => PatientProblemsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientProblem')
  async getPatientProblem(@Args('getProblem') getProblem: GetProblem): Promise<PatientProblemPayload> {
    const patientProblem = await this.problemService.GetPatientProblem(getProblem.id)
    return {
      ...patientProblem,
      response: { status: 200, message: 'Patient problem fetched successfully' }
    };
  }

  @Mutation(() => PatientProblemsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatientProblem')
  async removePatientProblem(@Args('removeProblem') removeProblem: RemoveProblem) {
    await this.problemService.removePatientProblem(removeProblem);
    return { response: { status: 200, message: 'Patient problem Deleted' } };
  }
}
