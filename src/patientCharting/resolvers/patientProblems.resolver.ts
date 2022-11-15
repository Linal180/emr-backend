import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import PatientProblemInput from '../dto/problem-input.dto';
import { CreateProblemInput } from '../dto/create-problem.input';
import {
  GetPatientProblem, RemoveProblem, SearchIcdCodesInput, SearchSnoMedCodesInput, UpdateProblemInput,
  UpdateProblemNotesInput, UpdateProblemSignedInput
} from '../dto/update-problem.input';
//payloads
import { IcdCodesPayload } from '../dto/icdCodes-payload.dto';
import { PatientProblemPayload } from '../dto/problem-payload.dto';
import { snoMedCodesPayload } from '../dto/snoMedCodes-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
//entities
import { LabTests } from 'src/labs/entities/labTests.entity';
import { PatientProblems } from '../entities/patientProblems.entity';
import { ImagingOrder } from 'src/labs/entities/imagingOrder.entity';
import { PatientMedication } from '../entities/patientMedication.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
//services
import { ProblemService } from '../services/patientProblems.service';
import { LabTestsService } from 'src/labs/services/labTests.service';
import { ImagingOrderService } from 'src/labs/services/imagingOrder.service';
import { PatientMedicationService } from '../services/patientMedication.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';

@Resolver(() => PatientProblems)
export class ProblemResolver {
  constructor(
    private readonly problemService: ProblemService,
    private readonly labTestsService: LabTestsService,
    private readonly appointmentService: AppointmentService,
    private readonly imagingOrderService: ImagingOrderService,
    private readonly patientMedicationService: PatientMedicationService,
  ) { }

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

  @Mutation(() => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientProblem')
  async updatePatientProblemSigned(@Args('updateProblemSignedInput') updateProblemSignedInput: UpdateProblemSignedInput) {
    return {
      patientProblem: await this.problemService.updatePatientProblemSigned(updateProblemSignedInput),
      response: { status: 200, message: 'Diagnose signed successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientProblem')
  async updatePatientProblemNotes(@Args('updateProblemNotesInput') updateProblemNotesInput: UpdateProblemNotesInput) {
    return {
      patientProblem: await this.problemService.updatePatientProblemNotes(updateProblemNotesInput),
      response: { status: 200, message: 'Diagnose notes updated successfully' }
    };
  }

  @Mutation(() => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'removePatientProblem')
  async removePatientProblem(@Args('removeProblem') removeProblem: RemoveProblem) {
    await this.problemService.removePatientProblem(removeProblem);
    return { response: { status: 200, message: 'Patient problem Deleted' } };
  }

  //queries

  @Query(() => PatientProblemsPayload)
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

  @Query(() => IcdCodesPayload)
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

  @Query(() => IcdCodesPayload)
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

  @Query(() => snoMedCodesPayload)
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

  @Query(() => PatientProblemPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('name', 'getPatientProblem')
  async getPatientProblem(@Args('getPatientProblem') getPatientProblem: GetPatientProblem): Promise<PatientProblemPayload> {
    const patientProblem = await this.problemService.GetPatientProblem(getPatientProblem.id)
    return {
      patientProblem,
      response: { status: 200, message: 'Patient problem fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [PatientMedication])
  async patientMedications(@Parent() patientProblem: PatientProblems): Promise<PatientMedication[]> {
    if (patientProblem?.id) {
      return await this.patientMedicationService.GetPatientMedicationsByProblemId(patientProblem.id);
    }
  }

  @ResolveField(() => [LabTests])
  async labTests(@Parent() patientProblem: PatientProblems): Promise<LabTests[]> {
    if (patientProblem?.id) {
      return await this.labTestsService.GetLabTestsByProblemId(patientProblem.id);
    }
  }

  @ResolveField(() => Appointment)
  async appointment(@Parent() patientProblem: PatientProblems): Promise<Appointment> {
    if (patientProblem?.appointmentId) {
      return await this.appointmentService.findOne(patientProblem.appointmentId);
    }
  }

  @ResolveField(() => [ImagingOrder])
  async imagingOrders(@Parent() patientProblem: PatientProblems): Promise<ImagingOrder[]> {
    if (patientProblem?.id) {
      return await this.imagingOrderService.findByProblemId(patientProblem.id);
    }
  }
}
