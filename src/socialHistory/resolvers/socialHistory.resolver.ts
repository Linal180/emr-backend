
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { SocialAnswer } from "../entities/socialAnswer.entity";
import { SocialHistory } from "../entities/socialHistory.entity";
// services
import { SocialAnswerService } from "../services/socialAnswer.service";
import { SocialHistoryService } from "../services/socialHistory.service";
//payloads
import { PatientSocialHistoryPayload } from "../payloads/socialHistory.payload";
//inputs
import { CreatePatientSocialHistoryInput, PatientSocialHistoryInput } from "../inputs/socialHistory.inputs";

@Resolver(() => SocialHistory)
export class SocialHistoryResolver {
	constructor(
		private readonly socialAnswerService: SocialAnswerService,
		private readonly socialHistoryService: SocialHistoryService,
		) { }

	//queries

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


	//mutations

	@Mutation(() => PatientSocialHistoryPayload)
	// @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
	// @SetMetadata('name', 'createPatientSocialHistory')
	async createPatientSocialHistory(@Args('createPatientSocialHistoryInput') createPatientSocialHistoryInput: CreatePatientSocialHistoryInput): Promise<PatientSocialHistoryPayload> {
		return {
			socialHistory: await this.socialHistoryService.createOrUpdate(createPatientSocialHistoryInput),
			response: { status: 200, message: `Social history ${createPatientSocialHistoryInput?.id ? "updated" : "created"} successfully` }
		};
	}

	//resolve fields

	@ResolveField(() => [SocialAnswer])
  async socialAnswer(@Parent() socialHistory: SocialHistory): Promise<SocialAnswer[]> {
    if (socialHistory?.id) {
      return await this.socialAnswerService.findBySocialId(socialHistory?.id);
    }
  }
}