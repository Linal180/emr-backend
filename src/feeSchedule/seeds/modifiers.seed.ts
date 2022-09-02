import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities, data
import { modifiersData } from "./seed-data";
import { Modifier } from "../entities/modifier.entity";


@Injectable()
export class CreateModifiers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add CPT Codes 
      const cptCodes = await getRepository(Modifier).find();
      if (!cptCodes.length) {
        const createCPTCodes = getRepository(Modifier).create(modifiersData)
        await queryRunner.manager.save(createCPTCodes);
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