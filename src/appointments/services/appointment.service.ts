import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { Repository } from 'typeorm';
import AppointmentInput from '../dto/appointment-input.dto';
import { AppointmentPayload } from '../dto/appointment-payload.dto';
import { AppointmentsPayload } from '../dto/appointments-payload.dto';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { RemoveAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly paginationService: PaginationService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly facilityService: FacilityService,
    private readonly servicesService: ServicesService
  ) { }

  /**
   * Creates appointment
   * @param createAppointmentInput 
   * @returns appointment 
   */
  async createAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
    try {
      //fetch already exiting appointment
      const appointmentObj = await this.findAppointment(createAppointmentInput.providerId, createAppointmentInput.patientId)
      if(!appointmentObj){
      //creating appointment
      const appointmentInstance = this.appointmentRepository.create(createAppointmentInput)
      //associate provider 
      if(createAppointmentInput.providerId){
      const provider = await this.doctorService.findOne(createAppointmentInput.providerId)
      appointmentInstance.provider = provider
      }
      //associate patient
      if(createAppointmentInput.patientId){
        const patient = await this.patientService.findOne(createAppointmentInput.patientId)
        appointmentInstance.patient = patient
      }
      //associate facility 
      if(createAppointmentInput.facilityId){
        const facility = await this.facilityService.findOne(createAppointmentInput.facilityId)
        appointmentInstance.facility = facility
      }
      //associate service 
      if(createAppointmentInput.serviceId){
        const service = await this.servicesService.findOne(createAppointmentInput.serviceId)
        appointmentInstance.appointmentType = service
      }
      const appointment = await this.appointmentRepository.save(appointmentInstance);
      return appointment
    }
    throw new ConflictException({
      status: HttpStatus.CONFLICT,
      error: 'Your appointment with this provider already exists',
    });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all appointments
   * @param appointmentInput 
   * @returns all appointments 
   */
  async findAllAppointments(appointmentInput: AppointmentInput): Promise<AppointmentsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Appointment>(this.appointmentRepository, appointmentInput)
      return {
        pagination: {
          ...paginationResponse
        },
        appointments: paginationResponse.data,
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
  async findOne(id: string): Promise<Appointment> {
    return await this.appointmentRepository.findOne(id);
  }

  /**
   * Finds appointment
   * @param providerId 
   * @param patientId 
   * @returns  
   */
  async findAppointment(providerId: string, patientId: string){
    return  await this.appointmentRepository.findOne({
      where : [
          {patientId : patientId, providerId: providerId} 
      ]
    });
  }

  /**
   * Gets appointment
   * @param id 
   * @returns appointment 
   */
  async getAppointment(id: string): Promise<AppointmentPayload> {
    const appointment = await this.findOne(id);
    if (appointment) {
      return { appointment }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }

  /**
   * Updates appointment
   * @param updateAppointmentInput 
   * @returns appointment 
   */
  async updateAppointment(updateAppointmentInput: UpdateAppointmentInput): Promise<Appointment> {
    try {
      const appointment = await this.appointmentRepository.save(updateAppointmentInput)
      return appointment
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes appointment
   * @param { id } 
   */
  async removeAppointment({ id }: RemoveAppointment) {
    try {
      await this.appointmentRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
