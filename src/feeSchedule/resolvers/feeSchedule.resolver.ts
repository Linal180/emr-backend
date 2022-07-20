import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { CPTCodes } from "../entities/cptCode.entity";
import { FeeSchedule } from "../entities/feeSchedule.entity";
import { Practice } from "src/practice/entities/practice.entity";
//services
import { CptCodeService } from "../services/cptCode.service";
import { PracticeService } from "src/practice/practice.service";
import { FeeScheduleService } from "../services/feeSchedule.service";
//inputs
import {
  CreateFeeScheduleInput, FindAllFeeScheduleInput, FindFeeScheduleCPTCodesInput, GetFeeScheduleInput, RemoveFeeScheduleInput, UpdateFeeScheduleInput
} from "../dto/feeSchedule.input";
//payloads
import { AllFeeSchedulesPayload, FeeSchedulePayload } from "../dto/feeSchedule-payload.dto";

@Resolver(() => FeeSchedule)
export class FeeScheduleResolver {
  constructor(
    private readonly cptCodeService: CptCodeService,
    private readonly practiceService: PracticeService,
    private readonly feeScheduleService: FeeScheduleService,
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
      error: 'Fee Schedules not found',
    });
  }

  @Query(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async getFeeSchedule(@Args('getFeeScheduleInput') getFeeScheduleInput: GetFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.findOne(getFeeScheduleInput),
      response: { status: 200, message: 'Fee Schedule fetched successfully' }
    };
  }

  @Query(() => AllFeeSchedulesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllFacility')
  async findFeeScheduleCPTCodes(@Args('findFeeScheduleCPTCodesInput') findFeeScheduleCPTCodesInput: FindFeeScheduleCPTCodesInput): Promise<AllFeeSchedulesPayload> {
    const feeSchedules = await this.feeScheduleService.findFeeScheduleCPTCodes(findFeeScheduleCPTCodesInput);
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
      error: 'Fee Schedules not found',
    });
  }

  //mutations

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createFeeSchedule')
  async createFeeSchedule(@Args('createFeeScheduleInput') createFeeScheduleInput: CreateFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.create(createFeeScheduleInput),
      response: { status: 200, message: 'Fee Schedule created successfully' }
    };
  }

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async removeFeeSchedule(@Args('removeFeeScheduleInput') removeFeeScheduleInput: RemoveFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.remove(removeFeeScheduleInput),
      response: { status: 200, message: 'Fee Schedule deleted successfully' }
    };
  }

  @Mutation(() => FeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async updateFeeSchedule(@Args('updateFeeScheduleInput') updateFeeScheduleInput: UpdateFeeScheduleInput): Promise<FeeSchedulePayload> {
    return {
      feeSchedule: await this.feeScheduleService.updateFeeSchedule(updateFeeScheduleInput),
      response: { status: 200, message: 'Fee Schedule is updated successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => Practice)
  async practice(@Parent() feeSchedule: FeeSchedule): Promise<Practice> {
    if (feeSchedule?.practiceId) {
      const response = await this.practiceService.getPractice(feeSchedule?.practiceId);
      const { practice } = response || {}
      return practice
    }
  }

  @ResolveField(() => CPTCodes)
  async CPTCodes(@Parent() feeSchedule: FeeSchedule): Promise<CPTCodes> {
    if (feeSchedule?.cptCode) {
      const response = await this.cptCodeService.findByCode(feeSchedule?.cptCode);
      return response
    }
  }


}
