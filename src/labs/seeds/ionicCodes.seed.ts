import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { LoincCodes } from "../entities/loincCodes.entity";
import { SpecimenTypes } from "../entities/specimenTypes.entity";
import {loincCodesData} from './ioinc-codes-data';
import {specimenTypesData} from './spciment-type-data';

@Injectable()
export class CreateloincCodesData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try { 
      //Check loinc codes  
      let loincCodes = await getRepository(LoincCodes).find();
      if (!loincCodes.length) {
        loincCodesData.map( async (item)=> { 
          let loincCode = getRepository(LoincCodes).create(item)
          loincCode = await queryRunner.manager .save(loincCode);
        })
      }
       //Check specimen types  
       let specimenTypes = await getRepository(SpecimenTypes).find();
       if (!specimenTypes.length) {
        specimenTypesData.map( async (item)=> { 
           let specimenType = getRepository(SpecimenTypes).create(item)
           specimenType = await queryRunner.manager.save(specimenType);
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