
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { TemplateSections } from "../entities/templateSections.entity";
// services
import { TemplateSectionsService } from "../services/templateSections.service";
//payloads
//inputs
import { SectionQuestions } from "../entities/sectionQuestions.entity";
import { SectionQuestionsService } from "../services/sectionQuestions.service";

@Resolver(() => TemplateSections)
export class TemplateSectionsResolver {
  constructor(
    private readonly templateSectionsService: TemplateSectionsService,
    private readonly sectionQuestionsService: SectionQuestionsService,
  ) { }

  //queries

  // @Query(() => FindAllQuestionTemplatesPayload)
  // // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // // @SetMetadata('name', 'patientTemplateSections')
  // async patientTemplateSections(@Args('findAllTemplatesInput') findAllTemplatesInput: FindAllTemplatesInput): Promise<FindAllQuestionTemplatesPayload> {
  //   const templates = await this.chartingTemplateService.fetchAll(findAllTemplatesInput)
  //   return {
  //     ...templates,
  //     response: { status: 200, message: 'Social history fetched successfully' }
  //   };
  // }

  // @Query(() => QuestionTemplatePayload)
  // // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // // @SetMetadata('name', 'patientTemplateSections')
  // async getPatientTemplateSections(@Args('templateId') templateId: string): Promise<QuestionTemplatePayload> {
  //   const template = await this.chartingTemplateService.findOne(templateId)
  //   return {
  //     ...template,
  //     response: { status: 200, message: 'Social history fetched successfully' }
  //   };
  // }


  //mutations

  //resolve fields

  @ResolveField(() => [SectionQuestions])
  async questions(@Parent() templateSection: TemplateSections): Promise<SectionQuestions[]> {
    if (templateSection?.id) {
      const templateSectionsPayload = this.sectionQuestionsService.findQuestionsBySectionId(templateSection?.id);
      return (await templateSectionsPayload).questions
    }
  }
}