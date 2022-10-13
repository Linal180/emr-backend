import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import { CreateMvxCodeInput, FindAllMvxInput, GetMvxCodeInput, RemoveMvxCodeInput, UpdateMvxCodeInput } from "../dto/mvx.input";
//payloads
import { FindAllMvxPayload, MvxPayload } from "../dto/mvx.payload";
//entities
import { MVX } from "../entities/mvx.entity";
//services
import { MVXService } from "../services/mvx.service";

@Resolver(() => MVX)
export class MVXResolver {
  
  constructor(
    private readonly mvxService: MVXService,
  ) { }

  @Query(() => FindAllMvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllCvx')
  async findAllMvx(@Args('findAllMvxInput') findAllMvxInput: FindAllMvxInput): Promise<FindAllMvxPayload> {
    const { mvxs, pagination } = await this.mvxService.findAll(findAllMvxInput);
    if (mvxs) {
      return {
        mvxs,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  @Query(() => MvxPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'getMvxCode')
	async getMvxCode(@Args('getMvxCodeInput') getMvxCodeInput: GetMvxCodeInput): Promise<MvxPayload> {
		const { id } = getMvxCodeInput
		const mvxCode = await this.mvxService.findOne(id)
		if (mvxCode) {
			return {
				mvxCode,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

  //mutations

  @Mutation(() => MvxPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createMvxCode')
  async createMvxCode(@Args('createMvxCodeInput') createMvxCodeInput: CreateMvxCodeInput):  Promise<MvxPayload> {
    return {
      mvxCode: await this.mvxService.create(createMvxCodeInput),
      response: { status: 200, message: 'MVX code created successfully.' }
    };
  }

  @Mutation(() => MvxPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateMvxCode')
	async updateMvxCode(@Args('updateMvxCodeInput') updateMvxCodeInput: UpdateMvxCodeInput): Promise<MvxPayload> {
		return {
			mvxCode: await this.mvxService.update(updateMvxCodeInput),
			response: { status: 200, message: 'MVX code is updated successfully' }
		};
	}


	@Mutation(() => MvxPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeIcdCode')
	async removeMvxCode(@Args('removeMvxCodeInput') removeMvxCodeInput: RemoveMvxCodeInput): Promise<MvxPayload> {
		const { id } = removeMvxCodeInput
		return {
			mvxCode: await this.mvxService.remove(id),
			response: { status: 200, message: 'MVX code is removed successfully' }
		};
	}
}
