import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { Repository } from 'typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import ScheduleInput from '../dto/schedule-input.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
import { GetDoctorSchedule, RemoveSchedule, UpdateScheduleInput } from '../dto/update-schedule.input';
import { Schedule } from '../entities/schedule.entity';
import { DoctorService } from './doctor.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Creates schedule
   * @param createScheduleInput 
   * @returns schedule 
   */
  async createSchedule(createScheduleInput: CreateScheduleInput): Promise<Schedule> {
    try {
      // create schedule
      const scheduleInstance = this.scheduleRepository.create(createScheduleInput)
      //fetch user
      if (createScheduleInput.doctorId) {
        const doctor = await this.doctorService.findOne(createScheduleInput.doctorId)
        scheduleInstance.doctor = doctor
      }
      return await this.scheduleRepository.save(scheduleInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates schedule
   * @param updateScheduleInput 
   * @returns schedule 
   */
  async updateSchedule(updateScheduleInput: UpdateScheduleInput): Promise<Schedule> {
    try {
      return await this.scheduleRepository.save(updateScheduleInput)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async getDoctorSchedule({ id }: GetDoctorSchedule): Promise<SchedulesPayload> {
    try {
      //get doctor 
       const doctor = await this.doctorService.findOne(id)
       let timeZone = ""
       if(doctor && doctor.timeZone){
        timeZone = doctor.timeZone
       }else {
         const facility = await this.facilityService.findOne(doctor.facilityId) 
         timeZone = facility.timeZone
       }
      const schedules = await this.scheduleRepository.find({
        where: {
          doctor: id
        }
      });
      //converting utc to given timeZone
      const convertedSchedules = await this.convertTimeZone(schedules, timeZone)
      console.log("convertedSchedules",convertedSchedules);
      const groupBySchedule = await this.groupByDay(convertedSchedules)
      console.log("groupBySchedule",groupBySchedule);
      return convertedSchedules;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async convertTimeZone(schedules,timeZone){
    const convertedSchedules = schedules.map(item =>{
    return {
      startAt: new Date(new Date(item.startAt).toLocaleString('en-US', { timeZone })),
      endAt: new Date(new Date(item.endAt).toLocaleString('en-US', { timeZone })),
      id: item.id,
      createdAt: item.createdAt,
      updateAt: item.updatedAt,
      recurringEndDate: item.recurringEndDate
    }
  })
  return convertedSchedules
  }

  async groupByDay(schedules){
    var weekDays =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupBy = schedules.map(item =>{
    const dayName = weekDays[new Date(item.endAt).getDay()]
      return {
        
      }
    })
    return groupBy
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
