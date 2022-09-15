import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { CreatePatientMedicationInput } from '../dto/create-patientMedications.input';
import { PatientMedicationInput, MedicationInput } from '../dto/patientMedication-input.dto';
import { MedicationsPayload, PatientMedicationPayload, PatientMedicationsPayload } from '../dto/patientMedication-payload.dto';
import { GetPatientMedication, RemovePatientMedication, UpdatePatientMedicationInput } from '../dto/update-patientMedication.input';
import { Medications } from '../entities/medications.entity';
import { PatientMedication } from '../entities/patientMedication.entity';
import { PatientMedicationService } from '../services/patientMedication.service';

@Resolver(() => PatientMedication)
export class PatientMedicationsResolver {
  constructor(
    private readonly patientMedicationService: PatientMedicationService,
    private readonly patientService: PatientService,
  ) { }

  @Mutation(() => PatientMedicationPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'addPatientMedication')
  async addPatientMedication(@Args('createPatientMedicationInput') createPatientMedicationInput: CreatePatientMedicationInput): Promise<PatientMedicationPayload> {
    return {
      patientMedication: await this.patientMedicationService.addPatientMedication(createPatientMedicationInput),
      response: { status: 200, message: 'Patient medication created successfully' }
    };
  }

  @Mutation(() => PatientMedicationPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientMedication')
  async updatePatientMedication(@Args('updatePatientMedicationInput') updatePatientMedicationInput: UpdatePatientMedicationInput): Promise<PatientMedicationPayload> {
    return {
      patientMedication: await this.patientMedicationService.updatePatientMedication(updatePatientMedicationInput),
      response: { status: 200, message: 'Patient medication updated successfully' }
    };
  }

  @Query(returns => PatientMedicationsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPatientMedications')
  async findAllPatientMedications(@Args('patientMedicationInput') patientMedicationInput: PatientMedicationInput): Promise<PatientMedicationsPayload> {
    const patientMedications = await this.patientMedicationService.findAllPatientMedication(patientMedicationInput)
    if (patientMedications) {
      return {
        ...patientMedications,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Medications not found',
    });
  }

  @Query(returns => MedicationsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPatientMedications')
  async findAllMedications(@Args('medicationInput') medicationInput: MedicationInput): Promise<MedicationsPayload> {
    const medications = await this.patientMedicationService.findAllMedications(medicationInput)
    if (medications) {
      return {
        ...medications,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Medications not found',
    });
  }

  @Query(returns => PatientMedicationPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientMedication')
  async getPatientMedications(@Args('getPatientMedication') getPatientMedication: GetPatientMedication): Promise<PatientMedicationPayload> {
    const patientMedication = await this.patientMedicationService.GetPatientMedication(getPatientMedication.id)
    return {
      patientMedication,
      response: { status: 200, message: 'Patient Medication fetched successfully' }
    };
  }

  @Mutation(() => PatientMedicationPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removePatientMedication')
  async removePatientMedication(@Args('removePatientMedication') removePatientMedication: RemovePatientMedication) {
    await this.patientMedicationService.removePatientMedication(removePatientMedication);
    return { response: { status: 200, message: 'Patient Medication Deleted' } };
  }

  @ResolveField(() => Patient)
  async patient(@Parent() patientMedication: PatientMedication): Promise<Patient> {
    if (patientMedication && patientMedication.patientId) {
      return await this.patientService.findOne(patientMedication.patientId);
    }
  }

  @ResolveField(() => Medications)
  async medication(@Parent() patientMedication: PatientMedication): Promise<Medications> {
    if (patientMedication && patientMedication.medicationId) {
      return await this.patientMedicationService.getMedication(patientMedication.medicationId);
    }
  }
}
