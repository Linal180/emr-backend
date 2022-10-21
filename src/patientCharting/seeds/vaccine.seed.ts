import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { NDC } from "../entities/ndc.entity";
import { MVX } from "../entities/mvx.entity";
import { CVX } from "../entities/cvx.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";
import { CPTCodes } from "src/feeSchedule/entities/cptCode.entity";
//data
import { ndcData } from './ndc-data'
import { cvxData } from './cvx-data'
import { mvxData } from './mvx-data'
import { cptCvxData } from './cpt-cvx-data'
import { vaccineProductData } from './vaccine-product-data';
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";

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
      const cptCodeRepo = getRepository(CPTCodes);
      const vaccineProductRepo = getRepository(VaccineProduct);
      const ndcVaccineProductRepo = getRepository(NdcVaccineProduct);

      //create cvx
      const oldCvxs = await cvxRepo.find();
      if (!oldCvxs?.length) {

        await Promise.all(cvxData?.map(async (item) => {
          //create cvx
          const cvxInstance = cvxRepo.create({ ...item, cvxCode: `${item?.cvxCode}`, systematic: true });
          //save cvx
          return await cvxRepo.save(cvxInstance)
        }))
      }

      //create mvxs
      const oldMvxs = await mvxRepo.find();
      if (!oldMvxs?.length) {
        await Promise.all(mvxData?.map(async (item) => {
          //create mvx
          const mvxInstance = mvxRepo.create({ ...item, systematic: true });
          //save cvx
          return await mvxRepo.save(mvxInstance)
        }))
      }

      //create ndcs
      const oldNdcs = await ndcRepo.find();
      if (!oldNdcs?.length) {
        await Promise.all(ndcData?.map(async (item) => {
          const { ndcCode } = item
          //create ndc
          const ndcInstance = ndcRepo.create({ code: ndcCode, systematic: true });
          //save ndc
          return await ndcRepo.save(ndcInstance)
        }))
      }

      //create vaccine product
      const oldVaccineProduct = await vaccineProductRepo.find();
      if (!oldVaccineProduct?.length) {
        await Promise.all(vaccineProductData?.map(async (item) => {
          const { cvxCode, name, status, updateDate, mvxCode } = item
          //create ndc
          const vaccineProductInstance = vaccineProductRepo.create({ updateDate, status, name, cvxCode, mvxCode, systematic: true });
          //get mvx 
          const mvxInstance = await mvxRepo.findOne({ mvxCode });
          //associate mvx
          if (mvxInstance) {
            vaccineProductInstance.mvx = mvxInstance;
            vaccineProductInstance.mvxId = mvxInstance?.id;
          }
          //get cvx 
          const cvxInstance = await cvxRepo.findOne({ cvxCode });
          //associate cvx
          if (cvxInstance) {
            vaccineProductInstance.cvx = cvxInstance;
            vaccineProductInstance.cvxId = cvxInstance?.id;
          }
          //save ndc
          return await vaccineProductRepo.save(vaccineProductInstance)
        }))
      }

      // associate cpt code to the  cvx code 
      for (let index = 0; index < cptCvxData.length; index++) {
        const cptCvx = cptCvxData[index];
        const { cptCode, cptDescription, cvxCode, cvxDescription } = cptCvx;
        //fetch cpt code
        let cptCodeInstance = await cptCodeRepo.findOne({ code: cptCode });
        //create cpt code if not found
        if (!cptCode) {
          const cptCodeIns = cptCodeRepo?.create({ code: cptCode, shortDescription: cptDescription, systematic: true });
          cptCodeInstance = await cptCodeRepo.save(cptCodeIns)
        }
        //fetch cvx code 
        let cvxInstance = await cvxRepo.findOne({ cvxCode });
        //create cvx code if not found
        if (!cvxInstance) {
          const cvxIns = cvxRepo?.create({ cvxCode, shortDescription: cvxDescription, name: "", systematic: true });
          cvxIns.cptCode = cptCodeInstance
          cvxIns.cptCodeId = cptCodeInstance?.id
          cvxInstance = await cptCodeRepo.save(cvxIns)
        } else {
          cvxInstance.cptCode = cptCodeInstance
          cvxInstance.cptCodeId = cptCodeInstance?.id
          cvxInstance = await cptCodeRepo.save(cvxInstance)
        }
      }

      //create relationship vaccine product with ndc code 
      for (let index = 0; index < ndcData.length; index++) {
        const element = ndcData[index];
        const { cvxCode, ndcCode, mvxCode } = element
        //fetch vaccine Product
        const vaccineProductInstance = await vaccineProductRepo.findOne({ cvxCode, mvxCode });
        //fetch ndc Code
        const ndcCodeInstance = await ndcRepo.findOne({ code: ndcCode });
        //create ndc vaccine Product
        const ndcVaccineProduct = ndcVaccineProductRepo.create({ ndcCodeId: ndcCodeInstance?.id, vaccineProductId: vaccineProductInstance?.id });
        //assign ndc code
        ndcVaccineProduct.ndcCode = ndcCodeInstance
        //assign vaccine Product
        ndcVaccineProduct.vaccineProduct = vaccineProductInstance
        //save ndc vaccine Product
        await ndcVaccineProductRepo.save(ndcVaccineProduct)
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