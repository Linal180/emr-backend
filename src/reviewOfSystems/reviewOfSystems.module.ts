import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentModule } from "src/appointments/appointment.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { PatientModule } from "src/patients/patient.module";
import { AnswerResponses } from "./entities/answerResponses.entity";
import { PatientIllnessHistory } from "./entities/patientIllnessHistory.entity";
//entities
import { QuestionAnswers } from "./entities/questionAnswers.entity";
import { QuestionTemplate } from "./entities/questionTemplate.entity";
import { ReviewOfSystem } from "./entities/reviewOfSystem.entity";
import { SectionQuestions } from "./entities/sectionQuestions.entity";
import { TemplateSections } from "./entities/templateSections.entity";
import { AnswerResponsesResolver } from "./resolvers/answerResponses.resolver";
import { ChartingTemplateResolver } from "./resolvers/chartingTemplate.resolver";
import { PatientIllnessHistoryResolver } from "./resolvers/patientIllnessHistory.resolver";
import { QuestionAnswersResolver } from "./resolvers/questionAnswers.resolver";
import { ReviewOfSystemResolver } from "./resolvers/reviewOfSystem.resolver";
import { SectionQuestionsResolver } from "./resolvers/sectionQuestions.resolver";
import { TemplateSectionsResolver } from "./resolvers/templateSections.resolver";
import { AnswerResponsesService } from "./services/answerResponses.service";
import { ChartingTemplateService } from "./services/chartingTemplate.service";
import { PatientIllnessHistoryService } from "./services/patientIllnessHistory.service";
import { QuestionAnswersService } from "./services/questionAnswers.service";
import { ReviewOfSystemService } from "./services/reviewOfSystem.service";
import { SectionQuestionsService } from "./services/sectionQuestions.service";
import { TemplateSectionsService } from "./services/templateSections.service";


@Module({
  imports: [
    //entities
    TypeOrmModule.forFeature([
      TemplateSections, SectionQuestions, QuestionAnswers, QuestionTemplate, PatientIllnessHistory, AnswerResponses, ReviewOfSystem
    ]),
    //modules
    PaginationModule,
    PatientModule,
    AppointmentModule
  ],
  providers: [
    //resolvers
    ChartingTemplateResolver,
    ChartingTemplateService,
    TemplateSectionsService,
    TemplateSectionsResolver,
    SectionQuestionsService,
    QuestionAnswersService,
    SectionQuestionsResolver,
    PatientIllnessHistoryResolver,
    PatientIllnessHistoryService,
    AnswerResponsesResolver,
    AnswerResponsesService,
    QuestionAnswersResolver,
    ReviewOfSystemResolver,
    ReviewOfSystemService
    //services

  ],
  exports: [],
})

export class ReviewOfSystemModule { }