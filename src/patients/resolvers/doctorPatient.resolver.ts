import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { DoctorPatientsInput } from "../dto/patient-input.dto";
import { DoctorPatientsPayload } from "../dto/patients-payload.dto";
import { DoctorPatient } from "../entities/doctorPatient.entity";
import { Patient } from "../entities/patient.entity";
import { DoctorPatientService } from "../services/doctorPatient.service";
import { PatientService } from "../services/patient.service";

@Resolver(() => DoctorPatient)
export class DoctorPatientResolver {
	constructor(private readonly patientService: PatientService,
		private readonly doctorPatientService: DoctorPatientService,
	) { }

	//queries


	@Query(() => DoctorPatientsPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'findAllDoctorPatients')
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