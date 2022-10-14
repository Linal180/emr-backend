import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//entities
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";


export class NdcVaccineProductService {
  constructor(
    @InjectRepository(NdcVaccineProduct)
    private ndcVaccineProductRepo: Repository<NdcVaccineProduct>,
  ) { }


  
  /**
   * Finds by vaccine id
   * @param vaccineProductId 
   * @returns by vaccine id 
   */
  async findByVaccineId(vaccineProductId: string): Promise<NdcVaccineProduct[]> {
    try {
      return await this.ndcVaccineProductRepo.find({ vaccineProductId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}