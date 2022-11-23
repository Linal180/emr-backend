import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//entities
import { PhysicalExam } from "./entities/physicalExam.entity";
import { ReviewOfSystem } from "./entities/reviewOfSystem.entity";
import { AnswerResponses } from "./entities/answerResponses.entity";
import { QuestionAnswers } from "./entities/questionAnswers.entity";
import { QuestionTemplate } from "./entities/questionTemplate.entity";
import { SectionQuestions } from "./entities/sectionQuestions.entity";
import { TemplateSections } from "./entities/templateSections.entity";
import { Exercises } from "./entities/physicalTherapyExercise.entity";
import { PatientIllnessHistory } from "./entities/patientIllnessHistory.entity";
//resolvers
import { PhysicalExamResolver } from "./resolvers/physicalExam.resolver";
import { ReviewOfSystemResolver } from "./resolvers/reviewOfSystem.resolver";
import { AnswerResponsesResolver } from "./resolvers/answerResponses.resolver";
import { QuestionAnswersResolver } from "./resolvers/questionAnswers.resolver";
import { ChartingTemplateResolver } from "./resolvers/chartingTemplate.resolver";
import { SectionQuestionsResolver } from "./resolvers/sectionQuestions.resolver";
import { TemplateSectionsResolver } from "./resolvers/templateSections.resolver";
import { PatientIllnessHistoryResolver } from "./resolvers/patientIllnessHistory.resolver";
//services
import { PhysicalExamService } from "./services/physicalExam.service";
import { ReviewOfSystemService } from "./services/reviewOfSystem.service";
import { QuestionAnswersService } from "./services/questionAnswers.service";
import { AnswerResponsesService } from "./services/answerResponses.service";
import { ChartingTemplateService } from "./services/chartingTemplate.service";
import { SectionQuestionsService } from "./services/sectionQuestions.service";
import { TemplateSectionsService } from "./services/templateSections.service";
import { PhysicalExerciseServive } from "./services/physicalExercise.service";
import { PatientIllnessHistoryService } from "./services/patientIllnessHistory.service";
//modules
import { PatientModule } from "src/patients/patient.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { AppointmentModule } from "src/appointments/appointment.module";
//controller
import { ChartingTemplateController } from "./chartingTemplate.controller";

@Module({
  imports: [
    //entities
    TypeOrmModule.forFeature([
      TemplateSections, SectionQuestions, QuestionAnswers, QuestionTemplate, PatientIllnessHistory, AnswerResponses, ReviewOfSystem, PhysicalExam,
      Exercises
    ]),
    //modules
    forwardRef(() => PaginationModule),
    forwardRef(() => PatientModule),
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
    PhysicalExamResolver,
    PhysicalExerciseServive
    //services

  ],
  controllers: [ChartingTemplateController],
  exports: [ChartingTemplateService, ReviewOfSystemService, PatientIllnessHistoryService, PhysicalExamService],
})

export class ReviewOfSystemModule { }