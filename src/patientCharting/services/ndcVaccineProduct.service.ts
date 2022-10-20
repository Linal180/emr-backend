import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, getConnection, Repository } from "typeorm";
import { forwardRef, HttpStatus, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//entities
import { NDC } from "../entities/ndc.entity";
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";
//inputs
import { CreateNdcVaccineProductInput, FindAllNdcVaccineProductsInput } from "../dto/ndc-vaccine-product.input";
//payloads
import { FindAllNdcVaccineProductsPayload } from "../dto/ndc-vaccine-product.payload";
//service
import { NDCService } from "./ndc.service";
import { VaccineProductService } from "./vaccineProduct.service";

export class NdcVaccineProductService {
  constructor(
    @InjectRepository(NdcVaccineProduct)
    private ndcVaccineProductRepo: Repository<NdcVaccineProduct>,
    private readonly ndcService: NDCService,
    @Inject(forwardRef(() => VaccineProductService))
    private readonly vaccineProductService: VaccineProductService
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllNdcVaccineProductsInput): Promise<FindAllNdcVaccineProductsPayload> {
    try {
      const { paginationOptions, searchQuery, ndcId, vaccineProductId } = params || {}
      const { limit, page } = paginationOptions

      const query = getConnection()
        .getRepository(NdcVaccineProduct)
        .createQueryBuilder('ndcVaccineProduct')
        .skip((page - 1) * limit)
        .take(limit)
        .where(ndcId ? 'ndcVaccineProduct.ndcCodeId = :ndcCodeId' : '1=1', { ndcCodeId: ndcId })
        .andWhere(vaccineProductId ? 'ndcVaccineProduct.vaccineProductId = :vaccineProductId' : '1=1', { vaccineProductId: vaccineProductId })

      if (searchQuery) {
        query
          .innerJoin(NDC, 'vaccineNdc', `vaccineNdc.id = "ndcVaccineProduct"."ndcCodeId"`)
          .andWhere(new Brackets(qb => {
            qb.orWhere('vaccineNdc.code ILIKE :code', { code: `%${searchQuery}%` })
              .orWhere('vaccineNdc.description ILIKE :description', { description: `%${searchQuery}%` })
          }))
      }

      const [ndcVaccineProducts, totalCount] = await query
        .getManyAndCount()

      const totalPages = Math.ceil(totalCount / limit)

      if (page > totalPages)
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Page Not Found',
        });

      const pagination = {
        totalCount,
        page,
        limit,
        totalPages
      }
      return {
        pagination,
        ndcVaccineProducts
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds by vaccine id
   * @param vaccineProductId 
   * @returns by vaccine id 
   */
  async findByVaccineId(vaccineProductId: string): Promise<NdcVaccineProduct[]> {
    try {
      return await this.ndcVaccineProductRepo.find({ vaccineProductId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Creates ndc vaccine product service
   * @param params 
   * @returns create 
   */
  async create(params: CreateNdcVaccineProductInput): Promise<NdcVaccineProduct> {
    try {
      const { ndcCodeId, vaccineProductId } = params;
      const ndcVaccineProductInstance = this.ndcVaccineProductRepo.create({ vaccineProductId, ndcCodeId })

      const ndcInstance = await this.ndcService.findOne(ndcCodeId)

      ndcVaccineProductInstance.ndcCode = ndcInstance
      ndcVaccineProductInstance.ndcCodeId = ndcInstance?.id

      const vaccineProductInstance = await this.vaccineProductService.findOne(vaccineProductId)

      ndcVaccineProductInstance.vaccineProduct = vaccineProductInstance
      ndcVaccineProductInstance.vaccineProductId = vaccineProductInstance?.id;

      return await this.ndcVaccineProductRepo.save(ndcVaccineProductInstance)

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}