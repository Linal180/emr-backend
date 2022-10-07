
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestionAnswers } from "../entities/questionAnswers.entity";
// entities
import { SectionQuestions } from "../entities/sectionQuestions.entity";
import { QuestionAnswersService } from "../services/questionAnswers.service";
// services
import { SectionQuestionsService } from "../services/sectionQuestions.service";
//payloads
//inputs

@Resolver(() => SectionQuestions)
export class SectionQuestionsResolver {
  constructor(
    private readonly sectionQuestionsService: SectionQuestionsService,
    private readonly questionAnswersService: QuestionAnswersService,
  ) { }

  //queries

  // @Query(() => FindAllQuestionTemplatesPayload)
  // // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // // @SetMetadata('name', 'patientSectionQuestions')
  // async patientSectionQuestions(@Args('findAllTemplatesInput') findAllTemplatesInput: FindAllTemplatesInput): Promise<FindAllQuestionTemplatesPayload> {
  //   const templates = await this.chartingTemplateService.fetchAll(findAllTemplatesInput)
  //   return {
  //     ...templates,
  //     response: { status: 200, message: 'Social history fetched successfully' }
  //   };
  // }

  // @Query(() => QuestionTemplatePayload)
  // // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // // @SetMetadata('name', 'patientSectionQuestions')
  // async getPatientSectionQuestions(@Args('templateId') templateId: string): Promise<QuestionTemplatePayload> {
  //   const template = await this.chartingTemplateService.findOne(templateId)
  //   return {
  //     ...template,
  //     response: { status: 200, message: 'Social history fetched successfully' }
  //   };
  // }


  //mutations

  //resolve fields

  @ResolveField(() => [QuestionAnswers])
  async answers(@Parent() sectionQuestion: SectionQuestions): Promise<QuestionAnswers[]> {
    if (sectionQuestion?.id) {
      const sectionQuestionsPayload = this.questionAnswersService.findAnswersByQuestionId(sectionQuestion?.id);
      return (await sectionQuestionsPayload).answers
    }
  }
}