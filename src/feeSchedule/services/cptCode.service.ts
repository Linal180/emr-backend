import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { CPTCodes } from "../entities/cptCode.entity";
//inputs
import { CreateCPTCodesInput, FindAllCPTCodesInput } from "../dto/cptCode.input";
import { PaginationService } from "src/pagination/pagination.service";

@Injectable()
export class CptCodeService {
  constructor(@InjectRepository(CPTCodes) private cptCodeRepository: Repository<CPTCodes>,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Creates cpt code service
   * @param params 
   * @returns  
   */
  async create(params: CreateCPTCodesInput) {
    try {
      const cptCode = this.cptCodeRepository.create(params);
      return await this.cptCodeRepository.save(cptCode)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findAllFeeSchedule(params: FindAllCPTCodesInput) {
    try {
      const { paginationOptions, code } = params
      const paginationResponse = await this.paginationService.willPaginate<CPTCodes>(this.cptCodeRepository, { paginationOptions, code })
      return {
        pagination: {
          ...paginationResponse
        },
        cptCodes: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


}