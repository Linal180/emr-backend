import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//entities
import { CPTCodes } from "../entities/cptCode.entity";
//inputs
import {
  CreateCPTCodeInput, FindAllCPTCodesInput, GetCPTCodeInput, RemoveCPTCodeInput, UpdateCPTCodeInput
} from "../dto/cptCode.input";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";

@Injectable()
export class CptCodeService {
  constructor(@InjectRepository(CPTCodes) private cptCodeRepository: Repository<CPTCodes>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Creates cpt code service
   * @param params 
   * @returns  
   */
  async create(params: CreateCPTCodeInput): Promise<CPTCodes> {
    try {
      const { code } = params
      const oldCpt = await this.findByCode(code);
      if (oldCpt) {
        throw new Error(`CPT code is already exist with the code: ${code}`);
      }
      const cptCode = this.cptCodeRepository.create({ ...params, systematic: false });
      return await this.cptCodeRepository.save(cptCode)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates cpt code service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateCPTCodeInput): Promise<CPTCodes> {
    try {
      const { code, id } = params
      const oldCpt = await this.findByCode(code, id);
      if (oldCpt) {
        throw new Error(`CPT code is already exist with the code: ${code}`);
      }
      const cptCode = await this.utilsService.updateEntityManager(CPTCodes, params.id, params, this.cptCodeRepository);
      return cptCode
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all fee schedule
   * @param params 
   * @returns  
   */
  async findAllCPTCodes(params: FindAllCPTCodesInput) {
    try {
      const { paginationOptions, code: searchString } = params
      const paginationResponse = await this.paginationService.willPaginate<CPTCodes>(this.cptCodeRepository, {
        paginationOptions, associatedTo: 'CPTCodes',isDeleted:false, associatedToField: {
          columnValue: searchString, columnName: 'code', columnName2: "description",
          columnName3: 'shortDescription', filterType: 'stringFilter'
        }
      }, undefined, { columnName: "priority", order: "DESC" })
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

  /**
   * Finds one
   * @param params 
   * @returns one 
   */
  async findOne(params: GetCPTCodeInput): Promise<CPTCodes> {
    try {
      const { id } = params;
      const cptCode = await this.cptCodeRepository.findOne(id);
      return cptCode
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes cpt code service
   * @param params 
   * @returns remove 
   */
  async remove(params: RemoveCPTCodeInput): Promise<CPTCodes> {
    try {
      const { id } = params
      const cptCode = await this.cptCodeRepository.findOne(id);
      if (!cptCode) throw new NotFoundException({ status: HttpStatus.NOT_FOUND, error: 'Cpt not found' })
      const removedCptCode = await this.utilsService.updateEntityManager(CPTCodes, id, { isDeleted: true }, this.cptCodeRepository)
      return cptCode
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds by code
   * @param code 
   * @returns by code 
   */
  async findByCode(code: string, id?: string): Promise<CPTCodes> {
    try {
      const cptCode = await this.cptCodeRepository.findOne({ code, ...(id && { id: Not(id) }) });
      return cptCode
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}