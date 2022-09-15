import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Medications } from "../entities/medications.entity";
import { medicationsData } from './medications-data';

@Injectable()
export class CreateMedications implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Medications  

      const transformedMedicationsData = medicationsData.reduce((acc, medications) => {
        const fullNameStrings = medications.fullName.split(" / ")
        const transformedMedications = fullNameStrings.map(value => {
          return {
            ...medications,
            fullName: value.replace(/[{}]/g, ''),
          }
        })

        acc.push(...transformedMedications)
        return acc
      }, [])

      await Promise.all(transformedMedicationsData.map(async (item) => {
        const getMedication = await getRepository(Medications).findOne({ where: { fullName: item.fullName } })
        if (!getMedication) {
          let medication = getRepository(Medications).create(item)
          medication = await queryRunner.manager.save(medication);
        }
      }))

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