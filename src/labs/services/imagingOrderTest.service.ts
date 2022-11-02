import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//inputs
import { CreateImagingOrderTestInput } from "../dto/image-order-test.input";
//entities
import { ImagingOrderTest } from "../entities/imagingOrderTest.entity";
import { ImagingOrderService } from "./imagingOrder.service";
import { ImagingTestService } from "./imagingTest.service";


@Injectable()
export class ImagingOrderTestService {
  constructor(
    @InjectRepository(ImagingOrderTest)
    private imagingOrderTestRepo: Repository<ImagingOrderTest>,
    private readonly imagingTestService: ImagingTestService,
    @Inject(forwardRef(() => ImagingOrderService))
    private readonly imagingOrderService: ImagingOrderService,
  ) { }

  /**
   * Finds by order id
   * @param imagingOrderId 
   * @returns by order id 
   */
  async findByOrderId(imagingOrderId: string): Promise<ImagingOrderTest[]> {
    return await this.imagingOrderTestRepo.find({ imagingOrderId })
  }

  /**
   * Creates imaging order test service
   * @param params 
   * @returns create 
   */
  async create(params: CreateImagingOrderTestInput): Promise<ImagingOrderTest> {
    try {
      const { imagingOrderId, imagingTestId } = params;
      const imagingOrderInstance = await this.imagingOrderService.findOne(imagingOrderId);
      const imagingTestInstance = await this.imagingTestService.findOne(imagingTestId);
      const imagingOrderTestInstance = this.imagingOrderTestRepo.create(params);
      imagingOrderTestInstance.imagingOrder = imagingOrderInstance
      imagingOrderTestInstance.imagingTest = imagingTestInstance
      return await this.imagingOrderTestRepo.save(imagingOrderTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}