import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import { CreateNdcCodeInput, FindAllNdcInput, GetNdcCodeInput, RemoveNdcCodeInput, UpdateNdcCodeInput } from "../dto/ndc.input";
//payloads
import { FindAllNdcPayload, NdcPayload } from "../dto/ndc.payload";
//entities
import { NDC } from "../entities/ndc.entity";
//services
import { NDCService } from "../services/ndc.service";


@Resolver(() => NDC)
export class NDCResolver {
  
  constructor(
    private readonly ndcService: NDCService,
  ) { }

    //queries

  @Query(() => FindAllNdcPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllNdc')
  async findAllNdc(@Args('findAllNdcInput') findAllNdcInput: FindAllNdcInput): Promise<FindAllNdcPayload> {
    const { ndcs, pagination } = await this.ndcService.findAll(findAllNdcInput);
    if (ndcs) {
      return {
        ndcs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  @Query(() => NdcPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'getNdcCode')
	async getNdcCode(@Args('getNdcCodeInput') getNdcCodeInput: GetNdcCodeInput): Promise<NdcPayload> {
		const { id } = getNdcCodeInput
		const ndcCode = await this.ndcService.findOne(id)
		if (ndcCode) {
			return {
				ndcCode,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

  //mutations

  @Mutation(() => NdcPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createNdcCode')
  async createNdcCode(@Args('createNdcCodeInput') createNdcCodeInput: CreateNdcCodeInput):  Promise<NdcPayload> {
    return {
      ndcCode: await this.ndcService.create(createNdcCodeInput),
      response: { status: 200, message: 'NDC code created successfully.' }
    };
  }

  @Mutation(() => NdcPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateNdcCode')
	async updateNdcCode(@Args('updateNdcCodeInput') updateNdcCodeInput: UpdateNdcCodeInput): Promise<NdcPayload> {
		return {
			ndcCode: await this.ndcService.update(updateNdcCodeInput),
			response: { status: 200, message: 'NDC code is updated successfully' }
		};
	}


	@Mutation(() => NdcPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeIcdCode')
	async removeNdcCode(@Args('removeNdcCodeInput') removeNdcCodeInput: RemoveNdcCodeInput): Promise<NdcPayload> {
		const { id } = removeNdcCodeInput
		return {
			ndcCode: await this.ndcService.remove(id),
			response: { status: 200, message: 'NDC code is removed successfully' }
		};
	}
}
