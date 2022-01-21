import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import ScheduleInput from '../dto/schedule-input.dto';
import { SchedulePayload } from '../dto/schedule-payload.dto';
import { SchedulesPayload } from '../dto/schedules-payload.dto';
import { GetDoctorSchedule, GetSchedule, RemoveSchedule, UpdateScheduleInput } from '../dto/update-schedule.input';
import { ScheduleService } from '../services/schedule.service';

@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    return {
      schedule: await this.scheduleService.createSchedule(createScheduleInput),
      response: { status: 200, message: 'Schedule created successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    return {
      schedule: await this.scheduleService.updateSchedule(updateScheduleInput),
      response: { status: 200, message: 'Schedule updated successfully' }
    };
  }

  @Query(returns => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
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
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin', 'admin'])
  async getSchedule(@Args('getSchedule') getSchedule: GetSchedule): Promise<SchedulePayload> {
    return {
      schedule: await this.scheduleService.findOne(getSchedule.id),
      response: { status: 200, message: 'Schedule fetched successfully' }
    };
  }

  @Query(returns => SchedulesPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin', 'admin'])
  async getDoctorSchedules(@Args('getDoctorSchedule') getDoctorSchedule: GetDoctorSchedule){
    const schedules = await this.scheduleService.getDoctorSchedule(getDoctorSchedule)
    return {
      schedules,
      response: { status: 200, message: 'Doctor Schedule fetched successfully' }
    };
  }

  @Mutation(() => SchedulePayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async removeSchedule(@Args('removeSchedule') removeSchedule: RemoveSchedule) {
    await this.scheduleService.removeSchedule(removeSchedule);
    return { response: { status: 200, message: 'Schedule Deleted' } };
  }

}
