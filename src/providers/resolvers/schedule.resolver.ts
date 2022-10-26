import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//inputs
import ScheduleInput from '../dto/schedule-input.dto';
import { CreateScheduleInput, UpdateBulkScheduleInput } from '../dto/create-schedule.input';
import {
  GetDoctorSchedule, GetFacilitySchedule, GetSchedule, GetSlots, RemoveSchedule, UpdateScheduleInput
} from '../dto/update-schedule.input';
//entities
import { Schedule } from '../entities/schedule.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { ScheduleServices } from '../entities/scheduleServices.entity';
//payloads
import { SchedulePayload } from '../dto/schedule-payload.dto';
import { SlotsPayload } from '../dto/doctor-slots-payload.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//services
import { ScheduleService } from '../services/schedule.service';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) { }

  //mutations

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createSchedule')
  async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput): Promise<SchedulePayload> {
    const { schedules } = createScheduleInput
    return {
      schedule: await this.scheduleService.createSchedule(schedules),
      response: { status: 200, message: 'Schedule created successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateBulkSchedule')
  async updateBulkSchedule(@Args('updateBulkScheduleInput') updateBulkScheduleInput: UpdateBulkScheduleInput): Promise<SchedulePayload> {
    return {
      schedule: await this.scheduleService.updateBulk(updateBulkScheduleInput),
      response: { status: 200, message: 'Schedule updated successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateSchedule')
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    return {
      schedule: await this.scheduleService.updateSchedule(updateScheduleInput),
      response: { status: 200, message: 'Schedule updated successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeSchedule')
  async removeSchedule(@Args('removeSchedule') removeSchedule: RemoveSchedule) {
    await this.scheduleService.removeSchedule(removeSchedule);
    return { response: { status: 200, message: 'Schedule Deleted' } };
  }

  //queries

  @Query(() => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllSchedules')
  async findAllSchedules(@Args('scheduleInput') scheduleInput: ScheduleInput): Promise<SchedulesPayload> {
    const schedules = await this.scheduleService.findAllSchedule(scheduleInput)
    if (schedules) {
      return {
        ...schedules,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Schedules not found',
    });
  }

  @Query(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getSchedule')
  async getSchedule(@Args('getSchedule') getSchedule: GetSchedule): Promise<SchedulePayload> {
    return {
      schedule: await this.scheduleService.findOne(getSchedule.id),
      response: { status: 200, message: 'Schedule fetched successfully' }
    };
  }

  @Query(() => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getDoctorSchedule')
  async getDoctorSchedule(@Args('getDoctorSchedule') getDoctorSchedule: GetDoctorSchedule) {
    const schedule = await this.scheduleService.getDoctorSchedule(getDoctorSchedule)
    return {
      ...schedule,
      response: { status: 200, message: 'Doctor Schedule fetched successfully' }
    };
  }

  @Query(() => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getFacilitySchedule')
  async getFacilitySchedule(@Args('getFacilitySchedule') getFacilitySchedule: GetFacilitySchedule) {
    const schedule = await this.scheduleService.getFacilitySchedule(getFacilitySchedule)
    return {
      ...schedule,
      response: { status: 200, message: 'Facility Schedule fetched successfully' }
    };
  }

  @Query(() => SlotsPayload)
  async getSlots(@Args('getSlots') getSlots: GetSlots) {
    const slots = await this.scheduleService.getSlots(getSlots)
    return {
      slots,
      response: { status: 200, message: 'Schedule slots fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Service])
  async scheduleServices(@Parent() schedule: Schedule): Promise<ScheduleServices[]> {
    if (schedule && schedule.id) {
      const scheduleService = await this.scheduleService.getScheduleService(schedule.id);
      return scheduleService;
    }
  }
}
