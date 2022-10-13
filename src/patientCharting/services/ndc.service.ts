import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//inputs
import { CreateNdcCodeInput, FindAllNdcInput, UpdateNdcCodeInput } from "../dto/ndc.input";
//payloads
import { FindAllNdcPayload } from "../dto/ndc.payload";
//entities
import { NDC } from "../entities/ndc.entity";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";

export class NDCService {
  constructor(
    @InjectRepository(NDC)
    private ndcRepo: Repository<NDC>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService
  ) { }

  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllNdcInput): Promise<FindAllNdcPayload> {
    try {
      const { paginationOptions, searchQuery, mvxId } = params || {}
      const response = await this.paginationService.willPaginate<NDC>(this.ndcRepo, {
        paginationOptions, ...(mvxId && { mvxId }), ...(searchQuery && {
          associatedToField: {
            filterType: "stringFilter", columnValue: searchQuery, columnName: 'ndcCode'
          }
        })
      })

      const { data, ...pagination } = response;

      return {
        pagination,
        ndcs: data
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
  async findOne(id: string): Promise<NDC> {
    return await this.ndcRepo.findOne(id)
  }

  /**
   * Finds one by code
   * @param code 
   * @returns one by code 
   */
  async findOneByCode(code: string, id?: string): Promise<NDC> {
    return await this.ndcRepo.findOne({ code, ...(id && { id: Not(id) }) })
  }

  /**
   * Creates ndc service
   * @param params 
   * @returns create 
   */
  async create(params: CreateNdcCodeInput): Promise<NDC> {
    try {
      const { code } = params;
      const ndcCode = await this.findOneByCode(code);

      if (ndcCode) {
        throw new Error(`Ndc Code is already exist with code: ${code}`);
      }
      const ndcInstance = this.ndcRepo.create(params)
      return await this.ndcRepo.save(ndcInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Updates ndc service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateNdcCodeInput): Promise<NDC> {
    try {
      const { id } = params || {}
      const oldIcd = await this.findOneByCode(params?.code, id);
      if (oldIcd) {
        throw new Error(`NDC code is already exist with the code: ${params?.code}`);
      }
      const ndcCode = await this.utilsService.updateEntityManager(NDC, id, params, this.ndcRepo)
      return ndcCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes ndc service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<NDC> {
    try {
      const icdCode = await this.findOne(id);
      await this.ndcRepo.delete(id);
      return icdCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
}