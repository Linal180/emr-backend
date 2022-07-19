import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
//modules
import { UtilsModule } from "src/util/utils.module";
import { PracticeModule } from "src/practice/practice.module";
import { PaginationModule } from "src/pagination/pagination.module";
//entities
import { CPTCodes } from "./entities/cptCode.entity";
import { Modifier } from "./entities/modifier.entity";
import { FeeSchedule } from "./entities/feeSchedule.entity";
//resolvers
import { CptCodeResolver } from "./resolvers/cptCodes.resolver";
import { ModifierResolver } from "./resolvers/modifier.resolver";
import { FeeScheduleResolver } from "./resolvers/feeSchedule.resolver";
//services
import { CptCodeService } from "./services/cptCode.service";
import { ModifierService } from "./services/modifier.service";
import { FeeScheduleService } from "./services/feeSchedule.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeeSchedule, CPTCodes, Modifier]),
    UtilsModule,
    PaginationModule,
    forwardRef(() => PracticeModule)
  ],
  providers: [
    FeeScheduleResolver, FeeScheduleService, CptCodeResolver, CptCodeService, ModifierService, ModifierResolver
  ],
  exports: [FeeScheduleService, TypeOrmModule]
})


export class FeeScheduleModule { }