import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { getConnection, Repository } from 'typeorm';
import { CreateProblemInput } from '../dto/create-problem.input';
import { CreateVitalInput } from '../dto/create-vital.input';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { RemoveProblem, UpdateProblemInput } from '../dto/update-problem.input';
import { ICDCodes } from '../entities/icdcodes.entity';
import { PatientProblems } from '../entities/patientProblems.entity';
import { PatientVitals } from '../entities/patientVitals.entity';
import { SnoMedCodes } from '../entities/snowmedCodes.entity';

@Injectable()
export class VitalService {
  constructor(
    @InjectRepository(PatientVitals)
    private patientVitalsRepository: Repository<PatientVitals>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) { }


  async addPatientVital(createVitalInput: CreateVitalInput): Promise<PatientVitals> {
    try {
      return 
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updatePatientVital(updateProblemInput: UpdateProblemInput): Promise<PatientVitals> {
    try {
      return await this.utilsService.updateEntityManager(PatientVitals, updateProblemInput.id, updateProblemInput, this.patientVitalsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient problem
   * @param patientProblemInput 
   * @returns all patient problem 
   */
  // async findAllPatientProblem(patientProblemInput: PatientProblemInput): Promise<PatientProblemsPayload> {
  //   try {
  //     const paginationResponse = await this.paginationService.willPaginate<PatientProblems>(this.patientVitalsRepository, patientProblemInput)
  //     return {
  //       pagination: {
  //         ...paginationResponse
  //       },
  //       patientProblems: paginationResponse.data,
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // /**
  //  * Finds one
  //  * @param id 
  //  * @returns one 
  //  */
  // async findOne(id: string): Promise<PatientProblems> {
  //   const patientVital = await this.patientVitalsRepository.findOne(id);
  //   if(patientVital){
  //     return patientVital
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'Patient Problem not found',
  //   });
  // }

  /**
   * Searchs icd codes
   * @param searchTerm 
   * @returns icd codes 
   */
  async searchIcdCodes(searchTerm: string): Promise<ICDCodes[]> {
    const [first, last] = searchTerm.split(' ');
    const result = await getConnection()
      .getRepository(ICDCodes)
      .createQueryBuilder("ICDCode")
      .where('ICDCode.code ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${last}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getMany();
    return result;
  }

  /**
   * Searchs sno med code by icd codes
   * @param searchTerm 
   * @returns sno med code by icd codes 
   */
  async searchSnoMedCodeByIcdCodes(searchTerm: string): Promise<SnoMedCodes[]> {
    const [first, last] = searchTerm.split(' ');
    const result = await getConnection()
      .getRepository(SnoMedCodes)
      .createQueryBuilder("SnoMedCodes")
      .where('SnoMedCodes.mapTarget ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('SnoMedCodes.mapRule ILIKE :searchTerm', { searchTerm: `%${last}%` })
      .orWhere('SnoMedCodes.mapRule ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getMany();
    return result;
  }

  // /**
  //  * Gets patient problem
  //  * @param id 
  //  * @returns patient problem 
  //  */
  // async GetPatientProblem(id: string): Promise<PatientProblems> {
  //   return await this.findOne(id);
  // }

  /**
   * Removes patient problem
   * @param { id } 
   */
  async removePatientProblem({ id }: RemoveProblem) {
    try {
      await this.patientVitalsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
