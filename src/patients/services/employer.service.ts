import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateEmployerInput } from '../dto/create-employer.input';
import EmployerInput from '../dto/employer-input.dto';
import { EmployerPayload } from '../dto/employer-payload.dto';
import { EmployersPayload } from '../dto/employers-payload.dto';
import { RemoveEmployer, UpdateEmployerItemInput } from '../dto/update-employer.input';
import { Employer } from '../entities/employer.entity';
import { PatientService } from './patient.service';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => PatientService))
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService,
  ) { }

  async createEmployer(createEmployerInput: CreateEmployerInput): Promise<Employer> {
    try {
      // create employer
      const employerInstance = this.employerRepository.create(createEmployerInput)
      return await this.employerRepository.save(employerInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all employer
   * @param employerInput 
   * @returns all employer 
   */
  async findAllEmployer(employerInput: EmployerInput): Promise<EmployersPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Employer>(this.employerRepository, employerInput)
      return {
        pagination: {
          ...paginationResponse
        },
        employer: paginationResponse.data,
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
  async findOne(id: string): Promise<Employer> {
    return await this.employerRepository.findOne(id);
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async GetEmployer(id: string): Promise<EmployerPayload> {
    const employer = await this.findOne(id);
    if (employer) {
      return { employer }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Employer not found',
    });
  }

  /**
   * Updates employer
   * @param updateEmployerItemInput 
   * @returns employer 
   */
  async updateEmployer(updateEmployerItemInput: UpdateEmployerItemInput): Promise<Employer> {
    try {
      if(updateEmployerItemInput.id){
        return await this.utilsService.updateEntityManager(Employer, updateEmployerItemInput.id, updateEmployerItemInput, this.employerRepository)
        }
        const employerInstance = this.employerRepository.create(updateEmployerItemInput)
        return await this.employerRepository.save(employerInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes employer
   * @param { id } 
   */
  async removeEmployer({ id }: RemoveEmployer) {
    try {
      await this.employerRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
