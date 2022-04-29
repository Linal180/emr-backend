import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ProblemService } from 'src/patientCharting/services/patientProblems.service';
import { PatientService } from 'src/patients/services/patient.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import LabTestInput from '../dto/lab-test.input';
import { LabTestPayload } from '../dto/labTest-payload.dto';
import { LabTestsPayload } from '../dto/labTests-payload.dto';
import { RemoveLabTest, UpdateLabTestInput } from '../dto/update-lab-test.input';
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
    private readonly testSpecimenService: TestSpecimenService,
    private readonly appointmentService: AppointmentService
  ) { }

  async createLabTest(createLabTestInput: CreateLabTestInput): Promise<LabTests> {
    try {
      //get diagnoses
      const diagnoses = await this.problemService.getDiagnoses(createLabTestInput.diagnoses)
      //get test 
      const testName = await this.loincCodesService.findOne(createLabTestInput.test)
      //get patient 
      const patient = await this.patientService.findOne(createLabTestInput.createLabTestItemInput.patientId)
      //create lab test 
      const labTestInstance = this.labTestsRepository.create(createLabTestInput.createLabTestItemInput)
      //get appointment 
      if(createLabTestInput.createLabTestItemInput.appointmentId){
      const appointment = await this.appointmentService.findOne(createLabTestInput.createLabTestItemInput.appointmentId)
      labTestInstance.appointment = appointment
      }
      //create test specimen 
      const specimens =  await Promise.all(createLabTestInput.createSpecimenItemInput.map(async (item) => {
        return await this.testSpecimenService.createTestSpecimen(item)
      }));
      labTestInstance.testSpecimens = specimens
      labTestInstance.diagnoses = diagnoses
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
      const diagnoses = await this.problemService.getDiagnoses(updateLabTestInput.diagnoses)
      //get test 
      const testName = await this.loincCodesService.findOne(updateLabTestInput.test)
      //get patient 
      const patient = await this.patientService.findOne(updateLabTestInput.updateLabTestItemInput.patientId)
      //create lab test 
      const labTestInstance = this.labTestsRepository.create(updateLabTestInput.updateLabTestItemInput)
      //get appointment 
      if(updateLabTestInput.updateLabTestItemInput.appointmentId){
      const appointment = await this.appointmentService.findOne(updateLabTestInput.updateLabTestItemInput.appointmentId)
      labTestInstance.appointment = appointment
      }
      //create test specimen 
      const specimens =  await Promise.all(updateLabTestInput.updateSpecimenItemInput.map(async (item) => {
        return await this.testSpecimenService.updateTestSpecimen(item)
      }));
      labTestInstance.testSpecimens = specimens
      labTestInstance.diagnoses = diagnoses
      labTestInstance.test = testName
      labTestInstance.patient = patient
      return await this.labTestsRepository.save(labTestInstance)
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }

  async findAllLabTest(labTestInput: LabTestInput): Promise<LabTestsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<LabTests>(this.labTestsRepository, labTestInput)
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

  async findOne(id: string): Promise<LabTests> {
    const labTest = await this.labTestsRepository.findOne(id);
    if(labTest){
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
      return {labTest}
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

}
