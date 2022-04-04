import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateProblemInput } from '../dto/create-problem.input';
import PatientProblemInput from '../dto/problem-input.dto';
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
    private readonly appointmentService: AppointmentService,
    private readonly doctorService: DoctorService,
    private readonly staffService: StaffService,
    private readonly utilsService: UtilsService
  ) { }

  async addPatientProblem(createProblemInput: CreateProblemInput): Promise<PatientProblems> {
    try {
      //get icdCode
      const icdCode = await this.icdCodeRepository.findOne(createProblemInput.icdCodeId)
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
      const patientProblem = await this.patientProblemsRepository.save(patientProblemInstance)
      return patientProblem
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updatePatientProblem(updateProblemInput: UpdateProblemInput): Promise<PatientProblems> {
    try {
      return await this.utilsService.updateEntityManager(PatientProblems, updateProblemInput.id, updateProblemInput, this.patientProblemsRepository)
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
    const patientProblem = await this.patientProblemsRepository.findOne(id);
    if(patientProblem){
      return patientProblem
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Problem not found',
    });
  }

  async GetPatientProblem(id: string): Promise<PatientProblems> {
    return await this.findOne(id);
  }

  async removePatientProblem({ id }: RemoveProblem) {
    try {
      await this.patientProblemsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
