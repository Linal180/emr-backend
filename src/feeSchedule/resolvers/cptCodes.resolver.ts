import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//payload, inputs
import { AllCPTCodePayload, CPTCodePayload } from "../dto/cptCode-payload.dto";
import {
  CreateCPTCodeInput, FindAllCPTCodesInput, GetCPTCodeInput, RemoveCPTCodeInput, UpdateCPTCodeInput
} from "../dto/cptCode.input";
//entity
import { CPTCodes } from "../entities/cptCode.entity";
import { CptFeeSchedule } from "../entities/cptFeeSchedule.entity";
//service
import { CptCodeService } from "../services/cptCode.service";
import { CptFeeScheduleService } from "../services/cptFeeSchedule.service";

@Resolver(() => CPTCodes)
export class CptCodeResolver {
  constructor(
    private readonly cptCodeService: CptCodeService,
    private readonly cptFeeScheduleService: CptFeeScheduleService,
  ) { }

  //Queries

  @Query(() => AllCPTCodePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCptCodes')
  async findAllCptCodes(@Args('findAllCptCodesInput') findAllCptCodesInput: FindAllCPTCodesInput): Promise<AllCPTCodePayload> {
    const CptCodes = await this.cptCodeService.findAllFeeSchedule(findAllCptCodesInput);
    if (CptCodes) {
      return {
        ...CptCodes,
        response: {
          message: "OK", status: 200,
        }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'CPT Codes not found',
    });
  }

  @Query(() => CPTCodePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getCPTCode')
  async getCPTCode(@Args('getCPTCodeInput') getCPTCodeInput: GetCPTCodeInput): Promise<CPTCodePayload> {
    return {
      cptCode: await this.cptCodeService.findOne(getCPTCodeInput),
      response: { status: 200, message: 'CPT Code fetched successfully' }
    };
  }

  //mutations

  @Mutation(() => CPTCodePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createCPTCode')
  async createCPTCode(@Args('createCPTCodeInput') createCPTCodeInput: CreateCPTCodeInput): Promise<CPTCodePayload> {
    return {
      cptCode: await this.cptCodeService.create(createCPTCodeInput),
      response: { status: 200, message: 'CPT Code is created successfully' }
    };
  }

  @Mutation(() => CPTCodePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateFeeSchedule')
  async updateCPTCode(@Args('updateCPTCodeInput') updateCPTCodeInput: UpdateCPTCodeInput): Promise<CPTCodePayload> {
    return {
      cptCode: await this.cptCodeService.update(updateCPTCodeInput),
      response: { status: 200, message: 'CPT Code fetched successfully' }
    };
  }

  @Mutation(() => CPTCodePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeFeeSchedule')
  async removeCPTCode(@Args('removeCPTCodeInput') removeCPTCodeInput: RemoveCPTCodeInput): Promise<CPTCodePayload> {
    return {
      cptCode: await this.cptCodeService.remove(removeCPTCodeInput),
      response: { status: 200, message: 'CPT Code deleted successfully' }
    };
  }

  // resolve fields

  @ResolveField(() => [CptFeeSchedule])
  async cptFeeSchedule(@Parent() cptCodes: CPTCodes): Promise<CptFeeSchedule[]> {
    if (cptCodes?.id) {
      const response = await this.cptFeeScheduleService.findByCptCode(cptCodes?.id);
      return response
    }
  }

}