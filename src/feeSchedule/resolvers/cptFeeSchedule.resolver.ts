import { HttpStatus, NotFoundException, } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
//payloads, inputs
import { AllCPTFeeSchedulesPayload, CPTFeeSchedulePayload } from "../dto/cptFeeSchedule-payload.dto";
import {
  CreateCptFeeScheduleInput, FindAllCptFeeScheduleInput, GetCptFeeScheduleInput, RemoveCptFeeScheduleInput,
  UpdateCptFeeScheduleInput
} from "../dto/cptFeeSchedule.input";
//entities
import { CPTCodes } from "../entities/cptCode.entity";
import { FeeSchedule } from "../entities/feeSchedule.entity";
import { CptFeeSchedule } from "../entities/cptFeeSchedule.entity";
//services
import { CptCodeService } from "../services/cptCode.service";
import { FeeScheduleService } from "../services/feeSchedule.service";
import { CptFeeScheduleService } from "../services/cptFeeSchedule.service";

@Resolver(() => CptFeeSchedule)
export class CptFeeScheduleResolver {
  constructor(
    private readonly cptCodeService: CptCodeService,
    private readonly feeScheduleService: FeeScheduleService,
    private readonly cptFeeScheduleService: CptFeeScheduleService,
  ) { }

  //Queries 

  @Query(() => AllCPTFeeSchedulesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllFacility')
  async findAllCptFeeSchedule(@Args('findAllCptFeeScheduleInput') findAllCptFeeScheduleInput: FindAllCptFeeScheduleInput): Promise<AllCPTFeeSchedulesPayload> {
    const feeSchedules = await this.cptFeeScheduleService.findAllCptFeeSchedule(findAllCptFeeScheduleInput);
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
      error: 'CPT Fee Schedules not found',
    });
  }

  @Query(() => CPTFeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async getCptFeeSchedule(@Args('getCptFeeScheduleInput') getCptFeeScheduleInput: GetCptFeeScheduleInput): Promise<CPTFeeSchedulePayload> {
    return {
      cptFeeSchedule: await this.cptFeeScheduleService.findOne(getCptFeeScheduleInput),
      response: { status: 200, message: ' CPT Fee Schedule fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => CPTFeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createFeeSchedule')
  async createCptFeeSchedule(@Args('createCptFeeScheduleInput') createCptFeeScheduleInput: CreateCptFeeScheduleInput): Promise<CPTFeeSchedulePayload> {
    return {
      cptFeeSchedule: await this.cptFeeScheduleService.create(createCptFeeScheduleInput),
      response: { status: 200, message: 'CPT Fee Schedule created successfully' }
    };
  }

  @Mutation(() => CPTFeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async removeCptFeeSchedule(@Args('removeCptFeeScheduleInput') removeCptFeeScheduleInput: RemoveCptFeeScheduleInput): Promise<CPTFeeSchedulePayload> {
    return {
      cptFeeSchedule: await this.cptFeeScheduleService.remove(removeCptFeeScheduleInput),
      response: { status: 200, message: 'CPT Fee Schedule deleted successfully' }
    };
  }

  @Mutation(() => CPTFeeSchedulePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async updateCptFeeSchedule(@Args('updateCptFeeScheduleInput') updateCptFeeScheduleInput: UpdateCptFeeScheduleInput): Promise<CPTFeeSchedulePayload> {
    return {
      cptFeeSchedule: await this.cptFeeScheduleService.updateCptFeeSchedule(updateCptFeeScheduleInput),
      response: { status: 200, message: 'CPT Fee Schedule is updated successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => FeeSchedule)
  async feeSchedule(@Parent() cptFeeSchedule: CptFeeSchedule): Promise<FeeSchedule> {
    if (cptFeeSchedule?.feeScheduleId) {
      const response = await this.feeScheduleService.findOne({ id: cptFeeSchedule?.feeScheduleId });
      return response
    }
  }

  @ResolveField(() => CPTCodes)
  async cptCodes(@Parent() cptFeeSchedule: CptFeeSchedule): Promise<CPTCodes> {
    console.log("cptFeeScheduleajbsasakjshak", cptFeeSchedule)
    if (cptFeeSchedule?.cptCodesId) {
      const response = await this.cptCodeService.findOne({ id: cptFeeSchedule?.cptCodesId });
      return response
    }
  }

}