import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ICDCodes } from "../entities/icdcodes.entity";
import { SnoMedCodes } from "../entities/snowmedCodes.entity";
import { iCDCodesData } from './seed-data';
import {snowMedCodeOne} from './snoMedCodeOne'
import {snowMedCodeTwo} from './snowMedCodeTwo'
import {snoMedCodeThree} from './snoMedCodeThree'
import {snoMedCodeFour} from './snoMedCodeFour'
import {snoMedCodeFive} from './snoMedCodeFive'
import {snoMedCodeSix} from './snoMedCodeSix'
import {snoMedCodeSeven} from './snoMedCodeSeven'
import {snoMedCodeEight} from './snoMedCodeEight'
import {snoMedCodeNine} from './snoMedCodeNine'
import {snoMedCodeTen} from './snoMedCodeTen'

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
      let iCDCodesDataLimited = iCDCodesData.slice(0, 1000)
      if (!iCDCodes.length) {
        iCDCodesDataLimited.map( async (item)=> {
          let icdCode = getRepository(ICDCodes).create(item)
          icdCode = await queryRunner.manager.save(icdCode);
        })
      }
        //Add SnowMedCodes  
        let snowMedCodeCheck = await getRepository(SnoMedCodes).find();
        if (!snowMedCodeCheck.length) {
       //Add SnowMedCodes  
        snowMedCodeOne.map( async (item)=> {
           let snowMedCodes = getRepository(SnoMedCodes).create(item)
           snowMedCodes = await queryRunner.manager.save(snowMedCodes);
         })
          snowMedCodeTwo.map( async (item)=> {
            let snowMedCodes = getRepository(SnoMedCodes).create(item)
            snowMedCodes = await queryRunner.manager.save(snowMedCodes);
          })
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