import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import CreateSpecimenItemInput from '../dto/create-specimen-Item-input.dto';
import { UpdateLabTestInput } from '../dto/update-lab-test.input';
import { LabTests } from '../entities/labTests.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';

@Injectable()
export class TestSpecimenService {
  constructor(
    @InjectRepository(TestSpecimens)
    private testSpecimensRepository: Repository<TestSpecimens>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  async createLabTest(createSpecimenItemInput: CreateSpecimenItemInput[]): Promise<TestSpecimens[]> {
    try {
        const specimenInstance = this.testSpecimensRepository.create(createSpecimenItemInput)
        return await this.testSpecimensRepository.save(specimenInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  

  async updateLabTest(UpdateLabTestInput: UpdateLabTestInput): Promise<LabTests> {
      try {
         console.log("UpdateLabTestInput:",UpdateLabTestInput)
         return
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }


  async findOne(id: string): Promise<TestSpecimens> {
    const specimen = await this.testSpecimensRepository.findOne(id);
    if(specimen){
      return specimen
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Specimen not found',
    });
  }


  async GetSpecimen(id: string): Promise<TestSpecimens> {
    const specimen = await this.findOne(id);
    if (specimen) {
      return specimen
    }
  }
}
