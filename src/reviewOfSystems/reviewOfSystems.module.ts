import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/pagination/pagination.module";
//entities
import { QuestionAnswers } from "./entities/questionAnswers.entity";
import { QuestionTemplate } from "./entities/questionTemplate.entity";
import { SectionQuestions } from "./entities/sectionQuestions.entity";
import { TemplateSections } from "./entities/templateSections.entity";
import { ChartingTemplateResolver } from "./resolvers/chartingTemplate.resolver";
import { SectionQuestionsResolver } from "./resolvers/sectionQuestions.resolver";
import { TemplateSectionsResolver } from "./resolvers/templateSections.resolver";
import { ChartingTemplateService } from "./services/chartingTemplate.service";
import { QuestionAnswersService } from "./services/questionAnswers.service";
import { SectionQuestionsService } from "./services/sectionQuestions.service";
import { TemplateSectionsService } from "./services/templateSections.service";


@Module({
  imports: [
    //entities
    TypeOrmModule.forFeature([
      TemplateSections, SectionQuestions, QuestionAnswers, QuestionTemplate
    ]),
    //modules
    PaginationModule
  ],
  providers: [
    //resolvers
    ChartingTemplateResolver,
    ChartingTemplateService,
    TemplateSectionsService,
    TemplateSectionsResolver,
    SectionQuestionsService,
    QuestionAnswersService,
    SectionQuestionsResolver
    //services

  ],
  exports: [],
})

export class ReviewOfSystemModule { }