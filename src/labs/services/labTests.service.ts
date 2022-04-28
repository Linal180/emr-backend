import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { ProblemService } from 'src/patientCharting/services/patientProblems.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import { UpdateLabTestInput } from '../dto/update-lab-test.input';
import { LabTests } from '../entities/labTests.entity';
import { LoincCodesService } from './loincCodes.service';
import { TestSpecimenService } from './testSpecimen.service';

@Injectable()
export class LabTestsService {
  constructor(
    @InjectRepository(LabTests)
    private labTestsRepository: Repository<LabTests>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly problemService: ProblemService,
    private readonly loincCodesService: LoincCodesService,
    private readonly testSpecimenService: TestSpecimenService
  ) { }

  async createLabTest(createLabTestInput: CreateLabTestInput): Promise<LabTests> {
    try {
      //get diagnoses
      const diagnoses = await this.problemService.getDiagnoses(createLabTestInput.diagnoses)
      //get test 
      const test = await this.loincCodesService.findOne(createLabTestInput.test)
      //create lab test 
      const labTestInstance = this.labTestsRepository.create(createLabTestInput.createLabTestItemInput)
      labTestInstance.diagnoses = diagnoses
      labTestInstance.test = test
      //create test specimen 
      const specimens = await this.testSpecimenService.createLabTest(createLabTestInput.createSpecimenItemInput)
      labTestInstance.testSpecimens = specimens
      return await this.labTestsRepository.save(labTestInstance)
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
