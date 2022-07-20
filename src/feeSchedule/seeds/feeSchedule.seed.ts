import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities, data
import { feeScheduleData } from "./seed-data";
import { FeeSchedule } from "../entities/feeSchedule.entity";

@Injectable()
export class CreateFeeSchedule implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Fee Schedules 
      const feeSchedules = await getRepository(FeeSchedule).find();
      if (!feeSchedules.length) {
        const createFeeSchedule = getRepository(FeeSchedule).create(feeScheduleData)
        await queryRunner.manager.save(createFeeSchedule);
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