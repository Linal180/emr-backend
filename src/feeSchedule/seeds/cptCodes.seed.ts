import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities, data
import { cptCodeData } from "./seed-data";
import { CPTCodes } from "../entities/cptCode.entity";

@Injectable()
export class CreateCPTCodes implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add CPT Codes 
      const cptCodes = await getRepository(CPTCodes).find();
      if (!cptCodes.length) {
        const createCPTCodes = getRepository(CPTCodes).create(cptCodeData)
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