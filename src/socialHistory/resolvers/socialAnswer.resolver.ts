import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Questions } from "../entities/questions.entity";
//entities
import { SocialAnswer } from "../entities/socialAnswer.entity";
import { SocialDependentAnswer } from "../entities/socialDependentAnswer.entity";
//services
import { QuestionService } from "../services/questions.service";
import { SocialDependentAnswerService } from "../services/socialDependentAnswer.service";


@Resolver(() => SocialAnswer)
export class SocialAnswerResolver {
  constructor(
    private readonly socialDependentAnswerService: SocialDependentAnswerService,
    private readonly questionService: QuestionService,
  ) { }

  //resolve fields

  @ResolveField(() => [SocialDependentAnswer])
  async socialDependentAnswer(@Parent() socialAnswer: SocialAnswer): Promise<SocialDependentAnswer[]> {
    if (socialAnswer?.id) {
      return await this.socialDependentAnswerService.findBySocialAnswerId(socialAnswer?.id);
    }
  }

  @ResolveField(() => Questions)
  async question(@Parent() socialAnswer: SocialAnswer): Promise<Questions> {
    if (socialAnswer?.questionId) {
      return await this.questionService.findOne(socialAnswer?.questionId);
    }
  }
}