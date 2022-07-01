import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//entity, service
import { UserLogs } from "./entities/user-logs.entity.logs";
import { UserLogsService } from "./services/userLogs.service.logs";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogs], process.env.DATABASE_LOG_ID || 'logs'),
  ],
  providers: [UserLogsService],
  exports: [UserLogsService],
})

export class UserLogsModule { }