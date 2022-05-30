import { Injectable, InternalServerErrorException } from "@nestjs/common";
//user imports
import { getMonthsRecord } from "src/lib/helper";
import { PracticeFacilityAppointment, PracticesViaDate, PracticeUserRoles, PracticeUsers, PracticeUsersWithRoles } from "./dto/dashboard.dto";
import { PracticeService } from "src/practice/practice.service";
import { UsersService } from "src/users/services/users.service";
import { FacilityService } from "src/facilities/services/facility.service";
import { PracticeFacilitiesInputs, PracticeFacilitiesUsersInputs, PracticeFacilityAppointmentsInputs, UsersWithRolesInputs } from "./dto/dashboard.inputs";
import { AppointmentService } from "src/appointments/services/appointment.service";

@Injectable()
export class DashboardService {
  constructor(private readonly userService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly practiceService: PracticeService,
    private readonly appointmentService: AppointmentService,
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
  async getPracticeUsersCount(): Promise<PracticeUsers[]> {
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

  /**
   * Gets active inactive practices
   * @returns  
   */
  async getActiveInactivePracticesCount() {
    try {
      const activePractices = await this.practiceService.getActivePractices();
      const inactivePractices = await this.practiceService.getInactivePractices();
      return { activePractices, inactivePractices }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Gets practices date
   * @returns  
   */
  async getPracticesDate(date: number): Promise<PracticesViaDate[]> {
    try {
      const data = await this.practiceService.getMonthsPractice(date);
      return getMonthsRecord(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets practice facility users with roles count
   * @param practiceFacilitiesUsersInputs 
   * @returns practice facility users with roles count 
   */
  async getPracticeFacilityUsersWithRolesCount(practiceFacilitiesUsersInputs: PracticeFacilitiesUsersInputs): Promise<PracticeUsersWithRoles[]> {
    try {
      const { practiceId, roles } = practiceFacilitiesUsersInputs
      const practices = await this.practiceService.allPractices(practiceId);
      const practiceFacilities = await Promise.all(practices?.map(async ({ id, name }) =>
      ({
        facility: await this.facilityService.getPracticeFacilities(id),
        id, name
      })))

      const practiceUsers = await Promise.all(practiceFacilities?.map(async ({ facility, id, name }) => {
        const facilities = await Promise.all(facility?.map(async ({ id, name }) => {
          const users = await this.userService.getFacilityUsersWithRolesCount(id, roles);
          return { users, id, name }
        }))

        return { facilities, id, name }
      }))

      return practiceUsers
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Practices facility appointments count
   * @param input 
   * @returns PracticeFacilityAppointment[]
   */
  async practiceFacilityAppointments(input: PracticeFacilityAppointmentsInputs): Promise<PracticeFacilityAppointment[]> {
    try {
      const { practiceId } = input
      const facilities = await this.facilityService.getPracticeFacilitiesAppointments(practiceId)
      const facilityAppointment = await Promise.all(facilities.map(async ({ id, name }) => {
        const count = await this.appointmentService.getFacilityAppointmentCount({ facilityId: id })
        return { facility: name, count }
      }))
      return facilityAppointment
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
 * Find Practice User count against Practice
 * @param UsersWithRolesInputs
 * @returns  PracticeUserRoles[]
 */
  async getUsersWithRoles(inputs: UsersWithRolesInputs): Promise<PracticeUserRoles[]> {
    try {
      const { practiceId } = inputs
      const userRoles = await this.userService.usersWithRoles(practiceId)

      return await Promise.all(userRoles.map(async ({ role }) => {
        const count = await this.userService.findUserCountWithRole(role, practiceId)
        return { role, count }
      }))
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
