import { ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from "moment";
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { Service } from 'src/facilities/entities/services.entity';
import { ServicesService } from 'src/facilities/services/services.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Connection, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import { SlotsPayload } from '../dto/doctor-slots-payload.dto';
import ScheduleInput from '../dto/schedule-input.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
import { GetDoctorSchedule, GetFacilitySchedule, GetSlots, RemoveSchedule, UpdateScheduleInput } from '../dto/update-schedule.input';
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
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    private readonly servicesService: ServicesService,
    private readonly appointmentService: AppointmentService,
    private readonly utilsService: UtilsService
  ) { }

  /**
   * Creates schedule
   * @param createScheduleInput 
   * @returns schedule 
   */
  async createSchedule(createScheduleInput: CreateScheduleInput[]): Promise<Schedule> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      createScheduleInput.forEach(async (scheduleElement) => {
        // create schedule
        const scheduleInstance = this.scheduleRepository.create(scheduleElement)
        //fetch doctor
        if (scheduleElement.doctorId) {
          const doctor = await this.doctorService.findOne(scheduleElement.doctorId)
          scheduleInstance.doctor = doctor
          scheduleInstance.doctorId = doctor.id
        }
        //fetch facility
        if (scheduleElement.facilityId) {
          const facility = await this.facilityService.findOne(scheduleElement.facilityId)
          scheduleInstance.facility = facility
          scheduleInstance.facilityId = facility.id
        }
        const schedule = await this.scheduleRepository.save(scheduleInstance);
        if (scheduleElement.servicesIds) {
          const services = await this.servicesService.findByIds(scheduleElement.servicesIds)
          const serviceScheduleInstance = await this.createScheduleService(services, schedule.id)
          const serviceSchedule = await this.scheduleServicesRepository.create(serviceScheduleInstance)
          scheduleInstance.scheduleServices = serviceSchedule
          await this.scheduleServicesRepository.save(serviceSchedule)
        }
      });
      await queryRunner.commitTransaction();
      return
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
  async createScheduleService(services: Service[], scheduleId: string) {
    const scheduleService = services.map(item => {
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
        scheduleInstance.doctorId = doctor.id
      }
      //fetch facility
      if (updateScheduleInput.facilityId) {
        const facility = await this.facilityService.findOne(updateScheduleInput.facilityId)
        scheduleInstance.facility = facility
        scheduleInstance.facilityId = facility.id
      }
      scheduleInstance.startAt = updateScheduleInput.startAt;
      scheduleInstance.endAt = updateScheduleInput.endAt;
      const schedule = await this.scheduleRepository.save(scheduleInstance);
      if (updateScheduleInput.servicesIds) {
        await this.scheduleServicesRepository.delete({ scheduleId: scheduleInstance.id })
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
  * getDoctorSchedule schedule
  * @param getDoctorSchedule 
  * @returns schedule  
  */
  async getDoctorSchedule({ id }: GetDoctorSchedule): Promise<SchedulesPayload> {
    try {
      const schedules = await this.scheduleRepository.find({
        where: {
          doctorId: id
        }
      })
      return { schedules };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets facility schedule
   * @param { id } 
   * @returns facility schedule 
   */
  async getFacilitySchedule({ id }: GetFacilitySchedule): Promise<SchedulesPayload> {
    try {
      const schedules = await this.scheduleRepository.find({
        where: {
          facilityId: id
        }
      })
      return { schedules };
    } catch (error) {
      throw new InternalServerErrorException(error);
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
   * Gets doctors schedule
   * @param doctorId 
   * @param uTcStartDateOffset 
   * @param uTcEndDateOffset 
   * @returns doctors schedule 
   */
  async getTodaySchedule(getSlots: GetSlots): Promise<Schedule[]> {
    if (getSlots.providerId) {
      return await this.scheduleRepository.find({
        where: {
          doctorId: getSlots.providerId,
          day: getSlots.day
        },
        order: { createdAt: "ASC" }
      })
    }
    else if (getSlots.facilityId) {
      return await this.scheduleRepository.find({
        where: {
          facilityId: getSlots.facilityId,
          day: getSlots.day
        },
        order: { createdAt: "ASC" }
      })
    }
  }

  /**
   * Gets schedule services
   * @param schedules 
   * @param serviceId 
   * @returns  
   */
  async getScheduleServices(schedules: Schedule[], getSlots: GetSlots) {
    const result = []
    if (getSlots.providerId) {
      await Promise.all(
        schedules.map(async (item) => {
          const scheduleItem = await this.getScheduleService(item.id)
          const isServiceExist = await this.checkService(scheduleItem, getSlots.serviceId)
          if (isServiceExist) {
            item.scheduleServices = scheduleItem
            result.push(item)
          }
        })
      );
    } else if (getSlots.facilityId) {
      await Promise.all(
        schedules.map(async (item) => {
          const scheduleItem = await this.getScheduleService(item.id)
          item.scheduleServices = scheduleItem
          result.push(item)
        })
      );
    }
    return result;
  }

  /**
   * Gets slots
   * @param getSlots 
   * @returns slots 
   */
  async getSlots(getSlots: GetSlots): Promise<SlotsPayload> {
    try {
      const uTcStartDateOffset = moment(new Date(getSlots.currentDate)).startOf('day').utc().subtract(getSlots.offset, 'hours').toDate();
      const uTcEndDateOffset = moment(new Date(getSlots.currentDate)).endOf('day').utc().subtract(getSlots.offset, 'hours').toDate();
      //fetch doctor's booked appointment 
      const appointment = await this.appointmentService.findAppointmentByProviderId(getSlots, uTcStartDateOffset, uTcEndDateOffset)
      const schedules = await this.getTodaySchedule(getSlots)
      const newSchedule = await this.getScheduleServices(schedules, getSlots)
      const services = await this.servicesService.findOne(getSlots?.serviceId)
      const duration = parseInt(services?.duration)
      //get doctor's remaining time 
      const slots = await this.RemainingAvailability(newSchedule, appointment, duration)
      return slots;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Remaining availability
   * @param schedule 
   * @param appointment 
   */
  async RemainingAvailability(schedule: Schedule[], appointment: Appointment[], duration: number): Promise<SlotsPayload> {
    let times = [];
    times = await Promise.all(schedule.map(async (item) => {
      let slotTime = moment(item.startAt);
      let endTime = moment(item.endAt);
      while (slotTime < endTime) {
        const flag = await this.isInBreak(slotTime, appointment)
        if (!flag) {
          times.push({
            startTime: slotTime.format(),
            endTime: moment(slotTime.format()).add(duration, 'minutes').format()
          });
        }
        slotTime = slotTime.add(duration, 'minutes');
      }
      return times
    }))
    return times[0]
  }

  /**
   * Determines whether in break is
   * @param slotTime 
   * @param appointment 
   * @returns  
   */
  async isInBreak(slotTime, appointment) {
    return appointment.some(appointmentItem => {
      const flag = slotTime.unix() >= moment(appointmentItem.scheduleStartDateTime).unix() && slotTime.unix() < moment(appointmentItem.scheduleEndDateTime).unix();
      return flag
    });
  }

  /**
   * Checks service
   * @param scheduleItem 
   * @param serviceId 
   * @returns  
   */
  async checkService(scheduleItem: ScheduleServices[], serviceId: string) {
    for (let index = 0; index < scheduleItem.length; index++) {
      const element = scheduleItem[index];
      if (element.serviceId === serviceId) {
        return true;
      }
    }
    return false;
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
      const schedule = await this.findOne(id)
      if (!schedule) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Schedule not found',
        });
      }
      if (schedule.doctorId) {
        const appointmentExist = await this.appointmentService.findAppointmentByProviderId({ offset: 0, serviceId: '', facilityId: '', providerId: schedule.doctorId, currentDate: "" }, schedule.startAt, schedule.endAt)
        if (appointmentExist.length) {
          throw new ConflictException({
            status: HttpStatus.CONFLICT,
            error: 'Appointment already booked with this schedule, can not delete it.',
          });
        }
      }
      await this.scheduleRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
