//packages block
import { HttpStatus, NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//guards
import PermissionGuard from "src/users/auth/role.guard";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
//dto's, inputs
import { PatientConsentPayload } from "../dto/patient-consent.dto";
import { CreatePatientConsentInputs, PatientConsentInput, } from "../dto/patient-consent.input";
//entities
import { PatientConsent } from "../entities/patientConsent.entity";
import { Agreement } from "src/agreements/entities/agreement.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";
// services
import { PatientConsentService } from "../services/patientConsent.service";
import { AgreementService } from "src/agreements/services/agreement.service";
import { AppointmentService } from "src/appointments/services/appointment.service";


@Resolver(() => PatientConsent)
export class PatientConsentResolver {
	constructor(
		private readonly agreementService: AgreementService,
		private readonly appointmentService: AppointmentService,
		private readonly patientConsentService: PatientConsentService,
	) { }

	//queries

	@Query(() => PatientConsentPayload)
	@UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'findPatientConsent')
	async findPatientConsent(@Args('patientInput') patientInput: PatientConsentInput): Promise<PatientConsentPayload> {
		const { id } = patientInput
		const patientConsent = await this.patientConsentService.find(id)
		if (patientConsent) {
			return {
				patientConsent,
				response: {
					message: "OK", status: 200,
				}
			}
		}
		throw new NotFoundException({
			status: HttpStatus.NOT_FOUND,
			error: 'Patient consent not found',
		});
	}


	//mutations

	@Mutation(() => PatientConsentPayload)
	@UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updatePatientNoteInfoInputs')
	async createPatientConsent(@Args('createPatientConsentInputs')
	createPatientConsentInputs: CreatePatientConsentInputs): Promise<PatientConsentPayload> {
		return {
			patientConsent: await this.patientConsentService.create(createPatientConsentInputs),
			response: { status: 200, message: 'Patient notes updated successfully' }
		};
	}

	//resolve fields

	@ResolveField(() => [Agreement])
	async agreements(@Parent() patientConsent: PatientConsent): Promise<Agreement[]> {
		if (patientConsent) {
			return await this.agreementService.findAllAgreementsByPatientConsent(patientConsent.id);
		}
	}

	@ResolveField(() => Agreement)
	async appointment(@Parent() patientConsent: PatientConsent): Promise<Appointment> {
		if (patientConsent) {
			return await this.appointmentService.getAppointmentByPatientConsent(patientConsent.id);
		}
	}

}