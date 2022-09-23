import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//entities
import { CVX } from "../entities/cvx.entity";
//inputs
import { FindAllCvxInput } from "../dto/cvx.input";
//payloads
import { FindAllCvxPayload } from "../dto/cvx.payload";
//services
import { PaginationService } from "src/pagination/pagination.service";


export class CVXService {
  constructor(
    @InjectRepository(CVX)
    private cvxRepo: Repository<CVX>,
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
        paginationOptions, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'name', columnName2: 'shortDescription',
          columnName3: 'cvxCode',
        }, associatedTo: "CVX"
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

}