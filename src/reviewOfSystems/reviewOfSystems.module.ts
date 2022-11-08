import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentModule } from "src/appointments/appointment.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { PatientModule } from "src/patients/patient.module";
import { ChartingTemplateController } from "./chartingTemplate.controller";
import { AnswerResponses } from "./entities/answerResponses.entity";
import { PatientIllnessHistory } from "./entities/patientIllnessHistory.entity";
import { PhysicalExam } from "./entities/physicalExam.entity";
//entities
import { QuestionAnswers } from "./entities/questionAnswers.entity";
import { QuestionTemplate } from "./entities/questionTemplate.entity";
import { ReviewOfSystem } from "./entities/reviewOfSystem.entity";
import { SectionQuestions } from "./entities/sectionQuestions.entity";
import { TemplateSections } from "./entities/templateSections.entity";
import { AnswerResponsesResolver } from "./resolvers/answerResponses.resolver";
import { ChartingTemplateResolver } from "./resolvers/chartingTemplate.resolver";
import { PatientIllnessHistoryResolver } from "./resolvers/patientIllnessHistory.resolver";
import { PhysicalExamResolver } from "./resolvers/physicalExam.resolver";
import { QuestionAnswersResolver } from "./resolvers/questionAnswers.resolver";
import { ReviewOfSystemResolver } from "./resolvers/reviewOfSystem.resolver";
import { SectionQuestionsResolver } from "./resolvers/sectionQuestions.resolver";
import { TemplateSectionsResolver } from "./resolvers/templateSections.resolver";
import { AnswerResponsesService } from "./services/answerResponses.service";
import { ChartingTemplateService } from "./services/chartingTemplate.service";
import { PatientIllnessHistoryService } from "./services/patientIllnessHistory.service";
import { PhysicalExamService } from "./services/physicalExam.service";
import { QuestionAnswersService } from "./services/questionAnswers.service";
import { ReviewOfSystemService } from "./services/reviewOfSystem.service";
import { SectionQuestionsService } from "./services/sectionQuestions.service";
import { TemplateSectionsService } from "./services/templateSections.service";


@Module({
  imports: [
    //entities
    TypeOrmModule.forFeature([
      TemplateSections, SectionQuestions, QuestionAnswers, QuestionTemplate, PatientIllnessHistory, AnswerResponses, ReviewOfSystem, PhysicalExam
    ]),
    //modules
    forwardRef(() => PaginationModule),
    forwardRef(() => PatientModule) ,
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
    ReviewOfSystemService,
    PhysicalExamService,
    PhysicalExamResolver
    //services

  ],
  controllers: [ChartingTemplateController],
  exports: [ChartingTemplateService, ReviewOfSystemService, PatientIllnessHistoryService, PhysicalExamService],
})

export class ReviewOfSystemModule { }