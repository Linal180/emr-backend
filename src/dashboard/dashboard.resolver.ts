import { SetMetadata, UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
//user imports
import { DashboardService } from "./dashboard.service";
import PermissionGuard from "src/users/auth/role.guard";
import { PracticeFacilityAppointmentsInputs, PracticeFacilitiesUsersInputs, PracticesViaDateInputs, UsersWithRolesInputs } from "./dto/dashboard.inputs";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import {
  ActiveInactivePracticesPayload, PracticeFacilitiesPayload, PracticesViaDatePayload, PracticeUsersPayload,
  PracticeFacilities, PracticeUsersWithRolesPayload, PracticeFacilityAppointmentsPayload, PracticeUserRolesPayload
} from "./dto/dashboard.dto";


@Resolver(() => PracticeFacilities)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) { }

  //queries

  @Query(() => PracticeFacilitiesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPracticesFacilities')
  async getPracticesFacilities(): Promise<PracticeFacilitiesPayload> {
    return {
      practiceFacilities: await this.dashboardService.getPracticeFacilitiesCount(),
      response: {
        status: 200,
        message: 'Practice facilities get successfully'
      }
    }
  }


  @Query(() => PracticeUsersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPracticesUser')
  async getPracticesUser(): Promise<PracticeUsersPayload> {
    return {
      practiceUsers: await this.dashboardService.getPracticeUsersCount(),
      response: {
        status: 200,
        message: 'Practice user get successfully'
      }
    }
  }


  @Query(() => ActiveInactivePracticesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getActiveInactivePractices')
  async getActiveInactivePractices(): Promise<ActiveInactivePracticesPayload> {
    const practices = await this.dashboardService.getActiveInactivePracticesCount();

    return {
      ...practices,
      response: {
        status: 200,
        message: 'Practice user get successfully'
      }
    }
  }


  @Query(() => PracticesViaDatePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPracticesByYear')
  async getPracticesByYear(
    @Args('practicesViaDateInputs') practicesViaDateInputs: PracticesViaDateInputs
  ): Promise<PracticesViaDatePayload> {

    const { date } = practicesViaDateInputs
    return {
      practices: await this.dashboardService.getPracticesDate(date),
      response: {
        status: 200,
        message: 'Practice user get successfully'
      }
    }
  }


  @Query(() => PracticeUsersWithRolesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPracticeFacilitiesUsersWithRoles')
  async getPracticeFacilitiesUsersWithRoles(@Args('practiceFacilitiesUsersInputs') practiceFacilitiesUsersInputs: PracticeFacilitiesUsersInputs): Promise<PracticeUsersWithRolesPayload> {
    return {
      practiceUsers: await this.dashboardService.getPracticeFacilityUsersWithRolesCount(practiceFacilitiesUsersInputs),
      response: {
        status: 200,
        message: 'Practice user get successfully'
      }
    }
  }

  @Query(() => PracticeFacilityAppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPracticeFacilityAppointments')
  async getPracticeFacilityAppointments(@Args('practiceFacilityAppointmentsInputs') practiceFacilityAppointmentsInputs: PracticeFacilityAppointmentsInputs): Promise<PracticeFacilityAppointmentsPayload> {
    return {
      facilitiesAppointments:  await this.dashboardService.practiceFacilityAppointments(practiceFacilityAppointmentsInputs),
      response: {
        status: 200,
        message: 'Practice Facilities appointments get successfully'
      }
    }
  }

  @Query(() => PracticeUserRolesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getUsersWithRoles')
  async getUsersWithRoles(@Args('usersWithRolesInputs') usersWithRolesInputs: UsersWithRolesInputs):
    Promise<PracticeUserRolesPayload> {
    return {
      userRoles: await this.dashboardService.getUsersWithRoles(usersWithRolesInputs),
      response: {
        status: 200,
        message: 'Practice user roles get successfully'
      }
    }
  }
}
