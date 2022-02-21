import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/services/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreatePracticeInput } from './dto/create-practice.input';
import PracticeInput from './dto/practice-input.dto';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticesPayload } from './dto/practices-payload.dto';
import { RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
import { Practice } from './entities/practice.entity';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Practice)
    private practiceRepository: Repository<Practice>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates practice
   * @param createPracticeInput 
   * @returns practice 
   */
  async createPractice(createPracticeInput: CreatePracticeInput): Promise<Practice> {
    try {
      //creating practice
      const practiceInstance = this.practiceRepository.create(createPracticeInput.createFacilityItemInput)
      //create a facility 
      if(createPracticeInput.createFacilityItemInput){
      const facility  = await this.facilityService.addFacility(createPracticeInput.createFacilityItemInput)
      practiceInstance.facilities = [facility]
      }
      //save the practice
      const practice = await this.practiceRepository.save(practiceInstance)
      //create a user based on its role under this facility
      await this.usersService.create(createPracticeInput.registerUserInput)
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all practices
   * @param practiceInput 
   * @returns all practices 
   */
  async findAllPractices(practiceInput: PracticeInput): Promise<PracticesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Practice>(this.practiceRepository, practiceInput)
      return {
        pagination: {
          ...paginationResponse
        },
        practices: paginationResponse.data,
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
  async findOne(id: string): Promise<Practice> {
    const practice = await this.practiceRepository.findOne(id);
    if(practice){
      return practice
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Practice not found',
    });
  }


  /**
   * Gets practice
   * @param id 
   * @returns practice 
   */
  async getPractice(id: string): Promise<PracticePayload> {
    const practice = await this.findOne(id);
    if (practice) {
      return { practice }
    }
  }

  /**
   * Updates practice
   * @param updatePracticeInput 
   * @returns practice 
   */
  async updatePractice(updatePracticeInput: UpdatePracticeInput): Promise<Practice> {
    try {
      const practice = await this.practiceRepository.save(updatePracticeInput)
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes practice
   * @param { id } 
   */
  async removePractice({ id }: RemovePractice) {
    try {
      await this.practiceRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
