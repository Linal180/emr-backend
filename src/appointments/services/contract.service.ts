//packages block
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entity, inputs types,
import { Contract } from "../entities/contract.entity";
import { CreateContractInput, UpdateContractInput } from "../dto/contract.input";

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


  /**
   * Updates contract service
   * @param input 
   * @returns update 
   */
  async update(input: UpdateContractInput): Promise<Contract> {
    try {
      return await this.contractRepo.save(input)
      
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}