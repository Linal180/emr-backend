import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { CreateSurgicalHistoryInput } from '../dto/create-surgicalHistory.input';
import { SurgicalHistoryPayload, SurgicalHistoriesPayload } from '../dto/surgicalHistory-payload.dto';
import SurgicalHistoryInput from '../dto/surgicalHistory-input.dto';
import { GetSurgicalHistory, RemoveSurgicalHistory, UpdateSurgicalHistoryInput } from '../dto/update-surgicalHistory.input';
import { SurgicalHistory } from '../entities/surgicalHistory.entity';
import { SurgicalHistoryService } from '../services/surgicalHistory.service';

@Resolver(() => SurgicalHistory)
export class SurgicalHistoryResolver {
  constructor(
    private readonly surgicalHistoryService: SurgicalHistoryService,
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    ) { }

  @Mutation(() => SurgicalHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'addSurgicalHistory')
  async addSurgicalHistory(@Args('createSurgicalHistoryInput') createSurgicalHistoryInput: CreateSurgicalHistoryInput): Promise<SurgicalHistoryPayload> {
    return {
      surgicalHistory: await this.surgicalHistoryService.addSurgicalHistory(createSurgicalHistoryInput),
      response: { status: 200, message: 'Patient triageNote created successfully' }
    };
  }

  @Mutation(() => SurgicalHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateSurgicalHistory')
  async updateSurgicalHistory(@Args('updateSurgicalHistoryInput') updateSurgicalHistoryInput: UpdateSurgicalHistoryInput): Promise<SurgicalHistoryPayload> {
    return {
      surgicalHistory: await this.surgicalHistoryService.updateSurgicalHistory(updateSurgicalHistoryInput),
      response: { status: 200, message: 'Patient vital updated successfully' }
    };
  }

  @Query(returns => SurgicalHistoriesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllSurgicalHistory')
  async findAllSurgicalHistory(@Args('surgicalHistoryInput') surgicalHistoryInput: SurgicalHistoryInput): Promise<SurgicalHistoriesPayload> {
    const surgicalHistories = await this.surgicalHistoryService.findAllSurgicalHistory(surgicalHistoryInput)
    if (surgicalHistories) {
      return {
        ...surgicalHistories,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'SurgicalHistory not found',
    });
  }

  @Query(returns => SurgicalHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getSurgicalHistory')
  async getSurgicalHistory(@Args('surgicalHistoryInput') surgicalHistoryInput: GetSurgicalHistory): Promise<SurgicalHistoryPayload> {
    const surgicalHistory = await this.surgicalHistoryService.GetSurgicalHistory(surgicalHistoryInput.id)
    return {
      surgicalHistory,
      response: { status: 200, message: 'Patient Triage Notes fetched successfully' }
    };
  }

  @Mutation(() => SurgicalHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeSurgicalHistory')
  async removeSurgicalHistory(@Args('removeSurgicalHistory') removeSurgicalHistory: RemoveSurgicalHistory) {
    await this.surgicalHistoryService.removeSurgicalHistory(removeSurgicalHistory);
    return { response: { status: 200, message: 'Patient Triage Notes Deleted' } };
  }

  @ResolveField(() => Patient)
  async patient(@Parent() surgicalHistory: SurgicalHistory): Promise<Patient> {
    if (surgicalHistory && surgicalHistory.patientId) {
      return await this.patientService.findOne(surgicalHistory.patientId);
    }
  }
}
