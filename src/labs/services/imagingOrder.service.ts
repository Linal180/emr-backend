import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { ImagingOrder } from "../entities/imagingOrder.entity";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
//payloads
import { FindAllImagingOrderPayload } from "../dto/image-order.payload";
//inputs
import { CreateImagingOrderCodeInput, FindAllImagingOrderInput, UpdateImagingOrderCodeInput } from "../dto/image-order.input";

@Injectable()
export class ImagingOrderService {
  constructor(
    @InjectRepository(ImagingOrder)
    private imagingOrderRepo: Repository<ImagingOrder>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllImagingOrderInput): Promise<FindAllImagingOrderPayload> {
    try {

      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<ImagingOrder>(this.imagingOrderRepo, {
        paginationOptions, associatedToField: {
          filterType: "stringFilter", columnValue: searchQuery, columnName: 'name',
        }, associatedTo: 'ImagingOrder'
      })

      const { data: imagingOrders, ...pagination } = response;

      return {
        pagination,
        imagingOrders
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
  async findOne(id: string): Promise<ImagingOrder> {
    return await this.imagingOrderRepo.findOne(id);
  }



  /**
   * Creates imaging test service
   * @param params 
   * @returns create 
   */
  async create(params: CreateImagingOrderCodeInput): Promise<ImagingOrder> {
    try {
      const imagingTestInstance = this.imagingOrderRepo.create(params)
      return await this.imagingOrderRepo.save(imagingTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }



  /**
   * Updates imaging test service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateImagingOrderCodeInput): Promise<ImagingOrder> {
    try {
      const { id } = params || {}
      const imagingTestInstance = await this.utilsService.updateEntityManager(ImagingOrder, id, params, this.imagingOrderRepo)
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
  async remove(id: string): Promise<ImagingOrder> {
    try {
      const imagingTestInstance = await this.findOne(id);
      await this.imagingOrderRepo.delete(id);
      return imagingTestInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}