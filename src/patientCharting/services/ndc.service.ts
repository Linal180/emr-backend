import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//inputs
import { FindAllNdcInput } from "../dto/ndc.input";
//payloads
import { FindAllNdcPayload } from "../dto/ndc.payload";
//entities
import { NDC } from "../entities/ndc.entity";
//services
import { PaginationService } from "src/pagination/pagination.service";

export class NDCService {
  constructor(
    @InjectRepository(NDC)
    private ndcRepo: Repository<NDC>,
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
        paginationOptions, mvxId, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'ndcCode'
        }
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

}