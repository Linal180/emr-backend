import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { scheduled } from 'rxjs';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Service } from 'src/facilities/entities/services.entity';
import { ServicesService } from 'src/facilities/services/services.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { Connection, Repository } from 'typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import ScheduleInput from '../dto/schedule-input.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
import { GetDoctorSchedule, RemoveSchedule, UpdateScheduleInput } from '../dto/update-schedule.input';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleServices } from '../entities/scheduleServices.entity';
import { ContactService } from './contact.service';
import { DoctorService } from './doctor.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(ScheduleServices)
    private scheduleServicesRepository: Repository<ScheduleServices>,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    private readonly connection: Connection,
    @Inject(forwardRef(() => FacilityService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    private readonly servicesService: ServicesService,
    private readonly appointmentService: AppointmentService
  ) { }

  /**
   * Creates schedule
   * @param createScheduleInput 
   * @returns schedule 
   */
  async createSchedule(createScheduleInput: CreateScheduleInput): Promise<Schedule> {
     //Transaction start
     const queryRunner = this.connection.createQueryRunner();
     await queryRunner.connect();
     await queryRunner.startTransaction();
    try {
      // create schedule
      const scheduleInstance = this.scheduleRepository.create(createScheduleInput)
      //fetch user
      if (createScheduleInput.doctorId) {
        const doctor = await this.doctorService.findOne(createScheduleInput.doctorId)
        scheduleInstance.doctor = doctor
      }
      //fetch location/contact of facility
      if (createScheduleInput.locationId) {
        const location = await this.contactService.findOne(createScheduleInput.locationId)
        scheduleInstance.location = location
      }
      const schedule =  await this.scheduleRepository.save(scheduleInstance);
      if(createScheduleInput.servicesIds){
        const services = await this.servicesService.findByIds(createScheduleInput.servicesIds)
        const serviceScheduleInstance = await this.createScheduleService(services, schedule.id)
        const serviceSchedule = await this.scheduleServicesRepository.create(serviceScheduleInstance)
        scheduleInstance.scheduleServices = serviceSchedule
        await queryRunner.manager.save(serviceSchedule);
      }
      await queryRunner.commitTransaction();
      return schedule
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Creates schedule service
   * @param services 
   * @param scheduleId 
   * @returns  
   */
  async createScheduleService(services: Service[], scheduleId: string){
    const scheduleService =  services.map(item => {
     return {
      scheduleId: scheduleId,
      serviceId: item.id
     }
    })
    return scheduleService
  }

  /**
   * Updates schedule
   * @param updateScheduleInput 
   * @returns schedule 
   */
  async updateSchedule(updateScheduleInput: UpdateScheduleInput): Promise<Schedule> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // fetch schedule
      const scheduleInstance = await this.scheduleRepository.findOne(updateScheduleInput.id)
      //fetch user
      if (updateScheduleInput.doctorId) {
        const doctor = await this.doctorService.findOne(updateScheduleInput.doctorId)
        scheduleInstance.doctor = doctor
      }
      //fetch location/contact of facility
      if (updateScheduleInput.locationId) {
        const location = await this.contactService.findOne(updateScheduleInput.locationId)
        scheduleInstance.location = location
      }
      scheduleInstance.startAt = updateScheduleInput.startAt;
      scheduleInstance.endAt = updateScheduleInput.endAt;
      const schedule =  await this.scheduleRepository.save(scheduleInstance);
      if(updateScheduleInput.servicesIds){
        await this.scheduleServicesRepository.delete({ scheduleId: scheduleInstance.id})
        const services = await this.servicesService.findByIds(updateScheduleInput.servicesIds)
        const serviceScheduleInstance = await this.createScheduleService(services, schedule.id)
        const serviceSchedule = await this.scheduleServicesRepository.create(serviceScheduleInstance)
        scheduleInstance.scheduleServices = serviceSchedule
        await queryRunner.manager.save(serviceSchedule);
      }
      await queryRunner.commitTransaction();
      return schedule
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Gets schedule service
   * @param id 
   * @returns schedule service 
   */
  async getScheduleService(id: string): Promise<ScheduleServices[]> {
      return await this.scheduleServicesRepository.find({
        where: {
          scheduleId: id
        },
        relations: ["service"]
      })
  }

   /**
   * getDoctorSchedule schedule
   * @param getDoctorSchedule 
   * @returns schedule 
   */
  async getDoctorSchedule({ id }: GetDoctorSchedule): Promise<SchedulesPayload> {
    //fetch doctor's booked appointment
    const appointment = await this.appointmentService.findAppointmentByProviderId(id)
    console.log("appointment",appointment);
    try {
      const schedules = await this.scheduleRepository.find({
        where: {
          doctor: id
        }
      })
      if(schedules){
        schedules.map(item => {
          if(appointment){
            appointment.map(appointmentItem => {
              console.log("typeof", appointmentItem.scheduleStartDateTime);
              console.log("typeof", item.startAt);
            })
          }
        })
      }
      console.log("schedules",schedules);
      return { schedules };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all schedule
   * @param scheduleInput 
   * @returns all schedule 
   */
  async findAllSchedule(scheduleInput: ScheduleInput): Promise<SchedulesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Schedule>(this.scheduleRepository, scheduleInput)
      return {
        pagination: {
          ...paginationResponse
        },
        schedules: paginationResponse.data,
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
  async findOne(id: string): Promise<Schedule> {
    return await this.scheduleRepository.findOne(id);
  }

  /**
   * Removes schedule
   * @param { id } 
   */
  async removeSchedule({ id }: RemoveSchedule) {
    try {
      await this.scheduleRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
