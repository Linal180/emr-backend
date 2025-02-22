import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//services
import { UtilsService } from 'src/util/utils.service';
import { StaffService } from 'src/providers/services/staff.service';
import { LabTestsService } from 'src/labs/services/labTests.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PatientService } from 'src/patients/services/patient.service';
import { PatientMedicationService } from './patientMedication.service';
import { ImagingOrderService } from 'src/labs/services/imagingOrder.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PhysicalExamService } from 'src/reviewOfSystems/services/physicalExam.service';
import { ReviewOfSystemService } from 'src/reviewOfSystems/services/reviewOfSystem.service';
import { ChartingTemplateService } from 'src/reviewOfSystems/services/chartingTemplate.service';
import { PatientIllnessHistoryService } from 'src/reviewOfSystems/services/patientIllnessHistory.service';
//entities
import { ICDCodes } from '../entities/icdcodes.entity';
import { SnoMedCodes } from '../entities/snowMedCodes.entity';
import { LabTestStatus } from 'src/labs/entities/labTests.entity';
import { PatientProblems } from '../entities/patientProblems.entity';
//helpers, constants
import { generateString } from 'src/lib/helper';
import { TemplateType } from 'src/lib/constants';
//inputs
import PatientProblemInput from '../dto/problem-input.dto';
import { CreateProblemInput } from '../dto/create-problem.input';
import { RemoveProblem, SearchIcdCodesInput, SearchSnoMedCodesInput, UpdateProblemInput, UpdateProblemNotesInput, UpdateProblemSignedInput } from '../dto/update-problem.input';
//payloads
import { snoMedCodesPayload } from '../dto/snoMedCodes-payload.dto';
import { PatientProblemsPayload } from '../dto/problems-payload.dto';
import { IcdCodesPayload, ICDCodesWithSnowMedCode } from '../dto/icdCodes-payload.dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepository: Repository<ICDCodes>,
    @InjectRepository(PatientProblems)
    private patientProblemsRepository: Repository<PatientProblems>,
    @InjectRepository(SnoMedCodes)
    private snowMedCodeRepository: Repository<SnoMedCodes>,
    private readonly staffService: StaffService,
    private readonly utilsService: UtilsService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    private readonly physicalExamService: PhysicalExamService,
    private readonly reviewOfSystemService: ReviewOfSystemService,
    private readonly patientMedicationService: PatientMedicationService,
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    @Inject(forwardRef(() => ImagingOrderService))
    private readonly imagingOrderService: ImagingOrderService,
    @Inject(forwardRef(() => LabTestsService))
    private readonly labTestService: LabTestsService,
    @Inject(forwardRef(() => ChartingTemplateService))
    private readonly chartingTemplateService: ChartingTemplateService,
  ) { }

  /**
   * Adds patient problem
   * @param createProblemInput 
   * @returns patient problem 
   */
  async addPatientProblem(createProblemInput: CreateProblemInput): Promise<PatientProblems> {
    try {
      const { medicationIds, testIds, patientId, appointmentId, shouldCreateTemplate, ...problemInputToCreate } = createProblemInput || {}

      //get icdCode
      const icdCode = await this.icdCodeRepository.findOne(createProblemInput.icdCodeId)

      //get patient 
      const patient = await this.patientService.findOne(createProblemInput.patientId)
      //adding patient problem
      const patientProblemInstance = this.patientProblemsRepository.create({ ...problemInputToCreate, ICDCode: icdCode, patient: patient })
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
      //get snowMedCode
      if (createProblemInput.snowMedCodeId) {
        const snowMedCode = await this.snowMedCodeRepository.findOne(createProblemInput.snowMedCodeId)
        patientProblemInstance.snowMedCode = snowMedCode
      }

      if (medicationIds) {
        const patientMedications = await Promise.all(medicationIds.map(async (medicationId) => {
          return await this.patientMedicationService.addPatientMedication({
            medicationId,
            patientId,
            appointmentId,
            status: 'ACTIVE'
          })
        }))

        patientProblemInstance.patientMedications = patientMedications
      }

      if (testIds) {
        const orderNumber = generateString()
        const accessionNumber = generateString(6)
        const patientLabTests = await Promise.all(testIds.map(async (testId) => {
          return await this.labTestService.createLabTest({
            createLabTestItemInput: {
              patientId,
              appointmentId,
              accessionNumber,
              orderNumber,
              status: LabTestStatus.ORDER_ENTERED,
            },
            test: testId
          })
        }))

        patientProblemInstance.labTests = patientLabTests
      }

      if (shouldCreateTemplate) {
        const icdCode = await this.icdCodeRepository.findOne(createProblemInput.icdCodeId)
        const isCovidProblem = icdCode.description.toLowerCase().includes('covid')
        if (isCovidProblem) {
          const covidTemplates = await this.chartingTemplateService.findTemplates('covid')
          covidTemplates.forEach(async (template) => {
            const { templateType, id } = template || {}
            if (templateType === TemplateType.HPI) {
              const existingTemplate = await this.patientIllnessHistoryService.findOneByAppointmentId(appointmentId)
              this.patientIllnessHistoryService.createOrUpdate({ appointmentId, patientId, templateIds: [id], answerResponses: [], id: existingTemplate?.id })
            } else if (templateType === TemplateType.REVIEW_OF_SYSTEM) {
              const existingTemplate = await this.reviewOfSystemService.findOneByAppointmentId(appointmentId)
              this.reviewOfSystemService.createOrUpdate({ appointmentId, patientId, templateIds: [id], answerResponses: [], id: existingTemplate?.id })
            } else {
              const existingTemplate = await this.physicalExamService.findOneByAppointmentId(appointmentId)
              this.physicalExamService.createOrUpdate({ appointmentId, patientId, templateIds: [id], answerResponses: [], id: existingTemplate?.id })
            }
          })
        }
      }
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

  async updatePatientProblemSigned(updateProblemSignedInput: UpdateProblemSignedInput): Promise<PatientProblems> {
    try {
      const { id, isSigned } = updateProblemSignedInput
      if (id) {
        const patientProblem = await this.GetPatientProblem(id)
        patientProblem.isSigned = isSigned
        await this.patientMedicationService.updatePatientMedicationsSigned(id)
        await this.labTestService.updatePatientLabTestSigned(id)
        return await this.patientProblemsRepository.save(patientProblem)
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePatientProblemNotes(updateProblemNotesInput: UpdateProblemNotesInput): Promise<PatientProblems> {
    try {
      const { id, notes } = updateProblemNotesInput
      if (id) {
        const patientProblem = await this.GetPatientProblem(id)
        patientProblem.apNotes = notes
        await this.patientMedicationService.updatePatientMedicationsSigned(id)
        await this.labTestService.updatePatientLabTestSigned(id)
        return await this.patientProblemsRepository.save(patientProblem)
      }
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

  async getPatientProblems(patientId: string, appointmentId?: string) {
    return this.patientProblemsRepository.find({
      where: {
        patientId,
        ...(appointmentId ? { appointmentId } : {})
      }
    })
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

  async getICDCodesWithSnoMedCodes(icdCodes: ICDCodes[]): Promise<ICDCodesWithSnowMedCode[]> {
    const iCDCodes = (await Promise.all(
      icdCodes.map(async (icdCode, i) => {
        const snoMedCodes = await getConnection()
          .getRepository(SnoMedCodes)
          .createQueryBuilder("SnoMedCode")
          .distinctOn(['SnoMedCode.referencedComponentId'])
          .where('SnoMedCode.mapTarget = :searchTerm', { searchTerm: icdCode.code })
          .getMany()

        return {
          ...icdCode,
          snoMedCodes
        }
      })
    ))



    const transformedICDCodes = iCDCodes.reduce((acc, iCDCode, i) => {
      if (iCDCode.snoMedCodes.length) {
        const snoValue = iCDCode.snoMedCodes.map((snoMedCode) => {
          return {
            ...iCDCode,
            snoMedCode
          }
        })
        acc.push(...snoValue)
        return acc
      }

      acc.push(iCDCode)
      return acc
    }, [])

    return transformedICDCodes
  }

  /**
   * Search icd codes
   * @param searchTerm 
   * @returns icd codes 
   */
  async searchIcdCodes(searchIcdCodesInput: SearchIcdCodesInput): Promise<IcdCodesPayload> {

    const { limit, page } = searchIcdCodesInput.paginationOptions
    // const [first, last] = searchIcdCodesInput.searchTerm.split(' ');
    const { searchTerm } = searchIcdCodesInput

    // const snoMedCodes = await getConnection()
    //   .getRepository(SnoMedCodes)
    //   .createQueryBuilder("SnoMedCode")
    //   .distinctOn(['SnoMedCode.referencedComponentId'])
    //   .where('SnoMedCode.referencedComponentId ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }).getMany()

    // let IcdCodes = []
    // if (!!snoMedCodes.length) {
    //   IcdCodes = await Promise.all(snoMedCodes?.map(async ({ mapTarget }) => {
    //     return await this.icdCodeRepository.findOne({
    //       where: { code: mapTarget }
    //     })
    //   }))
    // }

    // const snoMedIcdCodes = !!IcdCodes.length ? IcdCodes.filter((icdCode) => !!icdCode) : []

    const [icdCodes, totalCount] = await getConnection()
      .getRepository(ICDCodes)
      .createQueryBuilder("ICDCode")
      .skip((page - 1) * limit)
      .take(limit)
      .where('ICDCode.code ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('ICDCode.description ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orderBy('ICDCode.priority', 'ASC')
      .getManyAndCount()

    const totalPages = Math.ceil(totalCount / limit)
    return {
      icdCodes: await (await this.getICDCodesWithSnoMedCodes(icdCodes)).filter((v, i, a) => a.findIndex(v2 => (v.code === v2.code && v.snoMedCode === v2.snoMedCode)) === i),
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
      const first = searchIcdCodesInput?.searchTerm;
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
        icdCodes: this.utilsService.mergeArrayAndRemoveDuplicates(icdCodes, paginationResponse.data, 'code').slice(0, limit),
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
      await this.patientMedicationService.removePatientMedicationByProblem(id)
      await this.imagingOrderService.removeByProblemId(id)
      await this.patientProblemsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
