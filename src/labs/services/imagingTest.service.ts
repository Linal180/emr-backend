import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { ImagingTest } from "../entities/imagingTest.entity";
//inputs
import { CreateImagingTestCodeInput, FindAllImagingTestInput, UpdateImagingTestCodeInput } from "../dto/image-test.input";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
//payloads
import { FindAllImagingTestPayload } from "../dto/image-test.payload";


@Injectable()
export class ImagingTestService {
  constructor(
    @InjectRepository(ImagingTest)
    private imagingTestRepo: Repository<ImagingTest>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
  * Finds all
  * @param params 
  * @returns all 
  */
  async findAll(params: FindAllImagingTestInput): Promise<FindAllImagingTestPayload> {
    try {

      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<ImagingTest>(this.imagingTestRepo, {
        paginationOptions, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'name',
        }, associatedTo: 'ImagingTest'
      })

      const { data, ...pagination } = response;

      return {
        pagination,
        imagingTests: data
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
  async findOne(id: string): Promise<ImagingTest> {
    return await this.imagingTestRepo.findOne(id);
  }

  /**
   * Creates imaging test service
   * @param params 
   * @returns create 
   */
  async create(params: CreateImagingTestCodeInput): Promise<ImagingTest> {
    try {
      const imagingTestInstance = this.imagingTestRepo.create(params)
      return await this.imagingTestRepo.save(imagingTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Updates imaging test service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateImagingTestCodeInput): Promise<ImagingTest> {
    try {
      const { id } = params || {}
      const imagingTestInstance = await this.utilsService.updateEntityManager(ImagingTest, id, params, this.imagingTestRepo)
      return imagingTestInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Removes imaging test service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<ImagingTest> {
    try {
      const imagingTestInstance = await this.findOne(id);
      await this.imagingTestRepo.delete(id);
      return imagingTestInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds by order id
   * @param imagingOrderId 
   * @returns by order id 
   */
  async findByOrderId(imagingOrderId: string): Promise<ImagingTest[]> {
    return await this.imagingTestRepo.find({ imagingOrderId })
  }

}