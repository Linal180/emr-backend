import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
//inputs
import {
	CreateImagingTestInput, FindAllImagingTestInput, GetImagingTestInput, RemoveImagingTestInput,
	UpdateImagingTestInput
} from "../dto/image-test.input";
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
	// @SetMetadata('name', 'getImagingTest')
	async getImagingTest(@Args('getImagingTestInput') getImagingTestInput: GetImagingTestInput): Promise<ImagingTestPayload> {
		const { id } = getImagingTestInput
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
	// @SetMetadata('name', 'createImagingTest')
	async createImagingTest(@Args('createImagingTestInput') createImagingTestInput: CreateImagingTestInput): Promise<ImagingTestPayload> {
		return {
			imagingTest: await this.imagingTestService.create(createImagingTestInput),
			response: { status: 200, message: 'Imaging Test created successfully.' }
		};
	}

	@Mutation(() => ImagingTestPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateImagingTest')
	async updateImagingTest(@Args('updateImagingTestInput') updateImagingTestInput: UpdateImagingTestInput): Promise<ImagingTestPayload> {
		return {
			imagingTest: await this.imagingTestService.update(updateImagingTestInput),
			response: { status: 200, message: 'Imaging Test is updated successfully' }
		};
	}


	@Mutation(() => ImagingTestPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeImagingTest')
	async removeImagingTest(@Args('removeImagingTestInput') removeImagingTestInput: RemoveImagingTestInput): Promise<ImagingTestPayload> {
		const { id } = removeImagingTestInput
		return {
			imagingTest: await this.imagingTestService.remove(id),
			response: { status: 200, message: 'Imaging Test is removed successfully' }
		};
	}
}
