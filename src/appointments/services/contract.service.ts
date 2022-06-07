//packages block
import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entity, inputs types,
import { Contract } from "../entities/contract.entity";
import { CreateContractInput } from "../dto/contract.input";

@Injectable()
export class ContractService {
  constructor(@InjectRepository(Contract) private contractRepo: Repository<Contract>) { }

  /**
   * Creates contract service
   * @param input 
   * @returns create 
   */
  async create(input: CreateContractInput): Promise<Contract> {
    try {
      const contract = this.contractRepo.create(input)
      return await this.contractRepo.save(contract)
      
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}