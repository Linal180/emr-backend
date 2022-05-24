import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
//user imports
import { DashboardService } from "./dashboard.service";
import PermissionGuard from "src/users/auth/role.guard";
import { JwtAuthGraphQLGuard } from "src/users/auth/jwt-auth-graphql.guard";
import { PracticeFacilities, PracticeFacilitiesPayload, PracticeUsersPayload } from "./dto/dashboard.dto";


@Resolver(() => PracticeFacilities)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) { }

  //queries
  
  @Query(() => PracticeFacilitiesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
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
  async getPracticesUser(): Promise<PracticeUsersPayload> {
    return {
      practiceUsers: await this.dashboardService.getPracticeUsersCount(),
      response: {
        status: 200,
        message: 'Practice user get successfully'
      }
    }
  }

}