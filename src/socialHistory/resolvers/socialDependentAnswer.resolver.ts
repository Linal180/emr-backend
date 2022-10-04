import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { DependentQuestions } from "../entities/dependentQuestions.entity";
import { SocialDependentAnswer } from "../entities/socialDependentAnswer.entity";
//services
import { DependentQuestionService } from "../services/dependentQuestions.service";

@Resolver(() => SocialDependentAnswer)
export class SocialAnswerResolver {
  constructor(
    private readonly dependentQuestionService: DependentQuestionService,
  ) { }

  //resolve fields

  @ResolveField(() => DependentQuestions)
  async dependentQuestion(@Parent() socialDependentAnswer: SocialDependentAnswer): Promise<DependentQuestions> {
    if (socialDependentAnswer?.dependentQuestionId) {
      return await this.dependentQuestionService.findOne(socialDependentAnswer?.dependentQuestionId);
    }
  }
}