import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from "@nestjs/common";
//guards
import PermissionGuard from "src/users/auth/role.guard";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
//payloads
import { DoctorPatientsInput } from "../dto/patient-input.dto";
import { DoctorPatientsPayload } from "../dto/patients-payload.dto";
//entities
import { Patient } from "../entities/patient.entity";
import { DoctorPatient } from "../entities/doctorPatient.entity";
//services
import { PatientService } from "../services/patient.service";
import { DoctorPatientService } from "../services/doctorPatient.service";

@Resolver(() => DoctorPatient)
export class DoctorPatientResolver {
  constructor(private readonly patientService: PatientService,
    private readonly doctorPatientService: DoctorPatientService,
  ) { }

  //queries

  @Query(() => DoctorPatientsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllDoctorPatients')
  async findAllDoctorPatients(@Args('doctorPatientsInput') doctorPatientsInput: DoctorPatientsInput): Promise<DoctorPatientsPayload> {
    const patients = await this.doctorPatientService.findAllDoctorPatients(doctorPatientsInput)
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

  //resolve fields

  @ResolveField(() => Patient)
  async patient(@Parent() doctorPatient: DoctorPatient): Promise<Patient> {
    if (doctorPatient) {
      const newPatient = await this.patientService.GetPatient(doctorPatient?.patientId);
      const { patient } = newPatient
      return patient
    }
  }

}