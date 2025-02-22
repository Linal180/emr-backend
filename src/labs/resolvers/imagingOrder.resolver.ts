import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//inputs
import {
	CreateImagingOrderInput, FindAllImagingOrderInput, GetImagingOrderInput, RemoveImagingOrderInput,
	UpdateImagingOrderInput
} from "../dto/image-order.input";
//payloads
import { FindAllImagingOrderPayload, ImagingOrderPayload } from "../dto/image-order.payload";
//entities
import { ImagingOrder } from "../entities/imagingOrder.entity";
import { ImagingOrderTest } from "../entities/imagingOrderTest.entity";
//services
import { ImagingOrderService } from "../services/imagingOrder.service";
import { ImagingOrderTestService } from "../services/imagingOrderTest.service";

@Resolver(() => ImagingOrder)
export class ImagingOrderResolver {

	constructor(
		private readonly imagingOrderService: ImagingOrderService,
		private readonly imagingOrderTestService: ImagingOrderTestService,
	) { }

	// queries

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
	// @SetMetadata('name', 'getImagingOrder')
	async getImagingOrder(@Args('getImagingOrderInput') getImagingOrderInput: GetImagingOrderInput): Promise<ImagingOrderPayload> {
		const { id } = getImagingOrderInput
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
	// @SetMetadata('name', 'createImagingOrder')
	async createImagingOrder(@Args('createImagingOrderInput') createImagingOrderInput: CreateImagingOrderInput): Promise<ImagingOrderPayload> {
		return {
			imagingOrder: await this.imagingOrderService.create(createImagingOrderInput),
			response: { status: 200, message: 'Imaging Order created successfully.' }
		};
	}

	@Mutation(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'updateImagingOrder')
	async updateImagingOrder(@Args('updateImagingOrderInput') updateImagingOrderInput: UpdateImagingOrderInput): Promise<ImagingOrderPayload> {
		return {
			imagingOrder: await this.imagingOrderService.update(updateImagingOrderInput),
			response: { status: 200, message: 'Imaging Order is updated successfully' }
		};
	}


	@Mutation(() => ImagingOrderPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'removeImagingOrder')
	async removeImagingOrder(@Args('removeImagingOrderInput') removeImagingOrderInput: RemoveImagingOrderInput): Promise<ImagingOrderPayload> {
		const { id } = removeImagingOrderInput
		return {
			imagingOrder: await this.imagingOrderService.remove(id),
			response: { status: 200, message: 'Imaging Order is removed successfully' }
		};
	}

	//resolve fields

	@ResolveField(() => [ImagingOrderTest])
	async imagingOrderTest(@Parent() imagingOrder: ImagingOrder): Promise<ImagingOrderTest[]> {
		if (imagingOrder?.id) {
			return await this.imagingOrderTestService.findByOrderId(imagingOrder.id);
		}
	}
}
