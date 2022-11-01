import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import { CreateImagingOrderCodeInput, FindAllImagingOrderInput, GetImagingOrderCodeInput, RemoveImagingOrderCodeInput, UpdateImagingOrderCodeInput } from "../dto/image-order.input";
//payloads
import { FindAllImagingOrderPayload, ImagingOrderPayload } from "../dto/image-order.payload";
//entities
import { ImagingTest } from "../entities/imagingTest.entity";
import { ImagingOrder } from "../entities/imagingOrder.entity";
//services
import { ImagingTestService } from "../services/imagingTest.service";
import { ImagingOrderService } from "../services/imagingOrder.service";

@Resolver(() => ImagingOrder)
export class ImagingOrderResolver {

	constructor(
		private readonly imagingOrderService: ImagingOrderService,
		private readonly imagingTestService: ImagingTestService,
	) { }

	@Query(() => FindAllImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'findAllImagingOrder')
	async findAllImagingOrder(@Args('findAllImagingOrderInput') findAllImagingOrderInput: FindAllImagingOrderInput): Promise<FindAllImagingOrderPayload> {
		const { imagingOrders, pagination } = await this.imagingOrderService.findAll(findAllImagingOrderInput);
		if (imagingOrders) {
			return {
				imagingOrders,
				pagination,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

	@Query(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'getImagingOrderCode')
	async getImagingOrderCode(@Args('getImagingOrderCodeInput') getImagingOrderCodeInput: GetImagingOrderCodeInput): Promise<ImagingOrderPayload> {
		const { id } = getImagingOrderCodeInput
		const imagingOrder = await this.imagingOrderService.findOne(id)
		if (imagingOrder) {
			return {
				imagingOrder,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

	//mutations

	@Mutation(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'createImagingOrderCode')
	async createImagingOrderCode(@Args('createImagingOrderCodeInput') createImagingOrderCodeInput: CreateImagingOrderCodeInput): Promise<ImagingOrderPayload> {
		return {
			imagingOrder: await this.imagingOrderService.create(createImagingOrderCodeInput),
			response: { status: 200, message: 'ImagingOrder code created successfully.' }
		};
	}

	@Mutation(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateImagingOrderCode')
	async updateImagingOrderCode(@Args('updateImagingOrderCodeInput') updateImagingOrderCodeInput: UpdateImagingOrderCodeInput): Promise<ImagingOrderPayload> {
		return {
			imagingOrder: await this.imagingOrderService.update(updateImagingOrderCodeInput),
			response: { status: 200, message: 'ImagingOrder code is updated successfully' }
		};
	}


	@Mutation(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeImagingOrderCode')
	async removeImagingOrderCode(@Args('removeImagingOrderCodeInput') removeImagingOrderCodeInput: RemoveImagingOrderCodeInput): Promise<ImagingOrderPayload> {
		const { id } = removeImagingOrderCodeInput
		return {
			imagingOrder: await this.imagingOrderService.remove(id),
			response: { status: 200, message: 'ImagingOrder code is removed successfully' }
		};
	}

	//resolve fields

	@ResolveField(() => [ImagingTest])
	async testObservations(@Parent() imagingOrder: ImagingOrder): Promise<ImagingTest[]> {
		if (imagingOrder?.id) {
			return await this.imagingTestService.findByOrderId(imagingOrder.id);
		}
	}
}
