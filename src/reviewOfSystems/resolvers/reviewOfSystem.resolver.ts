
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

@Resolver(() => ReviewOfSystem)
export class ReviewOfSystemResolver {
  constructor(
    private readonly reviewOfSystemService: ReviewOfSystemService,
    private readonly answerResponsesService: AnswerResponsesService,
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
}