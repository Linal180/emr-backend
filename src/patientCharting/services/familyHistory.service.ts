import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { FamilyHistory } from "../entities/familyHistory.entity";
//inputs
import { CreateFamilyHistoryInput, FindAllFamilyHistoryInput, UpdateFamilyHistoryInput } from "../dto/family-history.input";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PatientService } from "src/patients/services/patient.service";
import { FamilyHistoryRelativeService } from "./familyHistoryRelative.service";
//payloads
import { FamilyHistoriesPayload } from "../dto/family-history.payload";

@Injectable()
export class FamilyHistoryService {
	constructor(
		@InjectRepository(FamilyHistory)
		private familyHistoryRepo: Repository<FamilyHistory>,
		private readonly connection: Connection,
		private readonly familyHistoryRelativeService: FamilyHistoryRelativeService,
		private readonly patientService: PatientService,
		private readonly utilsService: UtilsService,
		private readonly paginationService: PaginationService,
	) { }


	/**
	 * Creates family history service
	 * @param params 
	 * @returns create 
	 */
	async create(params: CreateFamilyHistoryInput): Promise<FamilyHistory> {
		const queryRunner = this.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const { familyHistoryRelatives, patientId, name } = params || {}

			//get patient
			const patientResponse = await this.patientService.GetPatient(patientId);
			const { patient } = patientResponse || {}

			//create family history relatives
			const familyHistoryRelativesInstance = await Promise.all(familyHistoryRelatives?.map(async (instance) => {
				const familyHistoryRelative = await this.familyHistoryRelativeService.create(instance);
				return familyHistoryRelative
			}));

			//create family history
			const familyHistoryInstance = this.familyHistoryRepo.create({ name, patientId });

			//associate family history relative
			familyHistoryInstance.familyHistoryRelatives = familyHistoryRelativesInstance;

			//associate patient 
			familyHistoryInstance.patient = patient

			//save family history
			const familyHistory = await this.familyHistoryRepo.save(familyHistoryInstance)

			await queryRunner.commitTransaction();
			return familyHistory
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await queryRunner.release();
		}
	}

	/**
	 * Finds one
	 * @param id 
	 * @returns one 
	 */
	async findOne(id: string): Promise<FamilyHistory> {
		return await this.familyHistoryRepo.findOne(id)
	}

	/**
	 * Updates family history service
	 * @param params 
	 * @returns update 
	 */
	async update(params: UpdateFamilyHistoryInput): Promise<FamilyHistory> {
		const queryRunner = this.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const { id, familyHistoryRelatives } = params || {}
			const familyHistory = await this.findOne(id);
			//create family history relatives
			const familyHistoryRelativesInstance = await Promise.all(familyHistoryRelatives?.map(async (instance) => {
				const { id, ...rest } = instance || {}
				if (id) {
					const familyHistoryRelative = await this.familyHistoryRelativeService.update(instance);
					return familyHistoryRelative
				}
				const familyHistoryRelative = await this.familyHistoryRelativeService.create(rest);
				return familyHistoryRelative
			}));
			//associates
			familyHistory.familyHistoryRelatives = familyHistoryRelativesInstance;
			//save family history
			const familyHistoryInstance = await this.familyHistoryRepo.save(familyHistory)
			await queryRunner.commitTransaction();
			return familyHistoryInstance
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await queryRunner.release();
		}
	}


	/**
	 * Finds by patient id
	 * @param patientId 
	 * @returns by patient id 
	 */
	async findByPatientId(patientId: string): Promise<FamilyHistory[]> {
		return await this.familyHistoryRepo.find({ patientId });
	}


	async findAll(params: FindAllFamilyHistoryInput): Promise<FamilyHistoriesPayload> {
		try {
			const {paginationOptions} = params
		  const paginationResponse = await this.paginationService.willPaginate<FamilyHistory>(this.familyHistoryRepo, { paginationOptions })
		  return {
			pagination: {
			  ...paginationResponse
			},
			familyHistories: paginationResponse.data,
		  }
		} catch (error) {
		  throw new InternalServerErrorException(error);
		}
	  }

}