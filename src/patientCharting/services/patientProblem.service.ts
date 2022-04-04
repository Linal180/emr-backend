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
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { RemoveProblem, UpdateProblemInput } from '../dto/update-problem.input';
import { ICDCodes } from '../entities/icdcodes.entity';
import { PatientProblems } from '../entities/patientProblems.entity';
import { SnoMedCodes } from '../entities/snowmedCodes.entity';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepository: Repository<ICDCodes>,
    @InjectRepository(PatientProblems)
    private patientProblemsRepository: Repository<PatientProblems>,
    @InjectRepository(SnoMedCodes)
    private snowMedCodeRepository: Repository<SnoMedCodes>,
    private readonly paginationService: PaginationService,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
    private readonly doctorService: DoctorService,
    private readonly staffService: StaffService,
    private readonly utilsService: UtilsService
  ) { }

  /**
   * Adds patient problem
   * @param createProblemInput 
   * @returns patient problem 
   */
  async addPatientProblem(createProblemInput: CreateProblemInput): Promise<PatientProblems> {
    try {
      //get icdCode
      const icdCode = await this.icdCodeRepository.findOne(createProblemInput.icdCodeId)
      //get snowMedCode
      const snowMedCode = await this.snowMedCodeRepository.findOne(createProblemInput.snowMedCodeId)
      //get patient 
      const patient  = await this.patientService.findOne(createProblemInput.patientId)
      //adding patient problem
      const patientProblemInstance = this.patientProblemsRepository.create({...createProblemInput, ICDCode: icdCode, patient: patient})
      //get appointments
      if(createProblemInput.appointmentId){
        const appointment = await this.appointmentService.findOne(createProblemInput.appointmentId)
        patientProblemInstance.appointment = appointment
      }
      //get provider
      if(createProblemInput.providerId){
        const provider = await this.doctorService.findOne(createProblemInput.providerId)
        patientProblemInstance.doctor = provider
      }
      //get staff
       if(createProblemInput.staffId){
        const staff = await this.staffService.findOne(createProblemInput.staffId)
        patientProblemInstance.staff = staff
      }
      patientProblemInstance.snowMedCode = snowMedCode
      const patientProblem = await this.patientProblemsRepository.save(patientProblemInstance)
      return patientProblem
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient problem
   * @param updateProblemInput 
   * @returns patient problem 
   */
  async updatePatientProblem(updateProblemInput: UpdateProblemInput): Promise<PatientProblems> {
    try {
      return await this.utilsService.updateEntityManager(PatientProblems, updateProblemInput.id, updateProblemInput, this.patientProblemsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient problem
   * @param patientProblemInput 
   * @returns all patient problem 
   */
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

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<PatientProblems> {
    const patientProblem = await this.patientProblemsRepository.findOne(id);
    if(patientProblem){
      return patientProblem
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Problem not found',
    });
  }

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
    const [first] = searchTerm.split(' ');
    const result = await getConnection()
      .getRepository(SnoMedCodes)
      .createQueryBuilder("SnoMedCodes")
      .where('SnoMedCodes.mapTarget ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getMany();
    return result;
  }

  /**
   * Gets patient problem
   * @param id 
   * @returns patient problem 
   */
  async GetPatientProblem(id: string): Promise<PatientProblems> {
    return await this.findOne(id);
  }

  /**
   * Removes patient problem
   * @param { id } 
   */
  async removePatientProblem({ id }: RemoveProblem) {
    try {
      await this.patientProblemsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
