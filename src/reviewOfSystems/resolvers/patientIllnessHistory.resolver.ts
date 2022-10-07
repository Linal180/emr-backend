
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
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
import { PatientIllnessHistoryPayload } from "../dto/patientIllnessHistory-payload";
import { PatientIllnessHistory } from "../entities/patientIllnessHistory.entity";
import { CreatePatientIllnessHistoryInput, PatientIllnessHistoryInput } from "../dto/patientIllnessHistory-input.dto";
import { PatientIllnessHistoryService } from "../services/patientIllnessHistory.service";

@Resolver(() => PatientIllnessHistory)
export class PatientIllnessHistoryResolver {
  constructor(
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    private readonly templateSectionsService: TemplateSectionsService,
  ) { }

  @Query(() => PatientIllnessHistoryPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'patientSocialHistory')
  async patientSocialHistory(@Args('patientIllnessHistoryInput') patientIllnessHistoryInput: PatientIllnessHistoryInput): Promise<PatientIllnessHistoryPayload> {
    const { appointmentId } = patientIllnessHistoryInput;
    return {
      patientIllnessHistory: await this.patientIllnessHistoryService.findOneByAppointmentId(appointmentId),
      response: { status: 200, message: 'Social history fetched successfully' }
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

  @ResolveField(() => [TemplateSections])
  async sections(@Parent() questionTemplate: QuestionTemplate): Promise<TemplateSections[]> {
    if (questionTemplate?.id) {
      const templateSectionsPayload = this.templateSectionsService.findSectionsByTemplateId(questionTemplate?.id);
      return (await templateSectionsPayload).sections
    }
  }
}