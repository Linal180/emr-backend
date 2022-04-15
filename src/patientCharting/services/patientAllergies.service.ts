import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreatePatientAllergyInput } from '../dto/create-patient-allergy.input';
import { Allergies } from '../entities/allergies.entity';
import { PatientAllergies } from '../entities/patientAllergies.entity';
import { Reactions } from '../entities/reactions.entity';
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


  async addPatientAllergy(createPatientAllergyInput: CreatePatientAllergyInput): Promise<PatientAllergies> {
    try {
      //get patient 
      const patient  = await this.patientService.findOne(createPatientAllergyInput.patientId)
      if(!patient){
          throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Patient not found',
       });
      }
      //get patient 
      const allergy  = await this.patientService.findOne(createPatientAllergyInput.allergyId)
      if(!allergy){
        throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Allergy not found',
       });
      }
      //adding patient problem
      const patientAllergyInstance = this.patientAllergiesRepository.create({...createPatientAllergyInput, allergy: allergy, patient: patient})
      //get appointments
      if(createPatientAllergyInput.appointmentId){
        const appointment = await this.appointmentService.findOne(createPatientAllergyInput.appointmentId)
        patientAllergyInstance.appointment = appointment
      }
      //get provider
      if(createPatientAllergyInput.providerId){
        const provider = await this.doctorService.findOne(createPatientAllergyInput.providerId)
        patientAllergyInstance.doctor = provider
      } 
      //get staff
       if(createPatientAllergyInput.staffId){
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

  async patientReactionsPayload(reactions: Reactions[], patientAllergy: PatientAllergies){
    return reactions.map((item)=>{
      return {
        reactions:item,
        reactionsId: item.id,
        patientAllergies: patientAllergy,
        patientAllergiesId: patientAllergy.id
      }
    })
   }


  // async updatePatientProblem(updateProblemInput: UpdateProblemInput): Promise<PatientProblems> {
  //   try {
  //     return await this.utilsService.updateEntityManager(PatientProblems, updateProblemInput.id, updateProblemInput, this.patientProblemsRepository)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async findAllPatientProblem(patientProblemInput: PatientProblemInput): Promise<PatientProblemsPayload> {
  //   try {
  //     const paginationResponse = await this.paginationService.willPaginate<PatientProblems>(this.patientProblemsRepository, patientProblemInput)
  //     return {
  //       pagination: {
  //         ...paginationResponse
  //       },
  //       patientProblems: paginationResponse.data,
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }


  // async findOne(id: string): Promise<PatientProblems> {
  //   const patientProblem = await this.patientProblemsRepository.findOne(id);
  //   if(patientProblem){
  //     return patientProblem
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'Patient Problem not found',
  //   });
  // }

  // async GetPatientProblem(id: string): Promise<PatientProblems> {
  //   return await this.findOne(id);
  // }


  // async removePatientProblem({ id }: RemoveProblem) {
  //   try {
  //     await this.patientAllergiesRepository.delete(id)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
