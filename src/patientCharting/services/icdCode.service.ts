import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
//entities
import { ICDCodes } from "../entities/icdcodes.entity";
//payloads
import { FindAllIcdCodesPayload } from "../dto/icdCodes.payload";
//inputs
import { AllIcdCodesInput, CreateIcdCodeInput, FindAllIcdCodesInput, UpdateIcdCodeInput } from "../dto/icdCodes.input";
//services
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";


@Injectable()
export class ICDCodeService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepo: Repository<ICDCodes>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findAll(params: FindAllIcdCodesInput): Promise<FindAllIcdCodesPayload> {
    try {
      const { paginationOptions, searchQuery } = params || {}
      const response = await this.paginationService.willPaginate<ICDCodes>(this.icdCodeRepo, {
        paginationOptions, associatedTo: 'ICDCodes', isDeleted: false, associatedToField: {
          columnValue: searchQuery, columnName: 'code', columnName2: 'description', filterType: 'stringFilter'
        }
      }, undefined, { columnName: "priority", order: "ASC" });
      const { data, ...pagination } = response;
      return {
        icdCodes: data,
        pagination
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all
   * @param params 
   * @returns all 
   */
  async findChiefComplaintProblems(params: AllIcdCodesInput): Promise<FindAllIcdCodesPayload> {
    try {
      const data = await this.icdCodeRepo.find({
        where: {
          description: In(["Abnormal Blood Sugar", "Anxeity / Nerves", "COVID-19 Asymptoms", "COVID-19 Vaccine", "Behavioural Health", "Change in Appetite", "Change of taste",
            "Excessive Hunger", "Fainting", "Fatigue", "Fever", "Light Headedness", "Often Hot", "Poor Balance",
            "Sleeping Difficulty", "Confusion", "Depression", "Dizziness"
          ])
        }
      })
      return {
        icdCodes: data,
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
  async findOne(id: string): Promise<ICDCodes> {
    return await this.icdCodeRepo.findOne(id)
  }


  /**
   * Finds one by code
   * @param code 
   * @returns one by code 
   */
  async findOneByCode(code: string, id?: string): Promise<ICDCodes> {
    return await this.icdCodeRepo.findOne({ code, ...(id && { id: Not(id) }) })
  }


  /**
   * Creates icdcode service
   * @param params 
   * @returns create 
   */
  async create(params: CreateIcdCodeInput): Promise<ICDCodes> {
    try {
      const oldIcd = await this.findOneByCode(params?.code);
      if (oldIcd) {
        throw new Error(`ICD code is already exist with the code: ${params?.code}`);
      }
      const icdCode = this.icdCodeRepo.create({ ...params, systematic: false });
      return await this.icdCodeRepo.save(icdCode)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Updates icdcode service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateIcdCodeInput): Promise<ICDCodes> {
    try {
      const { id } = params || {}
      const oldIcd = await this.findOneByCode(params?.code, id);
      if (oldIcd) {
        throw new Error(`ICD code is already exist with the code: ${params?.code}`);
      }
      const icdCode = await this.utilsService.updateEntityManager(ICDCodes, id, params, this.icdCodeRepo)
      return icdCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }


  /**
   * Removes icdcode service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<ICDCodes> {
    try {
      const icdCode = await this.icdCodeRepo.findOne(id)
      if (!icdCode) throw new NotFoundException({ status: HttpStatus.NOT_FOUND, error: 'Icd not found' })
      await this.utilsService.updateEntityManager(ICDCodes, id, { isDeleted: true }, this.icdCodeRepo)
      return icdCode;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}