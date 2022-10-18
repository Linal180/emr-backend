import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//services
import { PaginationService } from "src/pagination/pagination.service";
//inputs
import { FindAllVaccineProductsInput } from "../dto/vaccine-product.input";
//payloads
import { FindAllVaccineProductsPayload } from "../dto/vaccine-product.payload";
// entities
import { VaccineProduct } from "../entities/vaccineProduct.entity";
import { CVX } from "../entities/cvx.entity";

export class VaccineProductService {
  constructor(
    @InjectRepository(VaccineProduct)
    private vaccineProductRepo: Repository<VaccineProduct>,
    private readonly paginationService: PaginationService,

  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllVaccineProductsInput): Promise<FindAllVaccineProductsPayload> {
    try {
      const { paginationOptions, searchQuery } = params;
      const { limit, page } = paginationOptions
      const [vaccineProducts, totalCount] = await getConnection()
        .getRepository(VaccineProduct)
        .createQueryBuilder('vaccineProduct')
        .innerJoin(CVX, 'vaccineCvx', `vaccineCvx.id = "vaccineProduct"."cvxId"`)
        .skip((page - 1) * limit)
        .take(limit)
        .where(searchQuery ? 'vaccineProduct.name ILIKE :name' : '1=1', { name: `%${searchQuery}%` })
        .orWhere(searchQuery ? 'vaccineProduct.cvxCode ILIKE :cvxCode' : '1=1', { cvxCode: `%${searchQuery}%` })
        .orWhere(searchQuery ? 'vaccineCvx.shortDescription ILIKE :shortDescription' : '1=1', { shortDescription: `%${searchQuery}%` })
        .orWhere(searchQuery ? 'vaccineCvx.name ILIKE :name' : '1=1', { name: `%${searchQuery}%` })
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

      return { vaccineProducts, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<VaccineProduct> {
    try {
      return await this.vaccineProductRepo.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}