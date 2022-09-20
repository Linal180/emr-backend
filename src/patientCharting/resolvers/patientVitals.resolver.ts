import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import PatientVitalInput from '../dto/vital-input.dto';
import { CreateVitalInput } from '../dto/create-vital.input';
import { GetPatientVital, RemoveVital, UpdateVitalInput } from '../dto/update-vital.input';
//payloads
import { PatientVitalPayload } from '../dto/vital-payload.dto';
import { PatientVitalsPayload } from '../dto/vitals-payload.dto';
//entities
import { PatientVitals } from '../entities/patientVitals.entity';
//services
import { VitalsService } from '../services/patientVitals.service';

@Resolver(() => PatientVitals)
export class VitalsResolver {
  constructor(private readonly vitalsService: VitalsService) { }

  //mutations

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'addPatientVital')
  async addPatientVital(@Args('createVitalInput') createVitalInput: CreateVitalInput) {
    return {
      patientVital: await this.vitalsService.addPatientVital(createVitalInput),
      response: { status: 200, message: 'Patient Vital created successfully' }
    };
  }

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientVital')
  async updatePatientVital(@Args('updateVitalInput') updateVitalInput: UpdateVitalInput): Promise<PatientVitalPayload> {
    return {
      patientVital: await this.vitalsService.updatePatientVital(updateVitalInput),
      response: { status: 200, message: 'Patient vital updated successfully' }
    };
  }

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatientVital')
  async removePatientVital(@Args('removeVital') removeVital: RemoveVital) {
    await this.vitalsService.removePatientVital(removeVital);
    return { response: { status: 200, message: 'Patient vital Deleted' } };
  }

  //queries

  @Query(() => PatientVitalsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllPatientVitals')
  async findAllPatientVitals(@Args('patientVitalInput') patientVitalInput: PatientVitalInput): Promise<PatientVitalsPayload> {
    const patientVitals = await this.vitalsService.findAllPatientVitals(patientVitalInput)
    if (patientVitals) {
      return {
        ...patientVitals,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Vitals not found',
    });
  }

  @Query(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientVital')
  async getPatientVital(@Args('getPatientVital') getPatientVital: GetPatientVital): Promise<PatientVitalPayload> {
    const patientVital = await this.vitalsService.GetPatientVital(getPatientVital.id)
    return {
      patientVital,
      response: { status: 200, message: 'Patient vital fetched successfully' }
    };
  }

  @Query(() => PatientVitalPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientVital')
  async getPatientLatestVital(@Args('patientId') patientId: string): Promise<PatientVitalPayload> {
    const patientVital = await this.vitalsService.GetPatientLatestVital(patientId)
    return {
      patientVital,
      response: { status: 200, message: 'Patient vital fetched successfully' }
    };
  }
}
