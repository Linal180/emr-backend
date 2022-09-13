import { SetMetadata, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
//guards
import PermissionGuard from "src/users/auth/role.guard";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
//inputs
import { CreateFamilyHistoryInput, FindAllFamilyHistoryInput, UpdateFamilyHistoryInput } from "../dto/family-history.input";
//payloads
import { FamilyHistoriesPayload, FamilyHistoryPayload } from "../dto/family-history.payload";
//entities
import { FamilyHistory } from "../entities/familyHistory.entity";
import { FamilyHistoryRelative } from "../entities/familyHistoryRelative.entity";
//services
import { FamilyHistoryService } from "../services/familyHistory.service";
import { FamilyHistoryRelativeService } from "../services/familyHistoryRelative.service";


@Resolver(() => FamilyHistory)
export class FamilyHistoryResolver {
	constructor(
		private readonly familyHistoryService: FamilyHistoryService,
		private readonly familyHistoryRelativeService: FamilyHistoryRelativeService,
	) { }

	//queries

	@Query(() => FamilyHistoriesPayload)
	@UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	@SetMetadata('name', 'findAllFamilyHistory')
	async findAllFamilyHistory(@Args('findAllFamilyHistoryInput') findAllFamilyHistoryInput: FindAllFamilyHistoryInput): Promise<FamilyHistoriesPayload> {
		const { familyHistories, pagination } = await this.familyHistoryService.findAll(findAllFamilyHistoryInput)
		if (familyHistories) {
			return {
				familyHistories,
				pagination,
				response: {
					message: "OK", status: 200,
				}
			}
		}
	}

	//mutations

	@Mutation(() => FamilyHistoryPayload)
	@UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	@SetMetadata('name', 'createFamilyHistory')
	async createFamilyHistory(@Args('createFamilyHistoryInput') createFamilyHistoryInput: CreateFamilyHistoryInput): Promise<FamilyHistoryPayload> {
		return {
			familyHistory: await this.familyHistoryService.create(createFamilyHistoryInput),
			response: { status: 200, message: 'Patient Family History is created successfully' }
		};
	}


	@Mutation(() => FamilyHistoryPayload)
	@UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	@SetMetadata('name', 'updateFamilyHistory')
	async updateFamilyHistory(@Args('updateFamilyHistoryInput') updateFamilyHistoryInput: UpdateFamilyHistoryInput): Promise<FamilyHistoryPayload> {
		return {
			familyHistory: await this.familyHistoryService.update(updateFamilyHistoryInput),
			response: { status: 200, message: 'Patient Family History is updated successfully' }
		};
	}


	//resolve fields

	@ResolveField(() => [FamilyHistoryRelative])
	async familyHistoryRelatives(@Parent() familyHistory: FamilyHistory): Promise<FamilyHistoryRelative[]> {
		if (familyHistory?.id) {
			return await this.familyHistoryRelativeService.findByFamilyId(familyHistory?.id);
		}
	}



}