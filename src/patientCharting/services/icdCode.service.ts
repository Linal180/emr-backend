import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { ICDCodes } from "../entities/icdcodes.entity";
//payloads
import { FindAllIcdCodesPayload } from "../dto/icdCodes.payload";
//inputs
import { CreateIcdCodeInput, FindAllIcdCodesInput, UpdateIcdCodeInput } from "../dto/icdCodes.input";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";


@Injectable()
export class ICDCodeService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepo: Repository<ICDCodes>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllIcdCodesInput): Promise<FindAllIcdCodesPayload> {
    try {
      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<ICDCodes>(this.icdCodeRepo, {
        paginationOptions, associatedTo: 'ICDCodes',isDeleted:false, associatedToField: {
          columnValue: searchQuery, columnName: 'code', columnName2: 'description', filterType: 'stringFilter'
        }
      }, undefined, { columnName: "priority", order: "ASC" });
      const { data, ...pagination } = response;
      return {
        icdCodes: data,
        pagination
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<ICDCodes> {
    return await this.icdCodeRepo.findOne(id)
  }


  /**
   * Finds one by code
   * @param code 
   * @returns one by code 
   */
  async findOneByCode(code: string, id?: string): Promise<ICDCodes> {
    return await this.icdCodeRepo.findOne({ code, ...(id && { id: Not(id) }) })
  }


  /**
   * Creates icdcode service
   * @param params 
   * @returns create 
   */
  async create(params: CreateIcdCodeInput): Promise<ICDCodes> {
    try {
      const oldIcd = await this.findOneByCode(params?.code);
      if (oldIcd) {
        throw new Error(`ICD code is already exist with the code: ${params?.code}`);
      }
      const icdCode = this.icdCodeRepo.create({ ...params, systematic: false });
      return await this.icdCodeRepo.save(icdCode)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Updates icdcode service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateIcdCodeInput): Promise<ICDCodes> {
    try {
      const { id } = params || {}
      const oldIcd = await this.findOneByCode(params?.code, id);
      if (oldIcd) {
        throw new Error(`ICD code is already exist with the code: ${params?.code}`);
      }
      const icdCode = await this.utilsService.updateEntityManager(ICDCodes, id, params, this.icdCodeRepo)
      return icdCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }


  /**
   * Removes icdcode service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<ICDCodes> {
    try {
      const icdCode = await this.utilsService.updateEntityManager(ICDCodes, id ,{isDeleted:true}, this.icdCodeRepo)
      return icdCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}