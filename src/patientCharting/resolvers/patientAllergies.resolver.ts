import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Staff } from 'src/providers/entities/staff.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { PatientAllergiesPayload } from '../dto/patient-allergiess-payload.dto';
import PatientAllergyInput from '../dto/patient-allergy-input.dto';
import { CreatePatientAllergyInput } from '../dto/create-patient-allergy.input';
import { PatientAllergyPayload } from '../dto/patient-allergy-payload.dto';
import { GetPatientAllergy, RemovePatientAllergy, UpdateAllergyInput } from '../dto/update-allergy.input';
import { PatientAllergies } from '../entities/patientAllergies.entity';
import { PatientAllergiesService } from '../services/patientAllergies.service';
import AllergyInput from '../dto/allergy-input.dto';
import { AllergiesPayload } from '../dto/allergiess-payload.dto';

@Resolver(() => PatientAllergies)
export class PatientAllergiesResolver {
  constructor(private readonly patientAllergiesService:  PatientAllergiesService,
    private readonly staffService:  StaffService,
    private readonly appointmentService:  AppointmentService,
    private readonly doctorService:  DoctorService) { }

  @Mutation(() => PatientAllergyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'addPatientAllergy')
  async addPatientAllergy(@Args('createPatientAllergyInput') createPatientAllergyInput: CreatePatientAllergyInput) {
    return {
      patientAllergy: await this.patientAllergiesService.addPatientAllergy(createPatientAllergyInput),
      response: { status: 200, message: 'Patient Allergy created successfully' }
    };
  }

  @Mutation(() => PatientAllergyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientAllergy')
  async updatePatientAllergy(@Args('updateAllergyInput') updateAllergyInput: UpdateAllergyInput) {
    return {
      patientAllergy: await this.patientAllergiesService.updatePatientAllergy(updateAllergyInput),
      response: { status: 200, message: 'Patient allergy updated successfully' }
    };
  }

  @ResolveField((returns) => [Staff])
  async staff(@Parent() patientAllergies: PatientAllergies):  Promise<Staff>  {
    if (patientAllergies && patientAllergies.staffId) {
      return await this.staffService.findOne(patientAllergies.staffId);
    }
  }

  @ResolveField((returns) => [Appointment])
  async appointment(@Parent() patientAllergies: PatientAllergies):  Promise<Appointment>  {
    if (patientAllergies && patientAllergies.appointmentId) {
      return await this.appointmentService.findOne(patientAllergies.appointmentId);
    }
  }

  @ResolveField((returns) => [Doctor])
  async doctor(@Parent() patientAllergies: PatientAllergies):  Promise<Doctor>  {
    if (patientAllergies && patientAllergies.doctorId) {
      return await this.doctorService.findOne(patientAllergies.doctorId);
    }
  }
  
  @Query(returns => PatientAllergiesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllPatientAllergies')
  async findAllPatientAllergies(@Args('patientAllergyInput') patientAllergyInput: PatientAllergyInput): Promise<PatientAllergiesPayload> {
    const patientAllergies = await this.patientAllergiesService.findAllPatientAllergies(patientAllergyInput)
    if (patientAllergies) {
      return {
        ...patientAllergies,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Allergies not found',
    });
  }

  @Query(returns => AllergiesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllAllergies')
  async findAllAllergies(@Args('allergyInput') allergyInput: AllergyInput): Promise<AllergiesPayload> {
    const allergies = await this.patientAllergiesService.findAllAllergies(allergyInput)
    if (allergies) {
      return {
        ...allergies,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Allergies not found',
    });
  }

  
  @Query(returns => PatientAllergyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientAllergy')
  async getPatientAllergy(@Args('getPatientAllergy') getPatientAllergy: GetPatientAllergy): Promise<PatientAllergyPayload> {
    const patientAllergy = await this.patientAllergiesService.GetPatientAllergy(getPatientAllergy.id)
    return {
      patientAllergy,
      response: { status: 200, message: 'Patient allergy fetched successfully' }
    };
  }

  @Mutation(() => PatientAllergyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatientAllergy')
  async removePatientAllergy(@Args('removePatientAllergy') removePatientAllergy: RemovePatientAllergy) {
    await this.patientAllergiesService.removePatientAllergy(removePatientAllergy);
    return { response: { status: 200, message: 'Patient allergy deleted' } };
  }
}
