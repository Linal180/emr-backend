import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateProblemInput } from '../dto/create-problem.input';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemPayload } from '../dto/problem-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { RemoveProblem, UpdateProblemInput } from '../dto/update-problem.input';
import { ICDCodes } from '../entities/icdcodes.entity';
import { PatientProblems } from '../entities/patientProblems.entity';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepository: Repository<ICDCodes>,
    @InjectRepository(PatientProblems)
    private patientProblemsRepository: Repository<PatientProblems>,
    private readonly paginationService: PaginationService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService
  ) { }

  async addPatientProblem(createProblemInput: CreateProblemInput): Promise<PatientProblems> {
    try {
      //get icdCode
      const icdCode = await this.icdCodeRepository.findOne(createProblemInput.icdCodeId)
      //get patient 
      const patient  = await this.patientService.findOne(createProblemInput.patientId)
      //adding patient problem
      const patientProblem = this.patientProblemsRepository.create({...createProblemInput, ICDCode: icdCode, patient: patient})
      return patientProblem
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updatePatientProblem(updateProblemInput: UpdateProblemInput): Promise<PatientProblems> {
    try {
 
      return 
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findAllPatientProblem(patientProblemInput: PatientProblemInput): Promise<PatientProblemsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<PatientProblems>(this.patientProblemsRepository, patientProblemInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patientProblems: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<PatientProblems> {
    const problem = await this.patientProblemsRepository.findOne(id);
    if(problem){
      return problem
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Problem not found',
    });
  }

  async GetPatientProblem(id: string): Promise<PatientProblemPayload> {
    const patientProblem = await this.findOne(id);
    if (patientProblem) {
      return { patientProblem }
    }
  }

  async removePatientProblem({ id }: RemoveProblem) {
    try {
      await this.patientProblemsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
