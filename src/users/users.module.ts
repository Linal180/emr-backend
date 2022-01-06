import { Module, forwardRef } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { UserSubscriber } from "./subscribers/user.subscriber";
import { ConfigService } from "@nestjs/config";
import { MailerModule } from "src/mailer/mailer.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { UserLog } from "./entities/user-logs.entity";
import { FacilityModule } from "src/facilities/facility.module";

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
    forwardRef(() => FacilityModule)
  ],
  providers: [UsersService, UsersResolver, JwtStrategy, UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule { }
