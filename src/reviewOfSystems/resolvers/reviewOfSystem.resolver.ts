
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { AnswerResponses } from "../entities/answerResponses.entity";
import { ReviewOfSystem } from "../entities/reviewOfSystem.entity";
// services
import { AnswerResponsesService } from "../services/answerResponses.service";
import { ReviewOfSystemService } from "../services/reviewOfSystem.service";
//payloads
import { ReviewOfSystemPayload } from "../dto/reviewOfSystem-payload";
//inputs
import { CreateReviewOfSystemInput, ReviewOfSystemInput } from "../dto/reviewOfSystem-input.dto";
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { ChartingTemplateService } from "../services/chartingTemplate.service";
import { UpdateNotes } from "../dto/patientIllnessHistory-input.dto";

@Resolver(() => ReviewOfSystem)
export class ReviewOfSystemResolver {
  constructor(
    private readonly reviewOfSystemService: ReviewOfSystemService,
    private readonly answerResponsesService: AnswerResponsesService,
    private readonly chartingTemplateService: ChartingTemplateService,
  ) { }

  @Query(() => ReviewOfSystemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async reviewOfSystem(@Args('reviewOfSystemInput') reviewOfSystemInput: ReviewOfSystemInput): Promise<ReviewOfSystemPayload> {
    const { appointmentId } = reviewOfSystemInput;
    return {
      reviewOfSystem: await this.reviewOfSystemService.findOneByAppointmentId(appointmentId),
      response: { status: 200, message: 'Illness history fetched successfully' }
    };
  }

  @Query(() => ReviewOfSystemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async latestReviewOfSystem(@Args('reviewOfSystemInput') reviewOfSystemInput: ReviewOfSystemInput): Promise<ReviewOfSystemPayload> {
    return {
      reviewOfSystem: await this.reviewOfSystemService.findPatientLatestRos(reviewOfSystemInput),
      response: { status: 200, message: 'Illness history fetched successfully' }
    };
  }

  //mutations
  @Mutation(() => ReviewOfSystemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createPatientIllnessHistory')
  async updateROSNotes(@Args('updateNotes') updateNotes: UpdateNotes): Promise<ReviewOfSystemPayload> {
    return {
      reviewOfSystem: await this.reviewOfSystemService.updateNotes(updateNotes),
      response: { status: 200, message: `Review Of System ${updateNotes?.id ? "updated" : "created"} successfully` }
    };
  }


  //mutations
  @Mutation(() => ReviewOfSystemPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createReviewOfSystem')
  async createReviewOfSystem(@Args('createReviewOfSystemInput') createReviewOfSystemInput: CreateReviewOfSystemInput): Promise<ReviewOfSystemPayload> {
    return {
      reviewOfSystem: await this.reviewOfSystemService.createOrUpdate(createReviewOfSystemInput),
      response: { status: 200, message: `review of system ${createReviewOfSystemInput?.id ? "updated" : "created"} successfully` }
    };
  }

  //resolve fields

  @ResolveField(() => [AnswerResponses])
  async answers(@Parent() reviewOfSystem: ReviewOfSystem): Promise<AnswerResponses[]> {
    if (reviewOfSystem?.id) {
      const answers = this.answerResponsesService.findByReviewOfSystemId(reviewOfSystem?.id);
      return answers
    }
  }

  @ResolveField(() => [QuestionTemplate])
  async templates(@Parent() reviewOfSystem: ReviewOfSystem): Promise<QuestionTemplate[]> {
    const { templateIds } = reviewOfSystem || {}
    if (templateIds) {
      const templates = Promise.all(await templateIds.map(async (templateId) => {
        const { template } = await this.chartingTemplateService.findOne(templateId);
        return template
      }))
      return templates
    }
  }
}