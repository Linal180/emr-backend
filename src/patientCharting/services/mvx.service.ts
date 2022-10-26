import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//entities
import { MVX } from "../entities/mvx.entity";
//inputs
import { CreateMvxCodeInput, FindAllMvxInput, UpdateMvxCodeInput } from "../dto/mvx.input";
//payloads
import { FindAllMvxPayload } from "../dto/mvx.payload";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";


export class MVXService {
  constructor(
    @InjectRepository(MVX)
    private mvxRepo: Repository<MVX>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllMvxInput): Promise<FindAllMvxPayload> {
    try {

      const { paginationOptions, searchQuery, mvxCode } = params || {}
      const response = await this.paginationService.willPaginate<MVX>(this.mvxRepo, {
        paginationOptions, mvxCode, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'manufacturerName', columnName2: 'mvxCode',
        }, associatedTo: 'MVX'
      })

      const { data, ...pagination } = response;

      return {
        pagination,
        mvxs: data
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
  async findOne(id: string): Promise<MVX> {
    return await this.mvxRepo.findOne(id);
  }

  /**
   * Finds one by code
   * @param code 
   * @param [id] 
   * @returns one by code 
   */
  async findOneByCode(code: string, id?: string): Promise<MVX> {
    return await this.mvxRepo.findOne({ mvxCode: code, ...(id && { id: Not(id) }) })
  }

  /**
   * Creates mvx service
   * @param params 
   * @returns create 
   */
  async create(params: CreateMvxCodeInput): Promise<MVX> {
    try {
      const { mvxCode } = params;
      const oldMvxCode = await this.findOneByCode(mvxCode);
      if (oldMvxCode) {
        throw new Error(`MVX Code is already exist with code: ${mvxCode}`);
      }
      const mvxInstance = this.mvxRepo.create(params)
      return await this.mvxRepo.save(mvxInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Updates mvx service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateMvxCodeInput): Promise<MVX> {
    try {
      const { id } = params || {}
      const oldMvxCode = await this.findOneByCode(params?.mvxCode, id);
      if (oldMvxCode) {
        throw new Error(`MVX code is already exist with the code: ${params?.mvxCode}`);
      }
      const mvxInstance = await this.utilsService.updateEntityManager(MVX, id, params, this.mvxRepo)
      return mvxInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes mvx service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<MVX> {
    try {
      const mvxInstance = await this.findOne(id);
      await this.mvxRepo.delete(id);
      return mvxInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}