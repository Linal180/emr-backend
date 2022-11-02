import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, ILike, Repository } from 'typeorm';
import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//services
import { LoincCodesService } from './loincCodes.service';
import { TestSpecimenService } from './testSpecimen.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PatientService } from 'src/patients/services/patient.service';
import { ContactService } from 'src/providers/services/contact.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { ProblemService } from 'src/patientCharting/services/patientProblems.service';
//entities
import { LabTests } from '../entities/labTests.entity';
import { Patient } from 'src/patients/entities/patient.entity';
//inputs
import LabTestInput from '../dto/lab-test.input';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import LabTestByOrderNumInput from '../dto/lab-test-orderNum.dto';
import CreateLabTestItemInput from '../dto/create-lab-test-Item-input.dto';
import { RemoveLabTest, UpdateLabTestInput } from '../dto/update-lab-test.input';
//payloads
import { LabTestsPayload } from '../dto/labTests-payload.dto';
import { LabResultPayload, LabTestPayload } from '../dto/labTest-payload.dto';

@Injectable()
export class LabTestsService {
  constructor(
    @InjectRepository(LabTests)
    private labTestsRepository: Repository<LabTests>,
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly contactService: ContactService,
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    private readonly loincCodesService: LoincCodesService,
    private readonly appointmentService: AppointmentService,
    private readonly testSpecimenService: TestSpecimenService,
  ) { }

