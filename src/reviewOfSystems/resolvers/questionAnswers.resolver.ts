
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { QuestionAnswers } from "../entities/questionAnswers.entity";
import { SectionQuestions } from "../entities/sectionQuestions.entity";
// services
import { QuestionAnswersService } from "../services/questionAnswers.service";
import { SectionQuestionsService } from "../services/sectionQuestions.service";
//payloads
//inputs

@Resolver(() => QuestionAnswers)
export class QuestionAnswersResolver {
  constructor(
    private readonly questionAnswersService: QuestionAnswersService,
    private readonly sectionQuestionsService: SectionQuestionsService,
  ) { }

  //resolve fields

  @ResolveField(() => SectionQuestions)
  async questions(@Parent() questionAnswers: QuestionAnswers): Promise<SectionQuestions> {
    if (questionAnswers?.questionsId) {
      const question = await this.sectionQuestionsService.findOne(questionAnswers?.questionsId);
      return question
    }
  }
}