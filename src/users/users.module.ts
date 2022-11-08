import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { forwardRef, Module } from "@nestjs/common";
//modules
import { MailerModule } from "src/mailer/mailer.module";
import { PatientModule } from "src/patients/patient.module";
import { ProviderModule } from "src/providers/provider.module";
import { FacilityModule } from "src/facilities/facility.module";
import { PaginationModule } from "src/pagination/pagination.module";
import { AttachmentsModule } from "src/attachments/attachments.module";
//entities
import { Role } from "./entities/role.entity";
import { User } from "./entities/user.entity";
import { Permission } from "./entities/permissions.entity";
import { RolePermission } from "./entities/rolePermissions.entity";
//resolvers
import { RoleResolver } from "./resolvers/roles.resolver";
import { UsersResolver } from "./resolvers/users.resolver";
import { PermissionResolver } from "./resolvers/permissions.resolver";
import { RolePermissionResolver } from "./resolvers/rolePermissions.resolver";
//services
import { RolesService } from "./services/roles.service";
import { UsersService } from "./services/users.service";
import { PermissionsService } from "./services/permissions.service";
import { RolePermissionsService } from "./services/rolePermissions.service";
//controllers, subscriber, strategy
import { JwtStrategy } from "./auth/jwt.strategy";
import { UsersController } from "./users.controller";
import { UserSubscriber } from "./subscribers/user.subscriber";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, RolePermission]),
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
    forwardRef(() => PatientModule),
    forwardRef(() => AttachmentsModule),
  ],
  providers: [UsersService, UsersResolver, PermissionResolver, RoleResolver, PermissionsService,
    RolePermissionResolver,RolePermissionsService, RolesService, JwtStrategy, UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, RolesService],
})
export class UsersModule { }
