import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//entities
import { FeeSchedule } from "../entities/feeSchedule.entity";
//services
import { UtilsService } from "src/util/utils.service";
import { PracticeService } from "src/practice/practice.service";
import { PaginationService } from "src/pagination/pagination.service";
//inputs
import {
  CreateFeeScheduleInput, FindAllFeeScheduleInput, GetFeeScheduleInput, RemoveFeeScheduleInput, UpdateFeeScheduleInput
} from "../dto/feeSchedule.input";
//payloads
import { AllFeeSchedulesPayload } from "../dto/feeSchedule-payload.dto";

@Injectable()
export class FeeScheduleService {

  constructor(@InjectRepository(FeeSchedule) private feeScheduleRepository: Repository<FeeSchedule>,
    private readonly utilsService: UtilsService,
    private readonly practiceService: PracticeService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Finds all fee schedule
   * @param params 
   * @returns all fee schedule 
   */
  async findAllFeeSchedule(params: FindAllFeeScheduleInput): Promise<AllFeeSchedulesPayload> {
    try {
      const { paginationOptions, practiceId } = params
      const paginationResponse = await this.paginationService.willPaginate<FeeSchedule>(this.feeScheduleRepository, { paginationOptions, practiceId })
      return {
        pagination: {
          ...paginationResponse
        },
        feeSchedules: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param params 
   * @returns one 
   */
  async findOne(params: GetFeeScheduleInput): Promise<FeeSchedule> {
    const { id } = params
    return await this.feeScheduleRepository.findOne(id)
  }

  /**
     * Creates fee schedule service
     * @param params 
     * @returns create 
     */
  async create(params: CreateFeeScheduleInput): Promise<FeeSchedule> {
    try {
      const feeSchedule = this.feeScheduleRepository.create(params);
      if (params?.practiceId) {
        const practice = await this.practiceService.findOne(params?.practiceId);
        feeSchedule.practice = practice
      }
      return await this.feeScheduleRepository.save(feeSchedule)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates fee schedule
   * @param params 
   * @returns  
   */
  async updateFeeSchedule(params: UpdateFeeScheduleInput): Promise<FeeSchedule> {
    try {
      const feeSchedule = await this.utilsService.updateEntityManager(FeeSchedule, params.id, params, this.feeScheduleRepository)
      if (params?.practiceId) {
        const practice = await this.practiceService.findOne(params?.practiceId);
        feeSchedule.practice = practice
      }
      return await this.feeScheduleRepository.save(feeSchedule)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes fee schedule service
   * @param params 
   */
  async remove(params: RemoveFeeScheduleInput): Promise<FeeSchedule> {
    try {
      const { id } = params;
      const feeSchedule = await this.feeScheduleRepository.findOne(id);
      if (!feeSchedule) throw new NotFoundException({ status: HttpStatus.NOT_FOUND, error: 'Fee Schedule not found' })
      await this.feeScheduleRepository.delete(id);
      return feeSchedule
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets fee schedule by practice id
   * @param practiceId 
   * @returns fee schedule by practice id 
   */
  async getFeeScheduleByPracticeId(practiceId: string): Promise<FeeSchedule[]> {
    try {
      return await this.feeScheduleRepository.find({ practiceId })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}