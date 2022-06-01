import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { Contact } from "src/providers/entities/contact.entity";
import { Insurance, InsurancePayerType } from '../entities/insurance.entity';
import { InsuranceData } from './seed-data'
//class
@Injectable()
export class CreateInsurances implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const insurances = await getRepository(Insurance).find();
      if (!insurances.length) {
        for (let index = 0; index < InsuranceData.length; index++) {
          const insurance = InsuranceData[index];



          const insuranceObj = getRepository(Insurance).create({
            ...insurance,
            type: insurance.type === 'P' ? InsurancePayerType.P : InsurancePayerType.NP,
            enrollmentRequired: insurance.enrollmentRequired === 'Y',
            realTimeEligibility: insurance.realTimeEligibility === 'Y',
            realTimeClaimStatus: insurance.realTimeClaimStatus === 'Y',
            electronicRemittanceAdvice: insurance.electronicRemittanceAdvice === 'Y',
            secondaryCoordinationBenefits: insurance.secondaryCoordinationBenefits === 'Y'
          })

          const savedInsuranceObj = await queryRunner.manager.save(insuranceObj);

          const contactObj = getRepository(Contact).create({
            insuranceId: savedInsuranceObj.id,
            insurance: savedInsuranceObj
          })

          await queryRunner.manager.save(contactObj);
        }
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