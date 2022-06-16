import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginationService } from "src/pagination/pagination.service";
import { DoctorPatientsInput } from "../dto/patient-input.dto";
import { DoctorPatientsPayload } from "../dto/patients-payload.dto";
import { DoctorPatient } from "../entities/doctorPatient.entity";


@Injectable()
export class DoctorPatientService {
	constructor(@InjectRepository(DoctorPatient)
	private doctorPatientRepository: Repository<DoctorPatient>,
		private readonly paginationService: PaginationService,
	) { }

	async findAllDoctorPatients(doctorPatientsInput: DoctorPatientsInput): Promise<DoctorPatientsPayload> {
		try {
			const paginationResponse = await this.paginationService.willPaginate<DoctorPatient>(this.doctorPatientRepository, { ...doctorPatientsInput, relationField: 'patient' })
			console.log('paginationResponse => ', paginationResponse)
			return {
				pagination: {
					...paginationResponse
				},
				doctorPatients: paginationResponse.data,
			}
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

}