import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { AllergiesPayload } from '../dto/allergiess-payload.dto';
import AllergyInput from '../dto/allergy-input.dto';
import { CreatePatientAllergyInput } from '../dto/create-patient-allergy.input';
import { PatientAllergiesPayload } from '../dto/patient-allergiess-payload.dto';
import PatientAllergyInput from '../dto/patient-allergy-input.dto';
import { RemovePatientAllergy, UpdateAllergyInput } from '../dto/update-allergy.input';
import { Allergies } from '../entities/allergies.entity';
import { PatientAllergies } from '../entities/patientAllergies.entity';
import { ReactionsService } from './reactions.service';

@Injectable()
export class PatientAllergiesService {
  constructor(
    @InjectRepository(PatientAllergies)
    private patientAllergiesRepository: Repository<PatientAllergies>,
    @InjectRepository(Allergies)
    private allergiesRepository: Repository<Allergies>,
    private readonly paginationService: PaginationService,
    private readonly reactionsService: ReactionsService,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
    private readonly doctorService: DoctorService,
    private readonly staffService: StaffService,
    private readonly utilsService: UtilsService
  ) { }

  /**
   * Adds patient allergy
   * @param createPatientAllergyInput 
   * @returns patient allergy 
   */
  async addPatientAllergy(createPatientAllergyInput: CreatePatientAllergyInput): Promise<PatientAllergies> {
    try {
      //get patient 
      const patient = await this.patientService.findOne(createPatientAllergyInput.patientId)
      if (!patient) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Patient not found',
        });
      }
      //get patient
      let allergy
      if (createPatientAllergyInput.allergyId) {
        allergy = await this.allergiesRepository.findOne(createPatientAllergyInput.allergyId)
        if (!allergy) {
          throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            error: 'Allergy not found',
          });
        }
      } else if (createPatientAllergyInput.allergyName) {
        let allergyInstance = this.allergiesRepository.create({ name: createPatientAllergyInput.allergyName, allergyType: createPatientAllergyInput.allergyType })
        allergy = await this.allergiesRepository.save(allergyInstance)
      }
      //adding patient problem
      const patientAllergyInstance = this.patientAllergiesRepository.create({ ...createPatientAllergyInput, allergy: allergy, patient: patient })
      //get appointments
      if (createPatientAllergyInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(createPatientAllergyInput.appointmentId)
        patientAllergyInstance.appointment = appointment
      }
      //get provider
      if (createPatientAllergyInput.providerId) {
        const provider = await this.doctorService.findOne(createPatientAllergyInput.providerId)
        patientAllergyInstance.doctor = provider
      }
      //get staff
      if (createPatientAllergyInput.staffId) {
        const staff = await this.staffService.findOne(createPatientAllergyInput.staffId)
        patientAllergyInstance.staff = staff
      }
      const patientAllergyRes = await this.patientAllergiesRepository.save(patientAllergyInstance)
      //create reactions 
      const reactions = await this.reactionsService.getReactions(createPatientAllergyInput.reactionsIds)
      patientAllergyRes.reactions = reactions
      const patientAllergy = await this.patientAllergiesRepository.save(patientAllergyRes)
      return patientAllergy
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient allergy
   * @param updateAllergyInput 
   * @returns patient allergy 
   */
  async updatePatientAllergy(updateAllergyInput: UpdateAllergyInput): Promise<PatientAllergies> {
    try {
      await this.utilsService.updateEntityManager(PatientAllergies, updateAllergyInput.updatePatientAllergyInput.id, updateAllergyInput.updatePatientAllergyInput, this.patientAllergiesRepository)
      //get allergy 
      const allergy = await this.allergiesRepository.findOne(updateAllergyInput.allergyId)
      //adding patient allergy
      const patientAllergyInstance = await this.patientAllergiesRepository.findOne(updateAllergyInput.updatePatientAllergyInput.id)
      if (!patientAllergyInstance) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Patient allergy not found',
        });
      }
      patientAllergyInstance.allergy = allergy
      //get appointments
      if (updateAllergyInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(updateAllergyInput.appointmentId)
        patientAllergyInstance.appointment = appointment
      }
      //get provider
      if (updateAllergyInput.providerId) {
        const provider = await this.doctorService.findOne(updateAllergyInput.providerId)
        patientAllergyInstance.doctor = provider
      }
      //get staff
      if (updateAllergyInput.staffId) {
        const staff = await this.staffService.findOne(updateAllergyInput.staffId)
        patientAllergyInstance.staff = staff
      }
      const patientAllergyRes = await this.patientAllergiesRepository.save(patientAllergyInstance)
      //create reactions 
      const reactions = await this.reactionsService.getReactions(updateAllergyInput.reactionsIds)
      patientAllergyRes.reactions = reactions
      const patientAllergy = await this.patientAllergiesRepository.save(patientAllergyRes)
      return patientAllergy
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient allergies
   * @param patientAllergyInput 
   * @returns all patient allergies 
   */
  async findAllPatientAllergies(patientAllergyInput: PatientAllergyInput): Promise<PatientAllergiesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<PatientAllergies>(this.patientAllergiesRepository, patientAllergyInput)
      return {
        pagination: {
          ...paginationResponse
        },
        patientAllergies: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPatientAllergies(patientId: string, appointmentId?: string) {
    return this.patientAllergiesRepository.find({
      where: {
        patientId,
        ...(appointmentId ? { appointmentId } : {})
      }
    })
  }

  /**
   * Finds all allergies
   * @param allergyInput 
   * @returns all allergies 
   */
  async findAllAllergies(allergyInput: AllergyInput): Promise<AllergiesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Allergies>(this.allergiesRepository, allergyInput)
      return {
        pagination: {
          ...paginationResponse
        },
        allergies: paginationResponse.data,
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
  async findOne(id: string): Promise<PatientAllergies> {
    const patientAllergy = await this.patientAllergiesRepository.findOne(id);
    if (patientAllergy) {
      return patientAllergy
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Allergy not found',
    });
  }

  /**
   * Gets patient allergy
   * @param id 
   * @returns patient allergy 
   */
  async GetPatientAllergy(id: string): Promise<PatientAllergies> {
    return await this.findOne(id);
  }

  /**
   * Removes patient allergy
   * @param { id } 
   */
  async removePatientAllergy({ id }: RemovePatientAllergy) {
    try {
      await this.patientAllergiesRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
