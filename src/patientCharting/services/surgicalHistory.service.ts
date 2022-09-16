import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateSurgicalHistoryInput } from '../dto/create-surgicalHistory.input';
import PatientSurgicalHistoryInput from '../dto/surgicalHistory-input.dto';
import { SurgicalHistoriesPayload } from '../dto/surgicalHistory-payload.dto';
import { RemoveSurgicalHistory, UpdateSurgicalHistoryInput } from '../dto/update-surgicalHistory.input';
import { SurgicalHistory } from '../entities/surgicalHistory.entity';

@Injectable()
export class SurgicalHistoryService {
  constructor(
    @InjectRepository(SurgicalHistory)
    private SurgicalHistoryRepository: Repository<SurgicalHistory>,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService
  ) { }


  async addSurgicalHistory(createSurgicalHistoryInput: CreateSurgicalHistoryInput): Promise<SurgicalHistory> {
    try {
      //create patient surgicalHistory instance
      const surgicalHistoryInstance = this.SurgicalHistoryRepository.create(createSurgicalHistoryInput)
      //get patient & associate with surgicalHistory
      if (createSurgicalHistoryInput.patientId) {
        const patient = await this.patientService.findOne(createSurgicalHistoryInput.patientId)
        surgicalHistoryInstance.patient = patient
      }
      //save the surgicalHistory in db
      const surgicalHistory = await this.SurgicalHistoryRepository.save(surgicalHistoryInstance)
      return surgicalHistory
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient surgicalHistory
   * @param updateSurgicalHistoryInput 
   * @returns patient surgicalHistory 
   */
  async updateSurgicalHistory(updateSurgicalHistoryInput: UpdateSurgicalHistoryInput): Promise<SurgicalHistory> {
    try {
      return await this.utilsService.updateEntityManager(SurgicalHistory, updateSurgicalHistoryInput.id, updateSurgicalHistoryInput, this.SurgicalHistoryRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient SurgicalHistory
   * @param surgicalHistoryInput 
   * @returns all patient SurgicalHistory 
   */
  async findAllSurgicalHistory(surgicalHistoryInput: PatientSurgicalHistoryInput): Promise<SurgicalHistoriesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<SurgicalHistory>(this.SurgicalHistoryRepository, surgicalHistoryInput)
      return {
        pagination: {
          ...paginationResponse
        },
        surgicalHistories: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPatientSurgicalHistory(patientId: string) {
    return this.SurgicalHistoryRepository.find({
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
  async findOne(id: string): Promise<SurgicalHistory> {
    const surgicalHistory = await this.SurgicalHistoryRepository.findOne(id);
    if (surgicalHistory) {
      return surgicalHistory
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient SurgicalHistory not found',
    });
  }

  /**
   * Gets patient surgicalHistory
   * @param id 
   * @returns patient surgicalHistory 
   */
  async GetSurgicalHistory(id: string): Promise<SurgicalHistory> {
    return await this.findOne(id);
  }

  /**
   * Removes patient surgicalHistory
   * @param { id } 
   */
  async removeSurgicalHistory({ id }: RemoveSurgicalHistory) {
    try {
      await this.SurgicalHistoryRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
