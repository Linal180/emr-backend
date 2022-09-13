import { SetMetadata, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
//guards
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import PermissionGuard from "src/users/auth/role.guard";
//inputs
import { CreateFamilyHistoryInput, UpdateFamilyHistoryInput } from "../dto/family-history.input";
//payloads
import { FamilyHistoryPayload } from "../dto/family-history.payload";
//entities
import { FamilyHistory } from "../entities/familyHistory.entity";
//services
import { FamilyHistoryService } from "../services/familyHistory.service";


@Resolver(() => FamilyHistory)
export class FamilyHistoryResolver {
	constructor(
		private readonly familyHistoryService: FamilyHistoryService,
	) { }

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

}