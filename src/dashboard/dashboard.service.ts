import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { FacilityService } from "src/facilities/services/facility.service";
import { PracticeService } from "src/practice/practice.service";
import { UsersService } from "src/users/services/users.service";
import { PracticeUsersInputs } from "./dto/dashboard.inputs";

@Injectable()
export class DashboardService {
  constructor(private readonly userService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly practiceService: PracticeService,
  ) { }

  async getPracticeFacilitiesCount(practiceUsersInputs: PracticeUsersInputs) {
    try {
      const practices = await this.practiceService.allPractices()
      console.log('practices => ', practices)
      const practiceFacilities = await Promise.all(practices?.map(async ({ id, name }) =>
      ({
        facility: await this.facilityService.getPracticeFacilityCount(id),
        id, name
      })))
      console.log('practiceFacilities => ', practiceFacilities)
      return practiceFacilities
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }
}