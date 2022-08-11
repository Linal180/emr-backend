import { S3 } from "aws-sdk";
import axios from 'axios'
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { LoincCodes } from "../entities/loincCodes.entity";
import { SpecimenTypes } from "../entities/specimenTypes.entity";
import { loincCodesData } from './loinc-codes-data';
import { specimenTypesData } from './specimen-type-data';

@Injectable()
export class CreateLoincCodesData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < 10; i++) {
        var s3 = new S3({ apiVersion: '2006-03-01' });
        var params = { Bucket: 'INSERT_BUCKET_NAME_FROM_ENV', Key: `lab/LoincJSON${i + 1}.json` };
        const response = await s3.getSignedUrl("getObject", params)
        const response1 = await axios.get(response, {
          responseType: 'blob'
        });

        const file = response1.data;

        console.log("\n file", file[1000], i+1)

        await Promise.all(file.map(async (item) => {
          const getLoincCode = await getRepository(LoincCodes).findOne({ loincNum: item.loincNum })
          if (!getLoincCode) {
            let loincCode = getRepository(LoincCodes).create(item)
            await queryRunner.manager.save(loincCode);
          }
        }))

        //Check specimen types  
        let specimenTypes = await getRepository(SpecimenTypes).find();
        await Promise.all(specimenTypesData.map(async (item) => {
          const getSpecimenType = await getRepository(SpecimenTypes).findOne({ name: item.name })
          if (!getSpecimenType) {
            let specimenType = getRepository(SpecimenTypes).create(item)
            await queryRunner.manager.save(specimenType);
          }
        }))
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