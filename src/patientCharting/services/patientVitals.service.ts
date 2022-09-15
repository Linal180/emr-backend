import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateVitalInput } from '../dto/create-vital.input';
import { RemoveVital, UpdateVitalInput } from '../dto/update-vital.input';
import PatientVitalInput from '../dto/vital-input.dto';
import { PatientVitalsPayload } from '../dto/vitals-payload.dto';
import { PatientVitals } from '../entities/patientVitals.entity';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(PatientVitals)
    private patientVitalsRepository: Repository<PatientVitals>,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    private readonly staffService: StaffService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService
  ) { }


  async addPatientVital(createVitalInput: CreateVitalInput): Promise<PatientVitals> {
    try {
      //create patient vital instance
      const patientVitalInstance = this.patientVitalsRepository.create(createVitalInput)
      //get appointment & associate with vital
      if (createVitalInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(createVitalInput.appointmentId)
        patientVitalInstance.appointment = appointment
      }
      //get patient & associate with vital
      if (createVitalInput.patientId) {
        const patient = await this.patientService.findOne(createVitalInput.patientId)
        patientVitalInstance.patient = patient
      }
      //get staff & associate with vital
      if (createVitalInput.staffId) {
        const staff = await this.staffService.findOne(createVitalInput.staffId)
        patientVitalInstance.addedBy = staff
      }
      //save the vital in db
      const patientVital = await this.patientVitalsRepository.save(patientVitalInstance)
      return patientVital
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient vital
   * @param updateVitalInput 
   * @returns patient vital 
   */
  async updatePatientVital(updateVitalInput: UpdateVitalInput): Promise<PatientVitals> {
    try {
      return await this.utilsService.updateEntityManager(PatientVitals, updateVitalInput.id, updateVitalInput, this.patientVitalsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient vitals
   * @param patientVitalInput 
   * @returns all patient vitals 
   */
  async findAllPatientVitals(patientVitalInput: PatientVitalInput): Promise<PatientVitalsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<PatientVitals>(this.patientVitalsRepository, patientVitalInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patientVitals: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPatientVitals(patientId: string) {
    return this.patientVitalsRepository.find({
      where: {
        patientId
      }
    })
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<PatientVitals> {
    const patientVital = await this.patientVitalsRepository.findOne(id);
    if (patientVital) {
      return patientVital
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Vital not found',
    });
  }

  /**
   * Gets patient vital
   * @param id 
   * @returns patient vital 
   */
  async GetPatientVital(id: string): Promise<PatientVitals> {
    return await this.findOne(id);
  }

  /**
   * Params vitals service
   * @param patientId 
   * @returns patient latest vital 
   */
  async GetPatientLatestVital(patientId: string): Promise<PatientVitals> {
    const patientLatestVital = await this.patientVitalsRepository.find({
      where: { patientId },
      order: { vitalCreationDate: -1 },
    })

    return patientLatestVital[0]
  }

  /**
   * Removes patient vital
   * @param { id } 
   */
  async removePatientVital({ id }: RemoveVital) {
    try {
      await this.patientVitalsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
