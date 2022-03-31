import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ICDCodes } from "../entities/icdcodes.entity";
import { iCDCodesData } from './seed-data';

@Injectable()
export class CreateICDCodes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try { 
      //Add iCDCodes  
      let iCDCodes = await getRepository(ICDCodes).find();
      if (!iCDCodes.length) {
        iCDCodesData.map( async (item)=> {
          let icdCode = getRepository(ICDCodes).create(item)
          icdCode = await queryRunner.manager.save(icdCode);
        })
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