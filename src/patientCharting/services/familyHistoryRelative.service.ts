import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { FamilyHistoryRelative } from "../entities/familyHistoryRelative.entity";
//inputs
import { CreateFamilyHistoryRelativeInput, UpdateFamilyHistoryRelativeInput } from "../dto/family-history-relative.input";
//Services
import { UtilsService } from "src/util/utils.service";

@Injectable()
export class FamilyHistoryRelativeService {
	constructor(
		@InjectRepository(FamilyHistoryRelative)
		private familyHistoryRelativeRepo: Repository<FamilyHistoryRelative>,
		private readonly utilsService: UtilsService
	) { }

	/**
	 * Creates family history relative service
	 * @param params 
	 * @returns create 
	 */
	async create(params: CreateFamilyHistoryRelativeInput): Promise<FamilyHistoryRelative> {
		const familyHistoryRelativeInstance = this.familyHistoryRelativeRepo.create(params);
		const familyHistoryRelative = await this.familyHistoryRelativeRepo.save(familyHistoryRelativeInstance)
		return familyHistoryRelative
	}

	/**
	 * Updates family history relative service
	 * @param params 
	 * @returns update 
	 */
	async update(params: UpdateFamilyHistoryRelativeInput): Promise<FamilyHistoryRelative> {
		const { id } = params || {}
		const familyHistoryRelative = await this.utilsService.updateEntityManager(FamilyHistoryRelative, id, params, this.familyHistoryRelativeRepo)
		return familyHistoryRelative
	}

	/**
	 * Finds one
	 * @param id 
	 * @returns one 
	 */
	async findOne(id: string): Promise<FamilyHistoryRelative> {
		return await this.familyHistoryRelativeRepo.findOne(id)
	}


	/**
	 * Finds by family id
	 * @param familyHistoryId 
	 * @returns by family id 
	 */
	async findByFamilyId(familyHistoryId: string): Promise<FamilyHistoryRelative[]> {
		return await this.familyHistoryRelativeRepo.find({ familyHistoryId })
	}


	/**
	 * Removes by family history id
	 * @param id 
	 */
	async removeByFamilyHistoryId(id: string) {
		const familyRelatives = await this.findByFamilyId(id);
		await this.familyHistoryRelativeRepo.remove(familyRelatives)
	}
}