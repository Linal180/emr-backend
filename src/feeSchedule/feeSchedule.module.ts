import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeeSchedule } from "./entities/feeSchedule.entity";
import { FeeScheduleResolver } from "./resolvers/feeSchedule.resolver";
import { FeeScheduleService } from "./services/feeSchedule.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([FeeSchedule]),
  ],
  providers: [FeeScheduleResolver, FeeScheduleService],
  exports: [TypeOrmModule],
})


export class FeeScheduleModule { }