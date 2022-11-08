import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import { FindAllIcdCodesInput, GetIcdCodeInput, CreateIcdCodeInput, RemoveIcdCodeInput, UpdateIcdCodeInput, AllIcdCodesInput } from "../dto/icdCodes.input";
//payloads
import { FindAllIcdCodesPayload, IcdCodePayload } from "../dto/icdCodes.payload";
//entities
import { ICDCodes } from "../entities/icdcodes.entity";
//services
import { ICDCodeService } from "../services/icdCode.service";


@Resolver(() => ICDCodes)
export class IcdCodeResolver {
  
  constructor(
    private readonly icdCodeService: ICDCodeService,
  ) { }

  //queries

  @Query(() => FindAllIcdCodesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllIcdCodes')
  async findAllIcdCodes(@Args('findAllIcdCodesInput') findAllIcdCodesInput: FindAllIcdCodesInput): Promise<FindAllIcdCodesPayload> {
    const { icdCodes, pagination } = await this.icdCodeService.findAll(findAllIcdCodesInput);
    if (icdCodes) {
      return {
        icdCodes,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

	@Query(() => FindAllIcdCodesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllIcdCodes')
  async findChiefComplaintProblems(@Args('allIcdCodesInput') allIcdCodesInput: AllIcdCodesInput): Promise<FindAllIcdCodesPayload> {
    const { icdCodes, pagination } = await this.icdCodeService.findChiefComplaintProblems(allIcdCodesInput);
    if (icdCodes) {
      return {
        icdCodes,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }


  @Query(() => IcdCodePayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'getIcdCode')
	async getIcdCode(@Args('getIcdCodeInput') getIcdCodeInput: GetIcdCodeInput): Promise<IcdCodePayload> {
		const { id } = getIcdCodeInput
		const icdCode = await this.icdCodeService.findOne(id)
		if (icdCode) {
			return {
				icdCode,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

  //mutations

	@Mutation(() => IcdCodePayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'createIcdCode')
	async createIcdCode(@Args('createIcdCodeInput') createIcdCodeInput: CreateIcdCodeInput): Promise<IcdCodePayload> {
		return {
			icdCode: await this.icdCodeService.create(createIcdCodeInput),
			response: { status: 200, message: 'ICD code is created successfully' }
		};
	}


	@Mutation(() => IcdCodePayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateIcdCode')
	async updateIcdCode(@Args('updateIcdCodeInput') updateIcdCodeInput: UpdateIcdCodeInput): Promise<IcdCodePayload> {
		return {
			icdCode: await this.icdCodeService.update(updateIcdCodeInput),
			response: { status: 200, message: 'ICD code is updated successfully' }
		};
	}


	@Mutation(() => IcdCodePayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeIcdCode')
	async removeIcdCode(@Args('removeIcdCodeInput') removeIcdCodeInput: RemoveIcdCodeInput): Promise<IcdCodePayload> {
		const { id } = removeIcdCodeInput
		return {
			icdCode: await this.icdCodeService.remove(id),
			response: { status: 200, message: 'ICD code is removed successfully' }
		};
	}

}