  /**
   * Creates lab test
   * @param createLabTestInput 
   * @returns lab test 
   */
  async createLabTest(createLabTestInput: CreateLabTestInput): Promise<LabTests> {
    try {
      const { createLabTestItemInput } = createLabTestInput
      const { collectedDate } = createLabTestItemInput
      //get test 
      const testName = await this.loincCodesService.findOne(createLabTestInput.test)
      //get patient 
      const patient = await this.patientService.findOne(createLabTestInput.createLabTestItemInput.patientId)
      //create lab test 
      const labTestInstance = this.labTestsRepository.create({
        ...createLabTestItemInput,
        labTestStatus: createLabTestInput.createLabTestItemInput.status, collectedDate: collectedDate ? collectedDate : moment().format("MM-DD-YYYY")
      })
      //get appointment 
      if (createLabTestInput.createLabTestItemInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(createLabTestInput.createLabTestItemInput.appointmentId)
        labTestInstance.appointment = appointment
      }
      //create test specimen 
      if (createLabTestInput.createSpecimenItemInput) {
        const specimens = await Promise.all(createLabTestInput.createSpecimenItemInput.map(async (item) => {
          return await this.testSpecimenService.createTestSpecimen(item)
        }));
        labTestInstance.testSpecimens = specimens
      }

      if (createLabTestInput.diagnoses) {
        //get diagnoses
        const diagnoses = await this.problemService.getDiagnoses(createLabTestInput.diagnoses)
        labTestInstance.diagnoses = diagnoses
      }

      if (createLabTestInput.createLabTestItemInput.problemId) {
        //get patientProblem
        const patientProblem = await this.problemService.findOne(createLabTestInput.createLabTestItemInput.problemId)
        labTestInstance.patientProblem = patientProblem
      }

      // if (primaryProviderId) {
      //   await this.patientService.updatePatientProvider({ patientId, providerId: primaryProviderId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER })
      // }

      labTestInstance.test = testName
      labTestInstance.patient = patient
      return await this.labTestsRepository.save(labTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates lab test
   * @param updateLabTestInput 
   * @returns lab test 
   */
  async updateLabTest(updateLabTestInput: UpdateLabTestInput): Promise<LabTests> {
    try {
      const { updateLabTestItemInput } = updateLabTestInput
      const { collectedDate } = updateLabTestItemInput

      //create lab test 
      const labTestInstance = this.labTestsRepository.create({
        ...updateLabTestItemInput,
        labTestStatus: updateLabTestInput.updateLabTestItemInput.status, collectedDate: collectedDate ? collectedDate : moment().format("MM-DD-YYYY")
      })

      //get appointment 
      if (updateLabTestInput.updateLabTestItemInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(updateLabTestInput.updateLabTestItemInput.appointmentId)
        labTestInstance.appointment = appointment
      }
      //create test specimen 
      if (updateLabTestInput.updateSpecimenItemInput) {
        const specimens = await Promise.all(updateLabTestInput.updateSpecimenItemInput.map(async (item) => {
          if (item.id) {
            return await this.testSpecimenService.updateTestSpecimen(item)
          }
          const { id, ...createSpecimenInput } = item
          return await this.testSpecimenService.createTestSpecimen(createSpecimenInput)
        }));

        labTestInstance.testSpecimens = specimens
      } else {
        labTestInstance.testSpecimens = []
      }

      if (updateLabTestInput.diagnoses) {
        const diagnoses = await this.problemService.getDiagnoses(updateLabTestInput.diagnoses)
        labTestInstance.diagnoses = diagnoses
      }

      if (updateLabTestInput.updateLabTestItemInput.doctorId) {
        const doctor = await this.doctorService.findOne(updateLabTestInput.updateLabTestItemInput.doctorId)
        labTestInstance.doctor = doctor
      }

      // if (primaryProviderId) {
      //   await this.patientService.updatePatientProvider({ patientId, providerId: primaryProviderId, relation: DoctorPatientRelationType.PRIMARY_PROVIDER })
      // }

      if (updateLabTestInput.test) {
        //get test 
        const testName = await this.loincCodesService.findOne(updateLabTestInput.test)
        labTestInstance.test = testName
      }

      if (updateLabTestInput.updateLabTestItemInput.patientId) {
        //get patient 
        const patient = await this.patientService.findOne(updateLabTestInput.updateLabTestItemInput.patientId)
        labTestInstance.patient = patient
      }

      return await this.labTestsRepository.save(labTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all lab test
   * @param labTestInput 
   * @returns all lab test 
   */
  async findAllLabTest(labTestInput: LabTestInput): Promise<LabTestsPayload> {
    try {
      const { paginationOptions, orderNumber, patientId, labTestStatus, practiceId, receivedDate, shouldFetchReceived, shouldFetchPending } = labTestInput
      const { limit, page } = paginationOptions

      const labTestsQuery = getConnection()
        .getRepository(LabTests)
        .createQueryBuilder('labTests')
        .leftJoinAndSelect('labTests.diagnoses', 'diagnoses')
        .skip((page - 1) * limit)
        .take(limit)
        .andWhere(patientId ? 'labTests.patientId = :patientId' : '1=1', { patientId: patientId })
        .andWhere(orderNumber ? 'labTests.orderNumber ILIKE :orderNumber' : '1=1', { orderNumber: `%${orderNumber}%` })
        .andWhere(labTestStatus ? 'labTests.labTestStatus = :labTestStatus' : '1=1', { labTestStatus: labTestStatus })
        .andWhere(shouldFetchReceived ? 'labTests.receivedDate is not null' : '1=1')
        .andWhere(shouldFetchPending ? 'labTests.receivedDate is null' : '1=1')
        .andWhere(receivedDate ? 'labTests.receivedDate = :receivedDate' : '1=1', { receivedDate: moment(receivedDate).format('MM-DD-YYYY') })

      if (practiceId) {
        labTestsQuery.
          innerJoin(Patient, 'labTestPatient', `labTests.patientId = "labTestPatient"."id"`)
          .andWhere('labTestPatient.practiceId = :practiceId', { practiceId: practiceId })
      }

      const [labTests, totalCount] = await labTestsQuery
        .orderBy('labTests.createdAt', 'DESC')
        .getManyAndCount()

      const totalPages = Math.ceil(totalCount / limit)

      return {
        pagination: {
          totalCount,
          page,
          limit,
          totalPages,
        },
        labTests
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds lab tests by order num
   * @param labTestByOrderNumInput 
   * @returns lab tests by order num 
   */
  async findLabTestsByOrderNum(labTestByOrderNumInput: LabTestByOrderNumInput): Promise<LabTestsPayload> {
    if (labTestByOrderNumInput.paginationOptions) {
      try {
        const paginationResponse = await this.paginationService.willPaginate<LabTests>(this.labTestsRepository, {
          ...labTestByOrderNumInput,
          paginationOptions: { page: labTestByOrderNumInput.paginationOptions.page, limit: labTestByOrderNumInput.paginationOptions.limit }
        })
        return {
          pagination: {
            ...paginationResponse
          },
          labTests: paginationResponse.data,
        }
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }

    const labTests = await this.labTestsRepository.find({ orderNumber: labTestByOrderNumInput.orderNumber })
    //Pagination is not required here 
    if (labTests.length) {
      return {
        labTests,
        pagination: {
          page: 0,
          limit: 0,
          totalCount: 0,
          totalPages: 0
        }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab tests not found',
    });
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<LabTests> {
    const labTest = await this.labTestsRepository.findOne(id);
    if (labTest) {
      return labTest
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab test not found',
    });
  }

  /**
   * Gets lab test
   * @param id 
   * @returns lab test 
   */
  async GetLabTest(id: string): Promise<LabTestPayload> {
    const labTest = await this.findOne(id);
    if (labTest) {
      return { labTest }
    }
  }

  /**
   * Gets lab tests by problem id
   * @param problemId 
   * @returns lab tests by problem id 
   */
  async GetLabTestsByProblemId(problemId: string): Promise<LabTests[]> {
    return await this.labTestsRepository.find({ where: { patientProblemId: problemId } });
  }

  /**
   * Updates patient lab test signed
   * @param problemId 
   * @returns  
   */
  async updatePatientLabTestSigned(problemId: string) {
    const labTests = await this.labTestsRepository.find({ where: { patientProblemId: problemId } })
    labTests.forEach(async (labTest) => {
      labTest.isSigned = true
      return await this.labTestsRepository.save(labTest)
    })
    return labTests
  }

  /**
   * Finds lab test by test and order no
   * @param orderNum 
   * @param testName 
   * @returns lab test by test and order no 
   */
  async findLabTestByTestAndOrderNo(orderNum: string, testName: string): Promise<LabTests> {
    const labTest = await this.labTestsRepository.findOne({
      relations: ['test', 'testObservations'],
      where: {
        orderNumber: orderNum,
        test: {
          component: ILike(testName)
        }
      }
    });
    if (labTest) {
      return labTest
    }
  }

  /**
   * Removes lab test
   * @param { id } 
   */
  async removeLabTest({ id }: RemoveLabTest) {
    try {
      const labTest = await this.findOne(id)
      if (labTest) {
        await this.labTestsRepository.delete(labTest.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Lab test not found',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates lab tests by order number
   * @param updateLabTestItemInput 
   * @returns lab tests by order number 
   */
  async updateLabTestsByOrderNumber(updateLabTestItemInput: CreateLabTestItemInput): Promise<LabTests[]> {
    try {
      const labTests = await this.labTestsRepository.find({ orderNumber: updateLabTestItemInput.orderNumber })
      if (!labTests.length) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Lab test not found',
        });
      }
      const { primaryProviderId, referringProviderId, status: labTestStatus, ...labTestInfo } = updateLabTestItemInput
      const updatedLabTests = await Promise.all(await labTests.map(async (labTest) => {
        if (primaryProviderId) {
          const primaryProvider = await this.doctorService.findOne(primaryProviderId)
          labTest.primaryProvider = primaryProvider
        }

        if (referringProviderId) {
          const referringProvider = await this.doctorService.findOne(referringProviderId)
          labTest.referringProvider = referringProvider
        }

        return await this.labTestsRepository.save({ ...labTest, ...labTestInfo, labTestStatus: labTestStatus ? labTestStatus : labTest.labTestStatus })
      }))

      return updatedLabTests
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds lab result info
   * @param orderNumber 
   * @returns lab result info 
   */
  async findLabResultInfo(orderNumber): Promise<LabResultPayload> {
    const labTests = await this.labTestsRepository.find({ orderNumber })
    const { patientId, primaryProviderId } = labTests?.[0] || {}
    const doctor = await this.doctorService.findOne(primaryProviderId)
    const patientInfo = await this.patientService.findOne(patientId)
    const patientContacts = await this.contactService.findContactsByPatientId(patientId)
    const facilityInfo = await this.facilityService.findOne(patientInfo.facilityId)
    const facilityContacts = await this.contactService.findContactsByFacilityId(patientInfo.facilityId)

    return {
      patientInfo: { ...patientInfo, contacts: patientContacts },
      facilityInfo: { ...facilityInfo, contacts: facilityContacts },
      doctor,
      labTests
    }
  }
}
