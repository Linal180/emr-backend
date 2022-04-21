import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { default as LoincCodeInput } from '../dto/create-loincCode-input.dto';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { LabTests } from '../entities/labTests.entity';

@Injectable()
export class LabTestsService {
  constructor(
    @InjectRepository(LabTests)
    private labTestsRepository: Repository<LabTests>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) { }


  async createlabTest(loincCodeInput: LoincCodeInput): Promise<LabTests> {
    try {
        return
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updateLoincCode(updateLoincCodeInput: UpdateLoincCodeInput): Promise<LabTests> {
      try {
         return
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }


  async findOne(id: string): Promise<LabTests> {
    const labTest = await this.labTestsRepository.findOne(id);
    if(labTest){
      return labTest
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab test not found',
    });
  }


  async GetLabTest(id: string): Promise<LabTests> {
    const labTest = await this.findOne(id);
    if (labTest) {
      return labTest
    }
  }
}
