import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ICDCodes } from "../entities/icdcodes.entity";
import { SnoMedCodes } from "../entities/snowMedCodes.entity";
import { iCDCodesData } from './seed-data';
import { snowMedCodeOne } from './snoMedCodeOne';

@Injectable()
export class CreateICDCodes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add iCDCodes  
      let iCDCodes = await getRepository(ICDCodes).find();
      //limiting the seeder data 
      let iCDCodesDataLimited = iCDCodesData
      // if (!iCDCodes.length) {
      await Promise.all(iCDCodesDataLimited.map(async (item) => {
        const getICDCode = await getRepository(ICDCodes).findOne({ code: item.code, description: item.description })
        if (!getICDCode) {
          let icdCode = getRepository(ICDCodes).create(item)
          icdCode = await queryRunner.manager.save(icdCode);
        }
      }))
      // }
      //Add SnowMedCodes  
      let snowMedCodeCheck = await getRepository(SnoMedCodes).find();
      //limiting the seeder data 
      let snowMedCodeLimited = snowMedCodeOne
      if (!snowMedCodeCheck.length) {
        //Add SnowMedCodes  
        snowMedCodeLimited.map(async (item) => {
          let snowMedCodes = getRepository(SnoMedCodes).create(item)
          snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        })
        // snowMedCodeTwo.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeThree.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeFour.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeFive.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeSix.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeSeven.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeEight.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeNine.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
        // snoMedCodeTen.map( async (item)=> {
        //   let snowMedCodes = getRepository(SnoMedCodes).create(item)
        //   snowMedCodes = await queryRunner.manager.save(snowMedCodes);
        // })
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