
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { TemplateSections } from "../entities/templateSections.entity";
// services
import { PhysicalExamService } from "../services/physicalExam.service";
import { TemplateSectionsService } from "../services/templateSections.service";
//payloads
import { PhysicalExamPayload } from "../dto/physicalExam-payload";
//inputs
import { CreatePhysicalExamInput, PhysicalExamInput } from "../dto/physicalExam-input.dto";
import { AnswerResponses } from "../entities/answerResponses.entity";
import { AnswerResponsesService } from "../services/answerResponses.service";
import { ChartingTemplateService } from "../services/chartingTemplate.service";
import { PhysicalExam } from "../entities/physicalExam.entity";

@Resolver(() => PhysicalExam)
export class PhysicalExamResolver {
  constructor(
    private readonly physicalExamService: PhysicalExamService,
    private readonly answerResponsesService: AnswerResponsesService,
    private readonly chartingTemplateService: ChartingTemplateService,
  ) { }

  @Query(() => PhysicalExamPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async physicalExam(@Args('physicalExamInput') physicalExamInput: PhysicalExamInput): Promise<PhysicalExamPayload> {
    const { appointmentId } = physicalExamInput;
    return {
      physicalExam: await this.physicalExamService.findOneByAppointmentId(appointmentId),
      response: { status: 200, message: 'Physical Exam fetched successfully' }
    };
  }

  @Query(() => PhysicalExamPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async latestPhysicalExam(@Args('physicalExamInput') physicalExamInput: PhysicalExamInput): Promise<PhysicalExamPayload> {
    return {
      physicalExam: await this.physicalExamService.findPatientLatestPhysicalExam(physicalExamInput),
      response: { status: 200, message: 'Physical Exam fetched successfully' }
    };
  }


  //mutations
  @Mutation(() => PhysicalExamPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createPhysicalExam')
  async createPhysicalExam(@Args('createPhysicalExamInput') createPhysicalExamInput: CreatePhysicalExamInput): Promise<PhysicalExamPayload> {
    return {
      physicalExam: await this.physicalExamService.createOrUpdate(createPhysicalExamInput),
      response: { status: 200, message: `Physical Exam ${createPhysicalExamInput?.id ? "updated" : "created"} successfully` }
    };
  }

  //resolve fields

  @ResolveField(() => [AnswerResponses])
  async answers(@Parent() physicalExam: PhysicalExam): Promise<AnswerResponses[]> {
    if (physicalExam?.id) {
      const answers = this.answerResponsesService.findByPhysicalExamId(physicalExam?.id);
      return answers
    }
  }

  @ResolveField(() => [QuestionTemplate])
  async templates(@Parent() physicalExam: PhysicalExam): Promise<QuestionTemplate[]> {
    const { templateIds } = physicalExam || {}
    if (templateIds) {
      const templates = Promise.all(await templateIds.map(async (templateId) => {
        const { template } = await this.chartingTemplateService.findOne(templateId);
        return template
      }))
      return templates
    }
  }
}