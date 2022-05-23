import { Args, Query, Resolver } from "@nestjs/graphql";
//user imports
import { DashboardService } from "./dashboard.service";
import { PracticeFacilities, PracticeFacilitiesPayload } from "./dto/dashboard.dto";
import { PracticeUsersInputs } from "./dto/dashboard.inputs";

@Resolver(() => PracticeFacilities)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) { }

  
  @Query(() => PracticeFacilitiesPayload)
  async getPracticesFacilities(@Args('practiceUsersInputs') practiceUsersInputs: PracticeUsersInputs): Promise<PracticeFacilitiesPayload> {
    return {
      practiceFacilities: await this.dashboardService.getPracticeFacilitiesCount(practiceUsersInputs),
      response: {
        status: 200,
        message: 'Practice facilities get successfully'
      }
    }
  }
}