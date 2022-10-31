import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { ImagingTest } from "../entities/imagingTest.entity";
//inputs
import { CreateImagingTestCodeInput, FindAllImagingTestInput, UpdateImagingTestCodeInput } from "../dto/image-test.input";
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { FindAllImagingTestPayload } from "../dto/image-test.payload";


@Injectable()
export class ImagingTestService {
  constructor(
    @InjectRepository(ImagingTest)
    private imagingTestRepo: Repository<ImagingTest>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
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
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'manufacturerName', columnName2: 'mvxCode',
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
   * Creates mvx service
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
   * Updates mvx service
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
   * Removes mvx service
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

}