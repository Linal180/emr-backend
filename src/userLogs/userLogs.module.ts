import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//entity, service, module
import { UsersModule } from "src/users/users.module";
import { UserLogs } from "./entities/user-logs.entity.logs";
import { UserLogsService } from "./services/userLogs.service.logs";
import { PaginationModule } from "src/pagination/pagination.module";
import { UserLogsResolver } from './resolvers/userLogs.resolver.logs'
import { PatientModule } from "src/patients/patient.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogs], process.env.DATABASE_LOG_ID || 'logs'),
    PaginationModule,
    UsersModule,
    PatientModule
  ],
  providers: [UserLogsService, UserLogsResolver],
  exports: [UserLogsService],
})

export class UserLogsModule { }