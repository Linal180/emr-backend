import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreateVitalInput } from '../dto/create-vital.input';
import { GetPatientVital, RemoveVital, UpdateVitalInput } from '../dto/update-vital.input';
import PatientVitalInput from '../dto/vital-input.dto';
import { PatientVitalPayload } from '../dto/vital-payload.dto';
import { PatientVitalsPayload } from '../dto/vitals-payload.dto';
import { PatientVitals } from '../entities/patientVitals.entity';
import { VitalsService } from '../services/patientVitals.service';

@Resolver(() => PatientVitals)
export class VitalsResolver {
  constructor(private readonly vitalsService:  VitalsService) { }

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
  async updatePatientVital(@Args('updateVitalInput') updateVitalInput: UpdateVitalInput) {
    return {
      patientVital: await this.vitalsService.updatePatientVital(updateVitalInput),
      response: { status: 200, message: 'Patient vital updated successfully' }
    };
  }

  @Query(returns => PatientVitalsPayload)
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

  @Query(returns => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientVital')
  async getPatientVital(@Args('getPatientVital') getPatientVital: GetPatientVital): Promise<PatientVitalPayload> {
    const patientVital = await this.vitalsService.GetPatientVital(getPatientVital.id)
    return {
      patientVital,
      response: { status: 200, message: 'Patient vital fetched successfully' }
    };
  }

  @Mutation(() => PatientVitalPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatientVital')
  async removePatientVital(@Args('removeVital') removeVital: RemoveVital) {
    await this.vitalsService.removePatientVital(removeVital);
    return { response: { status: 200, message: 'Patient vital Deleted' } };
  }
}
