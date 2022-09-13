import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { FamilyHistoryRelative } from "../entities/familyHistoryRelative.entity";
//inputs
import { CreateFamilyHistoryRelativeInput, UpdateFamilyHistoryRelativeInput } from "../dto/family-history-relative.input";


@Injectable()
export class FamilyHistoryRelativeService {
	constructor(
		@InjectRepository(FamilyHistoryRelative)
		private FamilyHistoryRelativeRepo: Repository<FamilyHistoryRelative>,
	) { }

	/**
	 * Creates family history relative service
	 * @param params 
	 * @returns create 
	 */
	async create(params: CreateFamilyHistoryRelativeInput): Promise<FamilyHistoryRelative> {
		const familyHistoryRelativeInstance = this.FamilyHistoryRelativeRepo.create(params);
		const familyHistoryRelative = await this.FamilyHistoryRelativeRepo.save(familyHistoryRelativeInstance)
		return familyHistoryRelative
	}

	/**
	 * Updates family history relative service
	 * @param params 
	 * @returns update 
	 */
	async update(params: UpdateFamilyHistoryRelativeInput): Promise<FamilyHistoryRelative> {
		const familyHistory = await this.FamilyHistoryRelativeRepo.save(params)
		return familyHistory
	}

}