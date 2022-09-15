import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { RemovePatientMedication, UpdatePatientMedicationInput } from '../dto/update-patientMedication.input';
import { PatientMedicationInput, MedicationInput } from '../dto/patientMedication-input.dto';
import { PatientMedication } from '../entities/patientMedication.entity';
import { CreatePatientMedicationInput } from '../dto/create-patientMedications.input';
import { MedicationsPayload, PatientMedicationPayload, PatientMedicationsPayload } from '../dto/patientMedication-payload.dto';
import { Medications } from '../entities/medications.entity';

@Injectable()
export class PatientMedicationService {
  constructor(
    @InjectRepository(PatientMedication)
    private patientMedicationsRepository: Repository<PatientMedication>,
    @InjectRepository(Medications)
    private medicationRepository: Repository<Medications>,
    private readonly paginationService: PaginationService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService
  ) { }


  async addPatientMedication(createPatientMedicationInput: CreatePatientMedicationInput): Promise<PatientMedication> {
    try {
      //create patient patientMedication instance
      const patientMedicationInstance = this.patientMedicationsRepository.create(createPatientMedicationInput)
      // get patient & associate with patientMedication
      if (createPatientMedicationInput.patientId) {
        const patient = await this.patientService.findOne(createPatientMedicationInput.patientId)
        patientMedicationInstance.patient = patient
      }

      if (createPatientMedicationInput.medicationId) {
        const medication = await this.medicationRepository.findOne(createPatientMedicationInput.medicationId)
        patientMedicationInstance.medication = medication
      }
      //save the patientMedication in db
      const patientMedication = await this.patientMedicationsRepository.save(patientMedicationInstance)
      return patientMedication
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient patientMedication
   * @param updatePatientMedicationInput 
   * @returns patient patientMedication 
   */
  async updatePatientMedication(updatePatientMedicationInput: UpdatePatientMedicationInput): Promise<PatientMedication> {
    try {
      return await this.utilsService.updateEntityManager(PatientMedication, updatePatientMedicationInput.id, updatePatientMedicationInput, this.patientMedicationsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient patientMedications
   * @param patientMedicationInput 
   * @returns all patient patientMedications 
   */
  async findAllPatientMedication(patientMedicationInput: PatientMedicationInput): Promise<PatientMedicationsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<PatientMedication>(this.patientMedicationsRepository, patientMedicationInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patientMedications: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPatientMedications(patientId: string) {
    return this.patientMedicationsRepository.find({
      where: {
        patientId
      }
    })
  }

  async findAllMedications(medicationInput: MedicationInput): Promise<MedicationsPayload> {
    const [first] = medicationInput.searchString ? medicationInput.searchString.split(' ') : ''
    try {
      const paginationResponse = await this.paginationService.willPaginate<Medications>(this.medicationRepository, { ...medicationInput, associatedTo: 'Medications', associatedToField: { columnValue: first, columnName: 'fullName', columnName2: 'termType', columnName3: 'rxNumber', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        medications: paginationResponse.data,
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
  async findOne(id: string): Promise<PatientMedication> {
    const patientMedication = await this.patientMedicationsRepository.findOne(id);
    if (patientMedication) {
      return patientMedication
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient PatientMedication not found',
    });
  }

  /**
   * Gets patient patientMedication
   * @param id 
   * @returns patient patientMedication 
   */
  async GetPatientMedication(id: string): Promise<PatientMedication> {
    return await this.findOne(id);
  }

  /**
   * Removes patient patientMedication
   * @param { id } 
   */
  async removePatientMedication({ id }: RemovePatientMedication) {
    try {
      await this.patientMedicationsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMedication(id: string): Promise<Medications> {
    try {
      return await this.medicationRepository.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
