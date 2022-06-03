import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { getConnection, In, Repository } from 'typeorm';
import { CreateProblemInput } from '../dto/create-problem.input';
import { IcdCodesPayload } from '../dto/icdCodes-payload.dto';
import PatientProblemInput from '../dto/problem-input.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { snoMedCodesPayload } from '../dto/snoMedCodes-payload.dto';
import { RemoveProblem, SearchIcdCodesInput, SearchSnoMedCodesInput, UpdateProblemInput } from '../dto/update-problem.input';
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
      const patient = await this.patientService.findOne(createProblemInput.patientId)
      //adding patient problem
      const patientProblemInstance = this.patientProblemsRepository.create({ ...createProblemInput, ICDCode: icdCode, patient: patient })
      //get appointments
      if (createProblemInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(createProblemInput.appointmentId)
        patientProblemInstance.appointment = appointment
      }
      //get provider
      if (createProblemInput.providerId) {
        const provider = await this.doctorService.findOne(createProblemInput.providerId)
        patientProblemInstance.doctor = provider
      }
      //get staff
      if (createProblemInput.staffId) {
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
    if (patientProblem) {
      return patientProblem
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Problem not found',
    });
  }

  async getDiagnoses(ids: string[]): Promise<ICDCodes[]> {
    const diagnoses = await this.icdCodeRepository.find({
      where: {
        id: In(ids)
      }
    });
    if (diagnoses) {
      return diagnoses
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'diagnoses not found',
    });
  }
  
  /**
   * Search icd codes
   * @param searchTerm 
   * @returns icd codes 
   */
  async searchIcdCodes(searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {

    const { limit, page } = searchIcdCodesInput.paginationOptions
    const [first, last] = searchIcdCodesInput.searchTerm.split(' ');

    const snoMedCodes = await getConnection()
      .getRepository(SnoMedCodes)
      .createQueryBuilder("SnoMedCode")
      .where('SnoMedCode.referencedComponentId ILIKE :searchTerm', { searchTerm: `%${first}%` }).getMany()

    let IcdCodes = []
    if (!!snoMedCodes.length) {
      IcdCodes = await Promise.all(snoMedCodes?.map(async ({ mapTarget }) => {
        return await this.icdCodeRepository.findOne({
          where: { code: mapTarget }
        })
      }))
    }

    const snoMedIcdCodes = !!IcdCodes.length ? IcdCodes.filter((icdCode) => !!icdCode) : []

    const [icdCodes, totalCount] = await getConnection()
      .getRepository(ICDCodes)
      .createQueryBuilder("ICDCode")
      .skip((page - 1) * limit)
      .take(limit)
      .where('ICDCode.code ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${last}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getManyAndCount()
    console.log("icdcodes", icdCodes, page, limit, snoMedIcdCodes)
    const totalPages = Math.ceil(totalCount / limit)
    return {
      icdCodes: !!snoMedIcdCodes.length ? snoMedIcdCodes : icdCodes,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages,
      },
    }
  }

  /**
   * Search icd codes
   * @param searchTerm 
   * @returns icd codes 
   */
  async fetchICDCodes(searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {
    try {
      const { paginationOptions } = searchIcdCodesInput
      const { limit } = paginationOptions
      const [first] = searchIcdCodesInput.searchTerm.split(' ');
      let icdCodes
      if (first) {
        icdCodes = []
      } else {
        icdCodes = await getConnection()
          .getRepository(ICDCodes)
          .createQueryBuilder("ICDCode")
          .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%SARS%` })
          .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%corona%` })
          .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%COV%` })
          .getMany()
      }

      const paginationResponse = await this.paginationService.willPaginate<ICDCodes>(this.icdCodeRepository, { ...searchIcdCodesInput, associatedTo: 'ICDCodes', associatedToField: { columnValue: first, columnName: 'code', columnName2: 'description', columnName3: 'description', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        icdCodes: this.utilsService.mergeArrayAndRemoveDuplicates(icdCodes, paginationResponse.data, 'code').slice(0,limit),
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Search sno med code by icd codes
   * @param searchTerm 
   * @returns sno med code by icd codes 
   */
  async searchSnoMedCodeByIcdCodes(searchSnoMedCodesInput: SearchSnoMedCodesInput): Promise<snoMedCodesPayload> {
    const { limit, page } = searchSnoMedCodesInput.paginationOptions
    const [first, last] = searchSnoMedCodesInput.searchTerm.split(' ');
    const [snoMedCodes, totalCount] = await getConnection()
      .getRepository(SnoMedCodes)
      .createQueryBuilder("SnoMedCodes")
      .skip((page - 1) * limit)
      .take(limit)
      .where('SnoMedCodes.mapTarget ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('SnoMedCodes.referencedComponentId ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .orWhere('SnoMedCodes.mapRule ILIKE :searchTerm', { searchTerm: `%${last}%` })
      .orWhere('SnoMedCodes.mapRule ILIKE :searchTerm', { searchTerm: `%${first}%` })
      .getManyAndCount();
    const totalPages = Math.ceil(totalCount / limit)
    return {
      snoMedCodes: snoMedCodes,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages,
      },
    }
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
