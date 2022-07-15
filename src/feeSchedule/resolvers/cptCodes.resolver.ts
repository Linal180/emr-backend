import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { AllCPTCodePayload } from "../dto/cptCode-payload.dto";
import { FindAllCPTCodesInput } from "../dto/cptCode.input";
import { CPTCodes } from "../entities/cptCode.entity";
import { CptCodeService } from "../services/cptCode.service";

@Resolver(() => CPTCodes)
export class CptCodeResolver {
  constructor(private readonly cptCodeService: CptCodeService) { }

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
      error: 'FeeSchedules not found',
    });
  }
}