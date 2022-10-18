import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { CreateCvxCodeInput, FindAllCvxInput, GetCvxCodeInput, RemoveCvxCodeInput, UpdateCvxCodeInput } from "../dto/cvx.input";
//payloads
import { CvxPayload, FindAllCvxPayload } from "../dto/cvx.payload";
//entities
import { CVX } from "../entities/cvx.entity";
import { CPTCodes } from "src/feeSchedule/entities/cptCode.entity";
//services
import { CVXService } from "../services/cvx.service";
import { CptCodeService } from "src/feeSchedule/services/cptCode.service";

@Resolver(() => CVX)
export class CVXResolver {

  constructor(
    private readonly cvxService: CVXService,
    private readonly cptCodeService: CptCodeService,
  ) { }

  //queries

  @Query(() => FindAllCvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCvx')
  async findAllCvx(@Args('findAllCvxInput') findAllCvxInput: FindAllCvxInput): Promise<FindAllCvxPayload> {
    const { cvxs, pagination } = await this.cvxService.findAll(findAllCvxInput);
    if (cvxs) {
      return {
        cvxs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  @Query(() => CvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getNdcCode')
  async getCvxCode(@Args('getCvxCodeInput') getCvxCodeInput: GetCvxCodeInput): Promise<CvxPayload> {
    const { id } = getCvxCodeInput
    const cvx = await this.cvxService.findOne(id)
    if (cvx) {
      return {
        cvx,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  //mutations

  @Mutation(() => CvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createNdcCode')
  async createCvxCode(@Args('createCvxCodeInput') createCvxCodeInput: CreateCvxCodeInput): Promise<CvxPayload> {
    return {
      cvx: await this.cvxService.create(createCvxCodeInput),
      response: { status: 200, message: 'CVX code created successfully.' }
    };
  }

  @Mutation(() => CvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateCvxCode')
  async updateCvxCode(@Args('updateNdcCodeInput') updateCvxCodeInput: UpdateCvxCodeInput): Promise<CvxPayload> {
    return {
      cvx: await this.cvxService.update(updateCvxCodeInput),
      response: { status: 200, message: 'CVX code is updated successfully' }
    };
  }


  @Mutation(() => CvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removeIcdCode')
  async removeCvxCode(@Args('removeCvxCodeInput') removeCvxCodeInput: RemoveCvxCodeInput): Promise<CvxPayload> {
    const { id } = removeCvxCodeInput
    return {
      cvx: await this.cvxService.remove(id),
      response: { status: 200, message: 'CVX code is removed successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => CPTCodes)
  async cptCode(@Parent() cvx: CVX): Promise<CPTCodes> {
    if (cvx?.cptCodeId) {
      return await this.cptCodeService.findOne({ id: cvx?.cptCodeId });
    }
  }

}
