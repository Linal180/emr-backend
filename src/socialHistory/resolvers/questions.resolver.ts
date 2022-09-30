
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
//entities
import { Questions } from "../entities/questions.entity";
import { DependentQuestions } from "../entities/dependentQuestions.entity";
//services
import { QuestionService } from "../services/questions.service";
import { DependentQuestionService } from "../services/dependentQuestions.service";

@Resolver(() => Questions)
export class QuestionsResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly dependentQuestionService: DependentQuestionService,
  ) { }


  //resolve fields

  @ResolveField(() => [DependentQuestions])
  async dependentQuestions(@Parent() questions: Questions): Promise<DependentQuestions[]> {
    if (questions?.id) {
      return await this.dependentQuestionService.findByQsId(questions?.id);
    }
  }
}