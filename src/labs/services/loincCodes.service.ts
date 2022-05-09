import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { default as LoincCodeInput } from '../dto/create-loincCode-input.dto';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { LoincCodes } from '../entities/loincCodes.entity';

@Injectable()
export class LoincCodesService {
  constructor(
    @InjectRepository(LoincCodes)
    private loincCodesRepository: Repository<LoincCodes>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) { }

  /**
   * Creates loinc code
   * @param loincCodeInput 
   * @returns loinc code 
   */
  async createLoincCode(loincCodeInput: LoincCodeInput): Promise<LoincCodes> {
    try {
      //creating loinc code
      const loincCodeInstance = this.loincCodesRepository.create(loincCodeInput)
      return await this.loincCodesRepository.save(loincCodeInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates loinc code
   * @param updateLoincCodeInput 
   * @returns loinc code 
   */
  async updateLoincCode(updateLoincCodeInput: UpdateLoincCodeInput): Promise<LoincCodes> {
      try {
         return await this.utilsService.updateEntityManager(LoincCodes, updateLoincCodeInput.id, updateLoincCodeInput, this.loincCodesRepository)
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<LoincCodes> {
    const loincCode = await this.loincCodesRepository.findOne(id);
    if(loincCode){
      return loincCode
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'loinc Code not found',
    });
  }

  /**
   * Gets loinc code
   * @param id 
   * @returns loinc code 
   */
  async GetLoincCode(id: string): Promise<LoincCodes> {
    const loincCode = await this.findOne(id);
    if (loincCode) {
      return loincCode
    }
  }
}
