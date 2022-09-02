import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreateProblemInput } from '../dto/create-problem.input';
import { IcdCodesPayload } from '../dto/icdCodes-payload.dto';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemPayload } from '../dto/problem-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { snoMedCodesPayload } from '../dto/snoMedCodes-payload.dto';
import { GetPatientProblem, RemoveProblem, SearchIcdCodesInput, SearchSnoMedCodesInput, UpdateProblemInput } from '../dto/update-problem.input';
import { PatientProblems } from '../entities/patientProblems.entity';
import { ProblemService } from '../services/patientProblems.service';

@Resolver(() => PatientProblems)
export class ProblemResolver {
  constructor(private readonly problemService: ProblemService) { }

  @Mutation(() => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'addPatientProblem')
  async addPatientProblem(@Args('createProblemInput') createProblemInput: CreateProblemInput) {
    return {
      patientProblem: await this.problemService.addPatientProblem(createProblemInput),
      response: { status: 200, message: 'Problem created successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientProblem')
  async updatePatientProblem(@Args('updateProblemInput') updateProblemInput: UpdateProblemInput) {
    return {
      patientProblem: await this.problemService.updatePatientProblem(updateProblemInput),
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

  @Query(returns => IcdCodesPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'searchIcdCodes')
  async searchIcdCodes(@Args('searchIcdCodesInput') searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {
    const icdCodes = await this.problemService.searchIcdCodes(searchIcdCodesInput);
    return {
      ...icdCodes,
      response: {
        message: "OK", status: 200,
      }
    }
  }

  @Query(returns => IcdCodesPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'fetchICDCodes')
  async fetchICDCodes(@Args('searchIcdCodesInput') searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {
    const icdCodes = await this.problemService.fetchICDCodes(searchIcdCodesInput);
    return {
      ...icdCodes,
      response: {
        message: "OK", status: 200,
      }
    }
  }

  @Query(returns => snoMedCodesPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'searchSnoMedCodeByIcdCodes')
  async searchSnoMedCodeByIcdCodes(@Args('searchSnoMedCodesInput') searchSnoMedCodesInput: SearchSnoMedCodesInput): Promise<snoMedCodesPayload> {
    const snoMedCodes = await this.problemService.searchSnoMedCodeByIcdCodes(searchSnoMedCodesInput);
    return {
      ...snoMedCodes,
      response: {
        message: "OK", status: 200,
      }
    }
  }

  @Query(returns => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'getPatientProblem')
  async getPatientProblem(@Args('getPatientProblem') getPatientProblem: GetPatientProblem): Promise<PatientProblemPayload> {
    const patientProblem = await this.problemService.GetPatientProblem(getPatientProblem.id)
    return {
      patientProblem,
      response: { status: 200, message: 'Patient problem fetched successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'removePatientProblem')
  async removePatientProblem(@Args('removeProblem') removeProblem: RemoveProblem) {
    await this.problemService.removePatientProblem(removeProblem);
    return { response: { status: 200, message: 'Patient problem Deleted' } };
  }
}
