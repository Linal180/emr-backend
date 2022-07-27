import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { Insurance } from '../entities/insurance.entity';
import { Contact } from "src/providers/entities/contact.entity";
//seed data
import { InsuranceData } from './seed-data'
//class
@Injectable()
export class CreateInsurances implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const insuranceRepo = getRepository(Insurance)
      const insurances = await insuranceRepo.find();
      if (!insurances.length) {
        for (let index = 0; index < InsuranceData.length; index++) {
          const insurance = InsuranceData[index];
          const {
            attachment, claimFee, electronicRemittanceAdvice, eligibility, payerId, payerName, remitFee,
            secondaryCoordinationBenefits, state, type, ubClaims, workersComp, payerAltNames
          } = insurance || {}
          const insuranceObj = insuranceRepo.create({
            attachment, claimFee, electronicRemittanceAdvice, eligibility, payerId, payerName, remitFee,
            secondaryCoordinationBenefits, state, type, ubClaims, workersComp
          })
          if (payerAltNames?.length) {
            await Promise.all(payerAltNames?.map(async (altName) => {
              const { altPayerId, altPayerName } = altName || {}
              const alternativePayer = insuranceRepo.create({
                attachment, claimFee, electronicRemittanceAdvice, eligibility, payerId: altPayerId ? altPayerId : payerId,
                payerName: altPayerName ? altPayerName : payerName, remitFee,
                secondaryCoordinationBenefits, state, type, ubClaims, workersComp
              })
              return await queryRunner.manager.save(alternativePayer);
            }))
          }

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