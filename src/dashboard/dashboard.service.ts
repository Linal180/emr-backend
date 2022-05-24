import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { FacilityService } from "src/facilities/services/facility.service";
import { PracticeService } from "src/practice/practice.service";
import { UsersService } from "src/users/services/users.service";
import { PracticeUsers } from "./dto/dashboard.dto";
import { PracticeFacilitiesInputs, PracticeUsersInputs } from "./dto/dashboard.inputs";

@Injectable()
export class DashboardService {
  constructor(private readonly userService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly practiceService: PracticeService,
  ) { }

  /**
   * Gets practice facilities count
   * @param practiceFacilitiesInputs 
   * @returns  
   */
  async getPracticeFacilitiesCount(practiceFacilitiesInputs?: PracticeFacilitiesInputs) {
    try {
      const practices = await this.practiceService.allPractices()
      const practiceFacilities = await Promise.all(practices?.map(async ({ id, name }) =>
      ({
        facility: await this.facilityService.getPracticeFacilityCount(id),
        id, name
      })))
      return practiceFacilities
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets practice users count
   * @param practiceUsersInputs 
   * @returns  
   */
  async getPracticeUsersCount(practiceUsersInputs?: PracticeUsersInputs): Promise<PracticeUsers[]> {
    try {
      const practices = await this.practiceService.allPractices();

      const practiceFacilities = await Promise.all(practices?.map(async ({ id, name }) =>
      ({
        facility: await this.facilityService.getPracticeFacilities(id),
        id, name
      })))

      const practiceUsers = await Promise.all(practiceFacilities?.map(async ({ facility, id, name }) => {
        const facilities = await Promise.all(facility?.map(async ({ id, name }) => {
          const usersCount = await this.userService.getFacilityUsersCount(id);
          return { usersCount, id, name }
        }))
        let userCount = 0;
        facilities?.map(({ usersCount }) => userCount += usersCount)
        return { facilities, id, name, userCount }
      }))

      return practiceUsers
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}