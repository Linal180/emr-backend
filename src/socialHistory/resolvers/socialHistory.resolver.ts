
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
// entities
import { SocialHistory } from "../entities/socialHistory.entity";
// services
import { SocialHistoryService } from "../services/socialHistory.service";
//payloads
import { PatientSocialHistoryPayload } from "../payloads/socialHistory.payload";
import { CreatePatientSocialHistoryInput, PatientSocialHistoryInput } from "../inputs/socialHistory.inputs";

@Resolver(() => SocialHistory)
export class SocialHistoryResolver {
	constructor(private readonly socialHistoryService: SocialHistoryService) { }

	@Query(() => PatientSocialHistoryPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'patientSocialHistory')
	async patientSocialHistory(@Args('patientSocialHistoryInput') patientSocialHistoryInput: PatientSocialHistoryInput): Promise<PatientSocialHistoryPayload> {
		const { patientId } = patientSocialHistoryInput;
		return {
			socialHistory: await this.socialHistoryService.findOneByPatientId(patientId),
			response: { status: 200, message: 'Social history fetched successfully' }
		};
	}


	@Mutation(() => PatientSocialHistoryPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'createPatientSocialHistory')
	async createPatientSocialHistory(@Args('createPatientSocialHistoryInput') createPatientSocialHistoryInput: CreatePatientSocialHistoryInput): Promise<PatientSocialHistoryPayload> {
		return {
			socialHistory: await this.socialHistoryService.createOrUpdate(createPatientSocialHistoryInput),
			response: { status: 200, message: `Social history ${createPatientSocialHistoryInput?.id ? "updated" : "created"} successfully` }
		};
	}
}