import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//entities
import { CVX } from "../entities/cvx.entity";
//inputs
import { CreateCvxCodeInput, FindAllCvxInput, UpdateCvxCodeInput } from "../dto/cvx.input";
//payloads
import { FindAllCvxPayload } from "../dto/cvx.payload";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
import { CptCodeService } from "src/feeSchedule/services/cptCode.service";


export class CVXService {
  constructor(
    @InjectRepository(CVX)
    private cvxRepo: Repository<CVX>,
    private readonly utilsService: UtilsService,
    private readonly cptCodeService: CptCodeService,
    private readonly paginationService: PaginationService
  ) { }

  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllCvxInput): Promise<FindAllCvxPayload> {
    try {

      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<CVX>(this.cvxRepo, {
        paginationOptions, ...(searchQuery && {
          associatedToField: {
            filterType: "stringFilter", columnValue: searchQuery, columnName: 'name', columnName2: 'shortDescription',
            columnName3: 'cvxCode',
          }
        })
      })

      const { data, ...pagination } = response;

      return {
        pagination,
        cvxs: data
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
  async findOne(id: string): Promise<CVX> {
    return await this.cvxRepo.findOne(id)
  }

  /**
   * Finds one by code
   * @param code 
   * @param [id] 
   * @returns one by code 
   */
  async findOneByCode(code: string, id?: string): Promise<CVX> {
    return await this.cvxRepo.findOne({ cvxCode: code, ...(id && { id: Not(id) }) })
  }

  /**
   * Creates mvx service
   * @param params 
   * @returns create 
   */
  async create(params: CreateCvxCodeInput): Promise<CVX> {
    try {
      const { cvxCode, cptCodeId } = params;
      const oldCvxCode = await this.findOneByCode(cvxCode);
      if (oldCvxCode) {
        throw new Error(`CVX Code is already exist with code: ${cvxCode}`);
      }

      const cvxInstance = this.cvxRepo.create(params)
      if (cptCodeId) {
        const cptCode = await this.cptCodeService.findOne({ id: cptCodeId });
        cvxInstance.cptCode = cptCode
      }
      return await this.cvxRepo.save(cvxInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Updates mvx service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateCvxCodeInput): Promise<CVX> {
    try {
      const { id, cptCodeId } = params || {}
      const oldMvxCode = await this.findOneByCode(params?.cvxCode, id);
      if (oldMvxCode) {
        throw new Error(`CVX code is already exist with the code: ${params?.cvxCode}`);
      }
      const cvxInstance = await this.utilsService.updateEntityManager(CVX, id, params, this.cvxRepo)
      if (cptCodeId) {
        const cptCode = await this.cptCodeService.findOne({ id: cptCodeId });
        cvxInstance.cptCode = cptCode
      }
      return await this.cvxRepo.save(cvxInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes mvx service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<CVX> {
    try {
      const cvxInstance = await this.findOne(id);
      await this.cvxRepo.delete(id);
      return cvxInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}