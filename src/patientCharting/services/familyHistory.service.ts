import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { FamilyHistory } from "../entities/familyHistory.entity";
//inputs
import { CreateFamilyHistoryInput, UpdateFamilyHistoryInput } from "../dto/family-history.input";


@Injectable()
export class FamilyHistoryService {
	constructor(
		@InjectRepository(FamilyHistory)
		private familyHistoryRepo: Repository<FamilyHistory>,
		private readonly connection: Connection,
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
			const familyHistoryInstance = this.familyHistoryRepo.create(params);
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


	async update(params: UpdateFamilyHistoryInput): Promise<FamilyHistory> {
		const queryRunner = this.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const familyHistoryInstance = this.familyHistoryRepo.create(params);
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

}