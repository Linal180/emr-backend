import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreateVitalInput } from '../dto/create-vital.input';
import { IcdCodesPayload } from '../dto/icdCodes-payload.dto';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { snoMedCodesPayload } from '../dto/snoMedCodes-payload.dto';
import { GetPatientProblem, RemoveProblem, SearchIcdCodesInput, SearchSnoMedCodesInput, UpdateProblemInput } from '../dto/update-problem.input';
import { PatientVitalPayload } from '../dto/vital-payload.dto';
import { PatientVitals } from '../entities/patientVitals.entity';
import { ProblemService } from '../services/patientProblem.service';

@Resolver(() => PatientVitals)
export class VitalsResolver {
  constructor(private readonly problemService: ProblemService) { }

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'addPatientVital')
  async addPatientVital(@Args('createVitalInput') createVitalInput: CreateVitalInput) {
    return {
      PatientVitals: await this.problemService.addPatientProblem(createVitalInput),
      response: { status: 200, message: 'Patient Vital created successfully' }
    };
  }

  @Mutation(() => PatientVitalPayload)
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
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'searchIcdCodes')
  async searchIcdCodes(@Args('searchIcdCodesInput') searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {
    const icdCodes = await this.problemService.searchIcdCodes(searchIcdCodesInput.searchTerm);
    return { icdCodes, response: { status: 200, message: 'ICD codes fetched successfully' } }
  }

  @Query(returns => snoMedCodesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'searchSnoMedCodeByIcdCodes')
  async searchSnoMedCodeByIcdCodes(@Args('searchSnoMedCodesInput') searchSnoMedCodesInput: SearchSnoMedCodesInput): Promise<snoMedCodesPayload> {
    const snoMedCodes = await this.problemService.searchSnoMedCodeByIcdCodes(searchSnoMedCodesInput.IcdCodes);
    return { snoMedCodes, response: { status: 200, message: 'SnoMedCode fetched successfully' } }
  }

  // @Query(returns => PatientVitalPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientProblem')
  // async getPatientProblem(@Args('getPatientProblem') getPatientProblem: GetPatientProblem): Promise<PatientVitalPayload> {
  //   const patientProblem = await this.problemService.GetPatientProblem(getPatientProblem.id)
  //   return {
  //     patientVital,
  //     response: { status: 200, message: 'Patient problem fetched successfully' }
  //   };
  // }

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatientProblem')
  async removePatientProblem(@Args('removeProblem') removeProblem: RemoveProblem) {
    await this.problemService.removePatientProblem(removeProblem);
    return { response: { status: 200, message: 'Patient problem Deleted' } };
  }
}
