
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

@Resolver(() => PatientIllnessHistory)
export class PatientIllnessHistoryResolver {
  constructor(
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    private readonly answerResponsesService: AnswerResponsesService,
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
}