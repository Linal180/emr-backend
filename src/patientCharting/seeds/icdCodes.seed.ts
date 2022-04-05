import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ICDCodes } from "../entities/icdcodes.entity";
import { SnoMedCodes } from "../entities/snowmedCodes.entity";
import { iCDCodesData, snowMedCodesData } from './seed-data';

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
      
       //Add SnowMedCodes  
       let snowMedCodeCheck = await getRepository(SnoMedCodes).find();
       if (!snowMedCodeCheck.length) {
        snowMedCodesData.map( async (item)=> {
           let snowMedCodes = getRepository(SnoMedCodes).create(item)
           snowMedCodes = await queryRunner.manager.save(snowMedCodes);
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