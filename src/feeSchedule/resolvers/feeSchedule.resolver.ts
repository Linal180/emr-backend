import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { FeeSchedule } from "../entities/feeSchedule.entity";
import { Practice } from "src/practice/entities/practice.entity";
//services
import { PracticeService } from "src/practice/practice.service";
import { FeeScheduleService } from "../services/feeSchedule.service";
//inputs
import {
  CreateFeeScheduleInput, FindAllFeeScheduleInput, GetFeeScheduleInput, RemoveFeeScheduleInput, UpdateFeeScheduleInput
} from "../dto/feeSchedule.input";
//payloads
import { AllFeeSchedulesPayload, FeeSchedulePayload } from "../dto/feeSchedule-payload.dto";

@Resolver(() => FeeSchedule)
export class FeeScheduleResolver {
  constructor(private readonly feeScheduleService: FeeScheduleService,
    private readonly practiceService: PracticeService,
  ) { }

  //Queries 

  @Query(() => AllFeeSchedulesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllFacility')
  async findAllFeeSchedules(@Args('findAllFeeScheduleInput') findAllFeeScheduleInput: FindAllFeeScheduleInput): Promise<AllFeeSchedulesPayload> {
    const feeSchedules = await this.feeScheduleService.findAllFeeSchedule(findAllFeeScheduleInput);
    if (feeSchedules) {
      return {
        ...feeSchedules,
        response: {
          message: "OK", status: 200,
        }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'FeeSchedules not found',
    });
  }

  @Query(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async getFeeSchedule(@Args('getFeeScheduleInput') getFeeScheduleInput: GetFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.findOne(getFeeScheduleInput),
      response: { status: 200, message: 'FeeSchedule fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createFeeSchedule')
  async createFeeSchedule(@Args('createFeeScheduleInput') createFeeScheduleInput: CreateFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.create(createFeeScheduleInput),
      response: { status: 200, message: 'FeeSchedule created successfully' }
    };
  }

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async removeFeeSchedule(@Args('removeFeeScheduleInput') removeFeeScheduleInput: RemoveFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.remove(removeFeeScheduleInput),
      response: { status: 200, message: 'FeeSchedule deleted successfully' }
    };
  }

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async updateFeeSchedule(@Args('updateFeeScheduleInput') updateFeeScheduleInput: UpdateFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.updateFeeSchedule(updateFeeScheduleInput),
      response: { status: 200, message: 'FeeSchedule fetched successfully' }
    };
  }

  @ResolveField(() => Practice)
  async practice(@Parent() feeSchedule: FeeSchedule): Promise<Practice> {
    if (feeSchedule?.practiceId) {
      const response = await this.practiceService.getPractice(feeSchedule?.practiceId);
      const { practice } = response || {}
      return practice
    }
  }


}
