import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//user imports
import { Element } from '../entities/element.entity';
import { Form } from "../entities/form.entity";
import { ElementTypeData, FormTemplates } from '../seeds/seed-data'
//class
@Injectable()
export class CreateElements implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
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

@Injectable()
export class CreateFormTemplate implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const queryRunner = connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const elements = await getRepository(Form).find();
			if (!elements.length) {
				for (let index = 0; index < FormTemplates.length; index++) {
					const element = FormTemplates[index];
					const eleObj = getRepository(Form).create(element)
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