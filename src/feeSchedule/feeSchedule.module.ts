import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//modules
import { UtilsModule } from "src/util/utils.module";
import { PracticeModule } from "src/practice/practice.module";
import { PaginationModule } from "src/pagination/pagination.module";
//entities
import { CPTCodes } from "./entities/cptCode.entity";
import { FeeSchedule } from "./entities/feeSchedule.entity";
//resolvers
import { FeeScheduleResolver } from "./resolvers/feeSchedule.resolver";
//services
import { FeeScheduleService } from "./services/feeSchedule.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeeSchedule,CPTCodes]),
    UtilsModule,
    PaginationModule,
    forwardRef(() => PracticeModule)
  ],
  providers: [FeeScheduleResolver, FeeScheduleService],
  exports: [FeeScheduleService, TypeOrmModule]
})


export class FeeScheduleModule { }