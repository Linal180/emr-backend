import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import { CreateImagingTestCodeInput, FindAllImagingTestInput, GetImagingTestCodeInput, RemoveImagingTestCodeInput, UpdateImagingTestCodeInput } from "../dto/image-test.input";
//payloads
import { FindAllImagingTestPayload, ImagingTestPayload } from "../dto/image-test.payload";
//entities
import { ImagingTest } from "../entities/imagingTest.entity";
//services
import { ImagingTestService } from "../services/imagingTest.service";

@Resolver(() => ImagingTest)
export class ImagingTestResolver {
  
  constructor(
    private readonly imagingTestService: ImagingTestService,
  ) { }

  @Query(() => FindAllImagingTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllImagingTest')
  async findAllImagingTest(@Args('findAllImagingTestInput') findAllImagingTestInput: FindAllImagingTestInput): Promise<FindAllImagingTestPayload> {
    const { imagingTests, pagination } = await this.imagingTestService.findAll(findAllImagingTestInput);
    if (imagingTests) {
      return {
        imagingTests,
        pagination,
        response: {
          message: "OK", status: 200,
        }
      }
    }
  }

  @Query(() => ImagingTestPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'getImagingTestCode')
	async getImagingTestCode(@Args('getImagingTestCodeInput') getImagingTestCodeInput: GetImagingTestCodeInput): Promise<ImagingTestPayload> {
		const { id } = getImagingTestCodeInput
		const imagingTest = await this.imagingTestService.findOne(id)
		if (imagingTest) {
			return {
				imagingTest,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

  //mutations

  @Mutation(() => ImagingTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createImagingTestCode')
  async createImagingTestCode(@Args('createImagingTestCodeInput') createImagingTestCodeInput: CreateImagingTestCodeInput):  Promise<ImagingTestPayload> {
    return {
      imagingTest: await this.imagingTestService.create(createImagingTestCodeInput),
      response: { status: 200, message: 'ImagingTest code created successfully.' }
    };
  }

  @Mutation(() => ImagingTestPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateImagingTestCode')
	async updateImagingTestCode(@Args('updateImagingTestCodeInput') updateImagingTestCodeInput: UpdateImagingTestCodeInput): Promise<ImagingTestPayload> {
		return {
			imagingTest: await this.imagingTestService.update(updateImagingTestCodeInput),
			response: { status: 200, message: 'ImagingTest code is updated successfully' }
		};
	}


	@Mutation(() => ImagingTestPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeImagingTestCode')
	async removeImagingTestCode(@Args('removeImagingTestCodeInput') removeImagingTestCodeInput: RemoveImagingTestCodeInput): Promise<ImagingTestPayload> {
		const { id } = removeImagingTestCodeInput
		return {
			imagingTest: await this.imagingTestService.remove(id),
			response: { status: 200, message: 'ImagingTest code is removed successfully' }
		};
	}
}
