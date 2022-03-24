import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Service } from 'src/facilities/entities/services.entity';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import { DoctorSlotsPayload } from '../dto/doctor-slots-payload.dto';
import ScheduleInput from '../dto/schedule-input.dto';
import { SchedulePayload } from '../dto/schedule-payload.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
import { GetDoctorSchedule, GetDoctorSlots, GetSchedule, RemoveSchedule, UpdateScheduleInput } from '../dto/update-schedule.input';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleServices } from '../entities/scheduleServices.entity';
import { ScheduleService } from '../services/schedule.service';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createSchedule')
  async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    return {
      schedule: await this.scheduleService.createSchedule(createScheduleInput),
      response: { status: 200, message: 'Schedule created successfully' }
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

  @Query(returns => SchedulesPayload)
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

  @Query(returns => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getSchedule')
  async getSchedule(@Args('getSchedule') getSchedule: GetSchedule): Promise<SchedulePayload> {
    return {
      schedule: await this.scheduleService.findOne(getSchedule.id),
      response: { status: 200, message: 'Schedule fetched successfully' }
    };
  }

  @ResolveField((returns) => [Service])
  async scheduleServices(@Parent() schedule: Schedule): Promise<ScheduleServices[]> {
    if (schedule) {
      const scheduleService = await this.scheduleService.getScheduleService(schedule.id);
      return scheduleService;
    }
  }

  @Query(returns => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getDoctorSchedule')
  async getDoctorSchedule(@Args('getDoctorSchedule') getDoctorSchedule: GetDoctorSchedule) {
    const schedule = await this.scheduleService.getDoctorSchedule(getDoctorSchedule)
    return {
      ...schedule,
      response: { status: 200, message: 'Doctor Schedule fetched successfully' }
    };
  }

  @Query(returns => DoctorSlotsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getDoctorSlots')
  async getDoctorSlots(@Args('getDoctorSlots') getDoctorSlots: GetDoctorSlots) {
    const slots = await this.scheduleService.getDoctorSlots(getDoctorSlots)
    return {
      slots,
      response: { status: 200, message: 'Doctor Schedule slots fetched successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeSchedule')
  async removeSchedule(@Args('removeSchedule') removeSchedule: RemoveSchedule) {
    await this.scheduleService.removeSchedule(removeSchedule);
    return { response: { status: 200, message: 'Schedule Deleted' } };
  }

}
