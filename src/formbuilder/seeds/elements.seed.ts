import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { Element } from '../entities/element.entity';
import { ElementTypeData } from '../seeds/seed-data'
//class
@Injectable()
export class CreateElements implements Seeder {
	public async run(_: Factory, connection: Connection): Promise<void> {
		const queryRunner = connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const elements = await getRepository(Element).find();
			if (!elements.length) {
				for (let index = 0; index < ElementTypeData.length; index++) {
					const element = ElementTypeData[index];
					const eleObj = getRepository(Element).create(element)
					await queryRunner.manager.save(eleObj);
				}
			}
			await queryRunner.commitTransaction();
		}
		catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await queryRunner.release();
		}
	}
}
