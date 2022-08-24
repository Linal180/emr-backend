import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ProblemService } from 'src/patientCharting/services/patientProblems.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { UtilsService } from 'src/util/utils.service';
import { getConnection, Repository } from 'typeorm';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import CreateLabTestItemInput from '../dto/create-lab-test-Item-input.dto';
import LabTestByOrderNumInput from '../dto/lab-test-orderNum.dto';
import LabTestInput from '../dto/lab-test.input';
import { LabResultPayload, LabTestPayload } from '../dto/labTest-payload.dto';
import { LabTestsPayload } from '../dto/labTests-payload.dto';
import { RemoveLabTest, UpdateLabTestInput, UpdateLabTestItemInput } from '../dto/update-lab-test.input';
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
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly facilityService: FacilityService,
    private readonly testSpecimenService: TestSpecimenService,
    private readonly appointmentService: AppointmentService
  ) { }

  async createLabTest(createLabTestInput: CreateLabTestInput): Promise<LabTests> {
    try {
      //get test 
      const testName = await this.loincCodesService.findOne(createLabTestInput.test)
      //get patient 
      const patient = await this.patientService.findOne(createLabTestInput.createLabTestItemInput.patientId)
      //create lab test 
      const labTestInstance = this.labTestsRepository.create({ ...createLabTestInput.createLabTestItemInput, labTestStatus: createLabTestInput.createLabTestItemInput.status })
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

      labTestInstance.test = testName
      labTestInstance.patient = patient
      return await this.labTestsRepository.save(labTestInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updateLabTest(updateLabTestInput: UpdateLabTestInput): Promise<LabTests> {
    try {
      //get diagnoses


      //create lab test 
      const labTestInstance = this.labTestsRepository.create({ ...updateLabTestInput.updateLabTestItemInput, labTestStatus: updateLabTestInput.updateLabTestItemInput.status })

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

  async findAllLabTest(labTestInput: LabTestInput): Promise<LabTestsPayload> {
    try {
      const { paginationOptions, orderNumber, patientId, labTestStatus, practiceId, receivedDate } = labTestInput
      const { limit, page } = paginationOptions
      const labTestsQuery = getConnection()
        .getRepository(LabTests)
        .createQueryBuilder('labTests')
        .skip((page - 1) * limit)
        .take(limit)
        .andWhere(patientId ? 'labTests.patientId = :patientId' : '1=1', { patientId: patientId })
        .andWhere(orderNumber ? 'labTests.orderNumber ILIKE :orderNumber' : '1=1', { orderNumber: `%${orderNumber}%` })
        .andWhere(labTestStatus ? 'labTests.labTestStatus != :labTestStatus' : '1=1', { labTestStatus: labTestStatus })
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

  async GetLabTest(id: string): Promise<LabTestPayload> {
    const labTest = await this.findOne(id);
    if (labTest) {
      return { labTest }
    }
  }

  async findLabTestByTestAndOrderNo(orderNum: string, testName: string): Promise<LabTests> {
    const labTest = await this.labTestsRepository.findOne({
      relations: ['test', 'testObservations'],
      where: {
        orderNumber: orderNum,
        test: {
          component: testName
        }
      }
    });
    if (labTest) {
      return labTest
    }
  }

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

  async updateLabTestsByOrderNumber(updateLabTestItemInput: CreateLabTestItemInput): Promise<LabTests[]> {
    try {
      const labTests = await this.labTestsRepository.find({ orderNumber: updateLabTestItemInput.orderNumber })
      if (!labTests.length) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Lab test not found',
        });
      }
      const { primaryProviderId, referringProviderId, ...labTestInfo } = updateLabTestItemInput
      const updatedLabTests = await Promise.all(await labTests.map(async (labTest) => {
        if (primaryProviderId) {
          const primaryProvider = await this.doctorService.findOne(primaryProviderId)
          labTest.primaryProvider = primaryProvider
        }

        if (referringProviderId) {
          const referringProvider = await this.doctorService.findOne(referringProviderId)
          labTest.referringProvider = referringProvider
        }

        return this.labTestsRepository.save({ ...labTest, ...labTestInfo })
      }))

      return updatedLabTests
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findLabResultInfo(orderNumber): Promise<LabResultPayload> {
    const labTests = await this.labTestsRepository.find({ orderNumber })
    const { patientId, primaryProviderId } = labTests?.[0] || {}
    const doctor = await this.doctorService.findOne(primaryProviderId)
    const patientInfo = await this.patientService.findOne(patientId)
    const facilityInfo = await this.facilityService.findOne(patientInfo.facilityId)

    return {
      patientInfo,
      facilityInfo,
      doctor,
      labTests
    }
  }

  async find() {
    return this.labTestsRepository.find()
  }
}
