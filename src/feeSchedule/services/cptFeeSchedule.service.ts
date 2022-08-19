import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//services
import { CptCodeService } from "./cptCode.service";
import { UtilsService } from "src/util/utils.service";
import { FeeScheduleService } from "./feeSchedule.service";
import { PaginationService } from "src/pagination/pagination.service";
//entity
import { CptFeeSchedule } from "../entities/cptFeeSchedule.entity";
//inputs, payloads
import {
  CreateCptFeeScheduleInput, FindAllCptFeeScheduleInput, GetCptFeeScheduleInput, RemoveCptFeeScheduleInput,
  UpdateCptFeeScheduleInput
} from "../dto/cptFeeSchedule.input";
import { AllCPTFeeSchedulesPayload } from "../dto/cptFeeSchedule-payload.dto";

@Injectable()
export class CptFeeScheduleService {
  constructor(@InjectRepository(CptFeeSchedule) private cptFeeScheduleRepository: Repository<CptFeeSchedule>,
    private readonly utilsService: UtilsService,
    private readonly cptCodeService: CptCodeService,
    private readonly paginationService: PaginationService,
    private readonly feeScheduleService: FeeScheduleService,
  ) { }

  /**
   * Finds all fee schedule
   * @param params 
   * @returns all fee schedule 
   */
  async findAllCptFeeSchedule(params: FindAllCptFeeScheduleInput): Promise<AllCPTFeeSchedulesPayload> {
    try {
      const { paginationOptions, searchString, feeScheduleId } = params
      const paginationResponse = await this.paginationService.willPaginate<CptFeeSchedule>(this.cptFeeScheduleRepository, {
        paginationOptions, feeScheduleId, associatedTo: 'CptFeeSchedule', associatedToField: {
          columnValue: searchString, columnName: 'code', columnName2: 'revenueCode', filterType: 'stringFilter'
        }
      })
      return {
        pagination: {
          ...paginationResponse
        },
        cptFeeSchedules: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Creates cpt fee schedule service
   * @param params 
   * @returns create 
   */
  async create(params: CreateCptFeeScheduleInput): Promise<CptFeeSchedule> {
    try {
      const { feeScheduleId, cptCodesId } = params || {}
      const cptFeeSchedule = this.cptFeeScheduleRepository.create(params);
      //associate to fee schedule
      if (feeScheduleId) {
        const feeSchedule = await this.feeScheduleService.findOne({ id: feeScheduleId })
        cptFeeSchedule.feeSchedule = feeSchedule
      }
      //associate to cpt code
      if (cptCodesId) {
        const cptCodes = await this.cptCodeService.findOne({ id: cptCodesId })
        cptFeeSchedule.cptCodes = cptCodes
      }
      return await this.cptFeeScheduleRepository.save(cptFeeSchedule)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param params 
   * @returns one 
   */
  async findOne(params: GetCptFeeScheduleInput): Promise<CptFeeSchedule> {
    const { id } = params
    return await this.cptFeeScheduleRepository.findOne(id)
  }

  /**
   * Updates cpt fee schedule
   * @param params 
   * @returns cpt fee schedule 
   */
  async updateCptFeeSchedule(params: UpdateCptFeeScheduleInput): Promise<CptFeeSchedule> {
    try {
      const { cptCodesId, feeScheduleId } = params || {}
      const cptFeeSchedule = await this.utilsService.updateEntityManager(CptFeeSchedule, params.id, params, this.cptFeeScheduleRepository)
      //associate to fee schedule
      if (feeScheduleId) {
        const feeSchedule = await this.feeScheduleService.findOne({ id: feeScheduleId })
        cptFeeSchedule.feeSchedule = feeSchedule
      }
      //associate to cpt code
      if (cptCodesId) {
        const cptCodes = await this.cptCodeService.findOne({ id: cptCodesId })
        cptFeeSchedule.cptCodes = cptCodes
      }
      return await this.cptFeeScheduleRepository.save(cptFeeSchedule)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes cpt fee schedule service
   * @param params 
   * @returns remove 
   */
  async remove(params: RemoveCptFeeScheduleInput): Promise<CptFeeSchedule> {
    try {
      const { id } = params;
      const cptFeeSchedule = await this.cptFeeScheduleRepository.findOne(id);
      if (!cptFeeSchedule) throw new NotFoundException({ status: HttpStatus.NOT_FOUND, error: 'Fee Schedule not found' })
      await this.cptFeeScheduleRepository.delete(id);
      return cptFeeSchedule
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds by cpt code
   * @param cptCodesId 
   * @returns by cpt code 
   */
  async findByCptCode(cptCodesId: string): Promise<CptFeeSchedule[]> {
    return await this.cptFeeScheduleRepository.find({ cptCodesId })
  }

  async findAndCountByFeeSchedule(feeScheduleId: string): Promise<Number> {
    const count = await this.cptFeeScheduleRepository.count({ feeScheduleId })
    return count
  }


  /**
   * Finds by fee schedule
   * @param feeScheduleId 
   * @returns by fee schedule 
   */
  async findByFeeSchedule(feeScheduleId: string): Promise<CptFeeSchedule[]> {
    return await this.cptFeeScheduleRepository.find({ feeScheduleId })
  }

}