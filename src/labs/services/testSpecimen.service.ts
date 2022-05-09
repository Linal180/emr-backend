import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import CreateSpecimenItemInput from '../dto/create-specimen-Item-input.dto';
import { UpdateSpecimenItemInput } from '../dto/update-specimen-Item-input.dto';
import { SpecimenTypes } from '../entities/specimenTypes.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';

@Injectable()
export class TestSpecimenService {
  constructor(
    @InjectRepository(TestSpecimens)
    private testSpecimensRepository: Repository<TestSpecimens>,
    @InjectRepository(SpecimenTypes)
    private specimenTypesRepository: Repository<SpecimenTypes>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  async createTestSpecimen(createSpecimenItemInput: CreateSpecimenItemInput): Promise<TestSpecimens> {
    try {
        const specimenInstance = this.testSpecimensRepository.create(createSpecimenItemInput)
        const specimenTest = await this.specimenTypesRepository.findOne(createSpecimenItemInput.testSpecimen)
        specimenInstance.specimenTypes = specimenTest
        return await this.testSpecimensRepository.save(specimenInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  async updateTestSpecimen(updateSpecimenItemInput: UpdateSpecimenItemInput): Promise<TestSpecimens> {
      try {
         const {id, collectionDate, testSpecimen, collectionTime, specimenNotes} =  updateSpecimenItemInput;
         const specimenInstance = await this.findOne(id)
         const specimenTest = await this.specimenTypesRepository.findOne(testSpecimen)
         specimenInstance.specimenTypes = specimenTest
        const data = {id, collectionDate, collectionTime, specimenNotes}
        await this.testSpecimensRepository.save(specimenInstance)
        return await this.utilsService.updateEntityManager(TestSpecimens, updateSpecimenItemInput.id, data, this.testSpecimensRepository);
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

  async GetSpecimensByLabTestId(id: string): Promise<TestSpecimens[]> {
    const specimen = await this.testSpecimensRepository.find({
      where: {
        labTestId: id
      }
    })
    console.log("specimen",specimen);
    if (specimen) {
      return specimen
    }
  }
}
