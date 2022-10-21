import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//services
import { CVXService } from "./cvx.service";
import { MVXService } from "./mvx.service";
import { PaginationService } from "src/pagination/pagination.service";
import { NdcVaccineProductService } from "./ndcVaccineProduct.service";
//inputs
import { AddVaccineProductInput, FindAllVaccineProductsInput, UpdateVaccineProductInput } from "../dto/vaccine-product.input";
//payloads
import { FindAllVaccineProductsPayload } from "../dto/vaccine-product.payload";
// entities
import { CVX } from "../entities/cvx.entity";
import { VaccineProduct } from "../entities/vaccineProduct.entity";

export class VaccineProductService {
  constructor(
    @InjectRepository(VaccineProduct)
    private vaccineProductRepo: Repository<VaccineProduct>,
    private readonly paginationService: PaginationService,
    private readonly cvxService: CVXService,
    private readonly mvxService: MVXService,
    private readonly ndcVaccineProductService: NdcVaccineProductService,
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
   * Fetchs all
   * @param params 
   * @returns all 
   */
  async fetchAll(params: FindAllVaccineProductsInput): Promise<FindAllVaccineProductsPayload> {
    try {
      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<VaccineProduct>(this.vaccineProductRepo, {
        paginationOptions, associatedTo: 'VaccineProduct', associatedToField:
          { filterType: 'stringFilter', columnValue: searchQuery, columnName: 'name' }
      });
      const { data: vaccineProducts, ...pagination } = response;
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

  /**
   * Creates vaccine service
   * @param params 
   * @returns create 
   */
  async create(params: AddVaccineProductInput): Promise<VaccineProduct> {
    try {
      const { cvxId, mvxId, ndcCodeId, name, status } = params;
      const vaccineProductInstance = this.vaccineProductRepo.create({ name, status });

      const cvxCode = await this.cvxService.findOne(cvxId);
      vaccineProductInstance.cvx = cvxCode
      vaccineProductInstance.cvxCode = cvxCode?.cvxCode
      vaccineProductInstance.cvxId = cvxCode?.id

      const mvxCode = await this.mvxService.findOne(mvxId);
      vaccineProductInstance.mvx = mvxCode
      vaccineProductInstance.mvxCode = mvxCode?.mvxCode
      vaccineProductInstance.mvxId = mvxCode?.id;

      const vaccineProduct = await this.vaccineProductRepo.save(vaccineProductInstance);

      await this.ndcVaccineProductService.create({ ndcCodeId, vaccineProductId: vaccineProduct?.id })

      return vaccineProduct
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Updates vaccine product service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateVaccineProductInput): Promise<VaccineProduct> {
    try {
      const { id, cvxId, mvxId, name, ndcCodeId, status } = params

      const vaccineProductInstance = await this.findOne(id)

      const cvxCode = await this.cvxService.findOne(cvxId);
      vaccineProductInstance.cvx = cvxCode
      vaccineProductInstance.cvxCode = cvxCode?.cvxCode
      vaccineProductInstance.cvxId = cvxCode?.id

      const mvxCode = await this.mvxService.findOne(mvxId);
      vaccineProductInstance.mvx = mvxCode
      vaccineProductInstance.mvxCode = mvxCode?.mvxCode
      vaccineProductInstance.mvxId = mvxCode?.id;

      const vaccineProduct = await this.vaccineProductRepo.save({ name, status, ...vaccineProductInstance });

      await this.ndcVaccineProductService.create({ ndcCodeId, vaccineProductId: vaccineProduct?.id })
      return vaccineProduct;

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Del vaccine product service
   * @param id 
   * @returns del 
   */
  async del(id: string): Promise<VaccineProduct> {
    try {
      const vaccineProduct = await this.findOne(id);
      const ndcVaccineProducts = await this.ndcVaccineProductService.findByVaccineId(id);
      await Promise.all(ndcVaccineProducts?.map(async ({ id }) => await this.ndcVaccineProductService.delete(id)))
      await this.vaccineProductRepo.delete(id);
      return vaccineProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}