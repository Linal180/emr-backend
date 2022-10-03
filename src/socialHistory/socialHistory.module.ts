import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//entities
import { Sections } from "./entities/sections.entity";
import { Questions } from "./entities/questions.entity";
import { SocialAnswer } from "./entities/socialAnswer.entity";
import { SocialHistory } from "./entities/socialHistory.entity";
import { DependentQuestions } from "./entities/dependentQuestions.entity";
import { SocialDependentAnswer } from "./entities/socialDependentAnswer.entity";
//modules
import { UtilsModule } from "src/util/utils.module";
import { UsersModule } from "src/users/users.module";
import { PatientModule } from "src/patients/patient.module";
import { PaginationModule } from "src/pagination/pagination.module";
//resolvers
import { SectionsResolver } from "./resolvers/sections.resolver";
import { QuestionsResolver } from "./resolvers/questions.resolver";
import { SocialHistoryResolver } from "./resolvers/socialHistory.resolver";
import { DependentQuestionsResolver } from "./resolvers/dependentQuestions.resolver";
//services
import { SectionService } from "./services/sections.service";
import { QuestionService } from "./services/questions.service";
import { SocialAnswerService } from "./services/socialAnswer.service";
import { SocialHistoryService } from "./services/socialHistory.service";
import { DependentQuestionService } from "./services/dependentQuestions.service"
import { SocialDependentAnswerService } from "./services/socialDependentAnswer.service";


@Module({
  imports: [
    //entities
    TypeOrmModule.forFeature([
      SocialHistory, Questions,
      Sections, DependentQuestions,
      SocialAnswer, SocialDependentAnswer
    ]),
    //modules
    UtilsModule,
    UsersModule,
    PatientModule,
    PaginationModule,
  ],
  providers: [
    //resolvers
    SectionsResolver,
    QuestionsResolver,
    SocialHistoryResolver,
    DependentQuestionsResolver,
    //services
    SectionService,
    QuestionService,
    SocialAnswerService,
    SocialHistoryService,
    DependentQuestionService,
    SocialDependentAnswerService
  ],
  exports: [SocialAnswerService, SocialHistoryService],
})

export class SocialHistoryModule { }