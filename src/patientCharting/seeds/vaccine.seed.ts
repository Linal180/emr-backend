import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { NDC } from "../entities/ndc.entity";
import { MVX } from "../entities/mvx.entity";
import { CVX } from "../entities/cvx.entity";
//data
import { cvxData, mvxData, ndcData } from './vaccine-data'

@Injectable()
export class CreateVaccine implements Seeder {

  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      //repos
      const ndcRepo = getRepository(NDC);
      const mvxRepo = getRepository(MVX);
      const cvxRepo = getRepository(CVX);

      //create cvx
      const oldCvxs = await cvxRepo.find();
      if (!oldCvxs?.length) {
        console.log('cvxData =>', cvxData.length)
        await Promise.all(cvxData?.map(async (item) => {
          //create cvx
          const cvxInstance = cvxRepo.create(item);
          //save cvx
          return await cvxRepo.save(cvxInstance)
        }))
      }

      //create mvxs
      const oldMvxs = await mvxRepo.find();
      if (!oldMvxs?.length) {
        console.log('mvxData =>', mvxData.length)

        await Promise.all(mvxData?.map(async (item) => {
          const { cvxCode } = item
          //create mvx
          const mvxInstance = mvxRepo.create(item);
          //find cvx 
          const cvxInstance = await cvxRepo.findOne({ cvxCode })
          //associate cvx
          mvxInstance.cvx = cvxInstance;
          mvxInstance.cvxId = cvxInstance?.id
          //save cvx
          return await mvxRepo.save(mvxInstance)
        }))
      }

      //create ndcs
      const oldNdcs = await ndcRepo.find();
      if (!oldNdcs?.length) {
        console.log('ndcData =>', ndcData.length)

        await Promise.all(ndcData?.map(async (item) => {
          const { cvxCode, mvxCode } = item
          //create ndc
          const ndcInstance = ndcRepo.create(item);
          //find mvx 
          const mvxInstance = await mvxRepo.findOne({ mvxCode, cvxCode })
          //associate mvx
          ndcInstance.mvx = mvxInstance;
          ndcInstance.mvxId = mvxInstance?.id
          //save ndc
          return await ndcRepo.save(ndcInstance)
        }))
      }

      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}