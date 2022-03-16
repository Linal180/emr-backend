import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreatePatientInput } from '../dto/create-patient.input';
import { PatientInfoInput } from '../dto/patient-info.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientInviteInput } from '../dto/patient-invite.input';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientProfileInput } from '../dto/update-patient-profile.input';
import { UpdatePatientProvider } from '../dto/update-patient-provider.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { GetPatient, RemovePatient } from '../dto/update-patientItem.input';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Patient } from '../entities/patient.entity';
import { PatientService } from '../services/patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService,
    private readonly doctorService: DoctorService) { }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return {
      patient: await this.patientService.createPatient(createPatientInput),
      response: { status: 200, message: 'Patient created successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  async patientInfo(@Args('patientInfoInput') patientInfoInput: PatientInfoInput) {
    return {
      patient: await this.patientService.patientInfo(patientInfoInput),
      response: { status: 200, message: 'Patient info added successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  // @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    return {
      patient: await this.patientService.updatePatient(updatePatientInput),
      response: { status: 200, message: 'Patient updated successfully' }
    };
  }


  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['patient'])
  async updatePatientProfile(@Args('updatePatientProfileInput') updatePatientProfileInput: UpdatePatientProfileInput) {
    return {
      patient: await this.patientService.updatePatientProfile(updatePatientProfileInput),
      response: { status: 200, message: 'Patient profile updated successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  // @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async sendInviteToPatient(@Args('patientInviteInput') patientInviteInput: PatientInviteInput) {
    return {
      patient: await this.patientService.sendInviteToPatient(patientInviteInput),
      response: { status: 200, message: 'Invite sent to patient successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updatePatientProvider(@Args('updatePatientProvider') updatePatientProvider: UpdatePatientProvider) {
    return {
      patient: await this.patientService.updatePatientProvider(updatePatientProvider),
      response: { status: 200, message: 'Patient Provider updated successfully' }
    };
  }

  @ResolveField((returns) => [Doctor])
  async doctorPatients(@Parent() patient: Patient): Promise<DoctorPatient[]> {
    console.log("patient",patient);
    if (patient) {
      const provider = await this.patientService.usualProvider(patient.id);
      return provider;
    }
  }

  @Query(returns => PatientsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin','admin'])
  async findAllPatient(@Args('patientInput') patientInput: PatientInput): Promise<PatientsPayload> {
    const patients = await this.patientService.findAllPatients(patientInput)
    if (patients) {
      return {
        ...patients,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient not found',
    });
  }

  @Query(returns => PatientPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async getPatient(@Args('getPatient') getPatient: GetPatient): Promise<PatientPayload> {
    const patients = await this.patientService.GetPatient(getPatient.id)
    return {
      ...patients,
      response: { status: 200, message: 'Patient fetched successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin'])
  async removePatient(@Args('removePatient') removePatient: RemovePatient) {
    await this.patientService.removePatient(removePatient);
    return { response: { status: 200, message: 'Patient Deleted' } };
  }
}
