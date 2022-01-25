import { forwardRef, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacilityModule } from "src/facilities/facility.module";
import { MailerModule } from "src/mailer/mailer.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { PatientModule } from "src/patients/patient.module";
import { ProviderModule } from "src/providers/provider.module";
import { JwtStrategy } from "./auth/jwt.strategy";
import { Role } from "./entities/role.entity";
import { UserLog } from "./entities/user-logs.entity";
import { User } from "./entities/user.entity";
import { UserSubscriber } from "./subscribers/user.subscriber";
import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserLog]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: configService.get("JWT_EXPIRY") },
      }),
      inject: [ConfigService],
    }),
    MailerModule,
    PaginationModule,
    FacilityModule,
    ProviderModule,
    PatientModule
  ],
  providers: [UsersService, UsersResolver, JwtStrategy, UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule { }
