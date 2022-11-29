
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { TemplateSections } from "../entities/templateSections.entity";
// services
import { ChartingTemplateService } from "../services/chartingTemplate.service";
import { TemplateSectionsService } from "../services/templateSections.service";
//payloads
import { FindAllQuestionTemplatesPayload, QuestionTemplatePayload } from "../dto/questionTemplate-payload.dto";
//inputs
import { FindAllTemplatesInput } from "../dto/questionTemplate-input.dto";
import { Exercises } from "../entities/physicalTherapyExercise.entity";
import { PhysicalExerciseServive } from "../services/physicalExercise.service";
import { Attachment, AttachmentType } from "src/attachments/entities/attachment.entity";
import { AttachmentsService } from "src/attachments/services/attachments.service";

@Resolver(() => QuestionTemplate)
export class ChartingTemplateResolver {
  constructor(
    private readonly chartingTemplateService: ChartingTemplateService,
    private readonly templateSectionsService: TemplateSectionsService,
    private readonly physicalExerciseServive: PhysicalExerciseServive,
    private readonly attachmentsService: AttachmentsService,
  ) { }

  //queries

  @Query(() => FindAllQuestionTemplatesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientChartingTemplate')
  async patientChartingTemplates(@Args('findAllTemplatesInput') findAllTemplatesInput: FindAllTemplatesInput): Promise<FindAllQuestionTemplatesPayload> {
    const templates = await this.chartingTemplateService.fetchAll(findAllTemplatesInput)
    return {
      ...templates,
      response: { status: 200, message: 'Social history fetched successfully' }
    };
  }

  @Query(() => QuestionTemplatePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientChartingTemplate')
  async getPatientChartingTemplate(@Args('templateId') templateId: string): Promise<QuestionTemplatePayload> {
    const template = await this.chartingTemplateService.findOne(templateId)
    return {
      ...template,
      response: { status: 200, message: 'Social history fetched successfully' }
    };
  }


  //mutations

  //resolve fields

  @ResolveField(() => [TemplateSections])
  async sections(@Parent() questionTemplate: QuestionTemplate): Promise<TemplateSections[]> {
    if (questionTemplate?.id) {
      const templateSectionsPayload = await this.templateSectionsService.findSectionsByTemplateId(questionTemplate?.id);
      return (await templateSectionsPayload).sections
    }
  }

  @ResolveField(() => [Exercises])
  async exercise(@Parent() questionTemplate: QuestionTemplate): Promise<Exercises[]> {
    if (questionTemplate?.id) {
      return await this.physicalExerciseServive.findByTemplateId(questionTemplate?.id);
    }
  }

  @ResolveField(() => [Attachment])
  async attachments(@Parent() questionTemplate: QuestionTemplate): Promise<Attachment[]> {
    if (questionTemplate?.id) {
      return await this.attachmentsService.findAttachments(questionTemplate.id, AttachmentType.CHARTING_TEMPLATE);
    }
  }
}