import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entity
import { Claim } from "../entities/claim.entity";
//inputs
import { CreateClaimInput } from "../dto/claim-input.dto";


@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,
  ) { }

  /**
   * Creates claim service
   * @param params 
   * @returns create 
   */
  async create(params: CreateClaimInput): Promise<Claim> {
    try {
      const claim = this.claimRepo.create(params);
      return await this.claimRepo.save(claim)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}