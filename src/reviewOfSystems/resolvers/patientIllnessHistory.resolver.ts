
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { TemplateSections } from "../entities/templateSections.entity";
// services
import { TemplateSectionsService } from "../services/templateSections.service";
import { PatientIllnessHistoryService } from "../services/patientIllnessHistory.service";
//payloads
import { PatientIllnessHistoryPayload } from "../dto/patientIllnessHistory-payload";
//inputs
import { CreatePatientIllnessHistoryInput, PatientIllnessHistoryInput } from "../dto/patientIllnessHistory-input.dto";
import { PatientIllnessHistory } from "../entities/patientIllnessHistory.entity";
import { AnswerResponses } from "../entities/answerResponses.entity";
import { AnswerResponsesService } from "../services/answerResponses.service";
import { ChartingTemplateService } from "../services/chartingTemplate.service";

@Resolver(() => PatientIllnessHistory)
export class PatientIllnessHistoryResolver {
  constructor(
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    private readonly answerResponsesService: AnswerResponsesService,
    private readonly chartingTemplateService: ChartingTemplateService,
  ) { }

  @Query(() => PatientIllnessHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async patientIllnessHistory(@Args('patientIllnessHistoryInput') patientIllnessHistoryInput: PatientIllnessHistoryInput): Promise<PatientIllnessHistoryPayload> {
    const { appointmentId } = patientIllnessHistoryInput;
    return {
      patientIllnessHistory: await this.patientIllnessHistoryService.findOneByAppointmentId(appointmentId),
      response: { status: 200, message: 'Illness history fetched successfully' }
    };
  }

  @Query(() => PatientIllnessHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async latestPatientIllnessHistory(@Args('patientIllnessHistoryInput') patientIllnessHistoryInput: PatientIllnessHistoryInput): Promise<PatientIllnessHistoryPayload> {
    return {
      patientIllnessHistory: await this.patientIllnessHistoryService.findPatientLatestIllnessHistory(patientIllnessHistoryInput),
      response: { status: 200, message: 'Illness history fetched successfully' }
    };
  }


  //mutations
  @Mutation(() => PatientIllnessHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createPatientIllnessHistory')
  async createPatientIllnessHistory(@Args('createPatientIllnessHistoryInput') createPatientIllnessHistoryInput: CreatePatientIllnessHistoryInput): Promise<PatientIllnessHistoryPayload> {
    return {
      patientIllnessHistory: await this.patientIllnessHistoryService.createOrUpdate(createPatientIllnessHistoryInput),
      response: { status: 200, message: `Illness history ${createPatientIllnessHistoryInput?.id ? "updated" : "created"} successfully` }
    };
  }

  //resolve fields

  @ResolveField(() => [AnswerResponses])
  async answers(@Parent() patientIllnessHistory: PatientIllnessHistory): Promise<AnswerResponses[]> {
    if (patientIllnessHistory?.id) {
      const answers = this.answerResponsesService.findByPatientIllnessHistoryId(patientIllnessHistory?.id);
      return answers
    }
  }

  @ResolveField(() => [QuestionTemplate])
  async templates(@Parent() patientIllnessHistory: PatientIllnessHistory): Promise<QuestionTemplate[]> {
    const { templateIds } = patientIllnessHistory || {}
    if (templateIds) {
      const templates = Promise.all(await templateIds.map(async (templateId) => {
        const { template } = await this.chartingTemplateService.findOne(templateId);
        return template
      }))
      return templates
    }
  }
}