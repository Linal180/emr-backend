import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { SocialAnswer } from "../entities/socialAnswer.entity";
import { SocialDependentAnswer } from "../entities/socialDependentAnswer.entity";
import { SocialDependentAnswerService } from "../services/socialDependentAnswer.service";


@Resolver(() => SocialAnswer)
export class SocialAnswerResolver {
  constructor(
    private readonly socialDependentAnswerService: SocialDependentAnswerService,
  ) { }

  //resolve fields

  @ResolveField(() => [SocialDependentAnswer])
  async socialDependentAnswer(@Parent() socialAnswer: SocialAnswer): Promise<SocialDependentAnswer[]> {
    if (socialAnswer?.id) {
      return await this.socialDependentAnswerService.findBySocialAnswerId(socialAnswer?.id);
    }
  }
}