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
import { RoleResolver } from "./resolvers/roles.resolver";
import { UsersResolver } from "./resolvers/users.resolver";
import { RolesService } from "./services/roles.service";
import { UsersService } from "./services/users.service";
import { UserSubscriber } from "./subscribers/user.subscriber";
import { UsersController } from "./users.controller";

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
    forwardRef(() => FacilityModule),
    forwardRef(() => ProviderModule),
    forwardRef(() => PatientModule)
  ],
  providers: [UsersService, UsersResolver, RoleResolver, RolesService, JwtStrategy, UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, RolesService],
})
export class UsersModule { }
