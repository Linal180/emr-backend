import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";
//entities
import { MVX } from "../entities/mvx.entity";
//inputs
import { FindAllMvxInput } from "../dto/mvx.input";
//payloads
import { FindAllMvxPayload } from "../dto/mvx.payload";
//services
import { PaginationService } from "src/pagination/pagination.service";


export class MVXService {
  constructor(
    @InjectRepository(MVX)
    private mvxRepo: Repository<MVX>,
    private readonly paginationService: PaginationService
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllMvxInput): Promise<FindAllMvxPayload> {
    try {

      const { paginationOptions, searchQuery, cvxId } = params || {}
      const response = await this.paginationService.willPaginate<MVX>(this.mvxRepo, {
        paginationOptions, cvxId, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'manufacturerName', columnName2: 'mvxCode',
        }
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

}