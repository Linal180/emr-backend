
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
// entities
// services
import { AnswerResponsesService } from "../services/answerResponses.service";
//payloads
//inputs
import { AnswerResponses } from "../entities/answerResponses.entity";
import { QuestionAnswers } from "../entities/questionAnswers.entity";
import { QuestionAnswersService } from "../services/questionAnswers.service";

@Resolver(() => AnswerResponses)
export class AnswerResponsesResolver {
  constructor(
    private readonly questionAnswersService: QuestionAnswersService,
  ) { }

  //resolve fields

  @ResolveField(() => QuestionAnswers)
  async answer(@Parent() answerResponses: AnswerResponses): Promise<QuestionAnswers> {
    if (answerResponses?.answerId) {
      const answers = this.questionAnswersService.findOne(answerResponses?.id);
      return answers
    }
  }
}