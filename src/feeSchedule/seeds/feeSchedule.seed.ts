import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities, data
import { cptFeeScheduleData, expressFeeSchedule } from "./seed-data";
import { FeeSchedule } from "../entities/feeSchedule.entity";
import { Practice } from "src/practice/entities/practice.entity";
import { seedPractice } from "src/lib/constants";
import { PracticeInfo } from "src/practice/seeds/practiceSeed-data";
import { CptFeeSchedule } from "../entities/cptFeeSchedule.entity";

@Injectable()
export class CreateFeeSchedule implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let practice: null | Practice = null;
      //repos
      const feeRepo = await getRepository(FeeSchedule);
      const cptFeeRepo = await getRepository(CptFeeSchedule);
      const practiceRepo = await getRepository(Practice)
      //Add practice 
      const oldPractice = await practiceRepo.findOne({ practiceId: seedPractice.EXPRESS_HEALTH_CARE });
      if (oldPractice) {
        practice = oldPractice;
      }
      else {
        const newPractice = await practiceRepo.create(PracticeInfo)
        practice = await practiceRepo.save(newPractice)
      }

      if (practice) {
        //fee schedule
        const oldFeeSchedule = await feeRepo.find({ practiceId: practice?.id })
        if (!oldFeeSchedule?.length) {
          const feeSchedules = await Promise.all(expressFeeSchedule?.map(async ({ name }) => {
            const newFeeSchedule = feeRepo.create({ name })
            newFeeSchedule.practice = practice
            newFeeSchedule.practiceId = practice.id
            //create cpt fee schedule
            newFeeSchedule.cptFeeSchedule = await Promise.all(cptFeeScheduleData?.map(async (item) => {
              const cptFeeSchedule = cptFeeRepo.create({ ...item, code: item?.cptCode });
              return await cptFeeRepo.save(cptFeeSchedule);
            }))
            await feeRepo.save(newFeeSchedule)
            return newFeeSchedule
          }))

          await queryRunner.manager.save(feeSchedules);
        }
      }
      else {
        throw new Error("Practice not found");
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