import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//entity
import { ClaimStatus } from "../entities/claim-status.entity";
//seed data
import { systemClaimStatus } from './seed-data'

@Injectable()
export class CreateSystemClaimStatus implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add claim status  
      const claimStatuses = await getRepository(ClaimStatus).find();
      if (!claimStatuses?.length) {
        await Promise.all(systemClaimStatus?.map(async (item) => {
          let claimStatus = getRepository(ClaimStatus).create(item)
          await queryRunner.manager.save(claimStatus);
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