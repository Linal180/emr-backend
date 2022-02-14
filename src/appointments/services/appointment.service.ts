import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { createToken } from 'src/lib/helper';
import { MailerService } from 'src/mailer/mailer.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { GetDoctorSchedule, GetDoctorSlots } from 'src/providers/dto/update-schedule.input';
import { DoctorService } from 'src/providers/services/doctor.service';
import { Connection, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import AppointmentInput from '../dto/appointment-input.dto';
import { AppointmentPayload } from '../dto/appointment-payload.dto';
import { AppointmentsPayload } from '../dto/appointments-payload.dto';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { CreateExternalAppointmentInput } from '../dto/create-external-appointment.input';
import { CancelAppointment, GetDoctorAppointment, RemoveAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { Appointment, APPOINTMENTSTATUS } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly paginationService: PaginationService,
    private readonly doctorService: DoctorService,
    private readonly connection: Connection,
    private readonly patientService: PatientService,
    private readonly mailerService: MailerService,
    private readonly facilityService: FacilityService,
    private readonly servicesService: ServicesService
  ) { }

  /**
   * Creates appointment
   * @param createAppointmentInput 
   * @returns appointment 
   */
  async createAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
     //Transaction start
     const queryRunner = this.connection.createQueryRunner();
     await queryRunner.connect();
     await queryRunner.startTransaction();
    try {
      //fetch already exiting appointment
      const appointmentObj = await this.findAppointment(createAppointmentInput.providerId, createAppointmentInput.patientId)
      if(!appointmentObj){
      //creating appointment
      const appointmentInstance = this.appointmentRepository.create({...createAppointmentInput, isExternal: true})
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
      await queryRunner.commitTransaction();
      return appointment
    }
    throw new ConflictException({
      status: HttpStatus.CONFLICT,
      error: 'Your appointment with this provider already exists',
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  } finally {
    await queryRunner.release();
  }
}
  async createExternalAppointmentInput(createExternalAppointmentInput: CreateExternalAppointmentInput): Promise<Appointment> {
     //Transaction start
     const queryRunner = this.connection.createQueryRunner();
     await queryRunner.connect();
     await queryRunner.startTransaction();
    try {
       //create patient 
       const patientInstance = await this.patientService.addPatient(createExternalAppointmentInput)
       const appointmentInstance = this.appointmentRepository.create({...createExternalAppointmentInput.createExternalAppointmentItemInput, isExternal: true})
       if(createExternalAppointmentInput.createExternalAppointmentItemInput.providerId){
        const provider = await this.doctorService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.providerId)
        appointmentInstance.provider = provider
        }
        //associate patient
        if(patientInstance && patientInstance.id){
          appointmentInstance.patient = patientInstance
        }
        //associate facility 
        if(createExternalAppointmentInput.createExternalAppointmentItemInput.facilityId){
          const facility = await this.facilityService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.facilityId)
          appointmentInstance.facility = facility
        }
        //associate service 
        if(createExternalAppointmentInput.createExternalAppointmentItemInput.serviceId){
          const service = await this.servicesService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.serviceId)
          appointmentInstance.appointmentType = service
        }
        //custom token creation
        const token = createToken();
        appointmentInstance.token = token;
        const appointment = await this.appointmentRepository.save(appointmentInstance);
        this.mailerService.sendAppointmentConfirmationsEmail(patientInstance.email, patientInstance.firstName+' '+patientInstance.lastName, appointmentInstance.scheduleStartDateTime, token, patientInstance.id)
        await queryRunner.commitTransaction();
        return appointment
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(error);
      } finally {
        await queryRunner.release();
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
   * Finds appointment by provider id
   * @param getDoctorSlots 
   * @param utc_start_date_minus_offset 
   * @param utc_end_date_minus_offset 
   * @returns appointment by provider id 
   */
  async findAppointmentByProviderId(getDoctorSlots: GetDoctorSlots,utc_start_date_minus_offset, utc_end_date_minus_offset): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: {
        scheduleStartDateTime: MoreThanOrEqual(utc_start_date_minus_offset),
        scheduleEndDateTime: LessThanOrEqual(utc_end_date_minus_offset),
        providerId: getDoctorSlots.id,

      }
    })
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

  async getDoctorAppointment(getDoctorAppointment: GetDoctorAppointment): Promise<Appointment[]> {
    const appointment = await this.appointmentRepository.find({
      where: {
        providerId: getDoctorAppointment.doctorId
      }
    })
    if (appointment) {
      return appointment
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

  /**
   * Cancels appointment
   * @param token 
   */
  async cancelAppointment(cancelAppointment: CancelAppointment) {
    try {
      const appointment = await this.appointmentRepository.findOne({ 
        where: {
          token: cancelAppointment.token
        }
      })
      if(appointment){
        return await this.appointmentRepository.save({id: appointment.id, status: APPOINTMENTSTATUS.CANCELLED, token: '', reason: cancelAppointment.reason})
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Appointment cancelled or not found',
      });
  
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
