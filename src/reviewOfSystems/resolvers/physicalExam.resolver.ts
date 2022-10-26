
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { AnswerResponses } from "../entities/answerResponses.entity";
import { PhysicalExam } from "../entities/physicalExam.entity";
// services
import { PhysicalExamService } from "../services/physicalExam.service";
import { AnswerResponsesService } from "../services/answerResponses.service";
import { ChartingTemplateService } from "../services/chartingTemplate.service";
//payloads
import { PhysicalExamPayload } from "../dto/physicalExam-payload";
//inputs
import { UpdateNotes } from "../dto/patientIllnessHistory-input.dto";
import { CreatePhysicalExamInput, PhysicalExamInput } from "../dto/physicalExam-input.dto";

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
  // @SetMetadata('name', 'createPatientIllnessHistory')
  async updatePENotes(@Args('updateNotes') updateNotes: UpdateNotes): Promise<PhysicalExamPayload> {
    return {
      physicalExam: await this.physicalExamService.updateNotes(updateNotes),
      response: { status: 200, message: `Physical Exam ${updateNotes?.id ? "updated" : "created"} successfully` }
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