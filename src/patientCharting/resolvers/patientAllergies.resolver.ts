import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreatePatientAllergyInput } from '../dto/create-patient-allergy.input';
import { PatientAllergyPayload } from '../dto/patient-allergy-payload.dto';
import { GetPatientVital, RemoveVital, UpdateVitalInput } from '../dto/update-vital.input';
import PatientVitalInput from '../dto/vital-input.dto';
import { PatientVitalPayload } from '../dto/vital-payload.dto';
import { PatientVitalsPayload } from '../dto/vitals-payload.dto';
import { PatientAllergies } from '../entities/patientAllergies.entity';
import { PatientAllergiesService } from '../services/patientAllergies.service';

@Resolver(() => PatientAllergies)
export class PatientAllergiesResolver {
  constructor(private readonly patientAllergiesService:  PatientAllergiesService) { }

  @Mutation(() => PatientAllergyPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'addPatientAllergy')
  async addPatientAllergy(@Args('createPatientAllergyInput') createPatientAllergyInput: CreatePatientAllergyInput) {
    return {
      patientAllergy: await this.patientAllergiesService.addPatientAllergy(createPatientAllergyInput),
      response: { status: 200, message: 'Patient Allergy created successfully' }
    };
  }

  // @Mutation(() => PatientVitalPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientVital')
  // async updatePatientVital(@Args('updateVitalInput') updateVitalInput: UpdateVitalInput) {
  //   return {
  //     patientVital: await this.vitalsService.updatePatientVital(updateVitalInput),
  //     response: { status: 200, message: 'Patient vital updated successfully' }
  //   };
  // }

  // @Query(returns => PatientVitalsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPatientVitals')
  // async findAllPatientVitals(@Args('patientVitalInput') patientVitalInput: PatientVitalInput): Promise<PatientVitalsPayload> {
  //   const patientVitals = await this.vitalsService.findAllPatientVitals(patientVitalInput)
  //   if (patientVitals) {
  //     return {
  //       ...patientVitals,
  //       response: {
  //         message: "OK", status: 200,
  //       }
  //     }
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'Vitals not found',
  //   });
  // }

  // @Query(returns => PatientVitalPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientVital')
  // async getPatientVital(@Args('getPatientVital') getPatientVital: GetPatientVital): Promise<PatientVitalPayload> {
  //   const patientVital = await this.vitalsService.GetPatientVital(getPatientVital.id)
  //   return {
  //     patientVital,
  //     response: { status: 200, message: 'Patient vital fetched successfully' }
  //   };
  // }

  // @Mutation(() => PatientVitalPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removePatientVital')
  // async removePatientVital(@Args('removeVital') removeVital: RemoveVital) {
  //   await this.vitalsService.removePatientVital(removeVital);
  //   return { response: { status: 200, message: 'Patient vital Deleted' } };
  // }
}
