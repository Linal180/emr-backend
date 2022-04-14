import { InputType } from "@nestjs/graphql";
import { APPOINTMENTSTATUS } from "src/appointments/entities/appointment.entity";
import { UserStatus } from "src/users/entities/user.entity";
import PaginationInput from "./pagination-input.dto";

@InputType()
export class PaginatedEntityInput {
  status?: UserStatus
  userId?: string
  to?: string
  appointmentNumber?: string
  isActive?: boolean
  from?: string
  practiceId?: string
  patientId?: string
  appointmentId?: string
  appointmentStatus?: APPOINTMENTSTATUS
  dueToday?: boolean
  facilityId?: string
  doctorId?: string
  role?: string
  phychType?: string
  ageGroupId?: string
  primaryContact?: boolean
  categoryId?: string
  category?: { id: string }
  associatedToField?: { id?: string, columnValue?: string, columnValue2?: string, columnValue3?: string, columnName?: string, columnName2?: string, columnName3?: string, filterType: string }
  paginationOptions: PaginationInput
  associatedTo?: string
  relationField?: string
  requestType?: string
  requestStatus?: string
  facilityName?:string
  practiceName?:string
  serviceName?:string
  searchString?:string
  isPrivate?: boolean
  MembershipPlan?: string
  username?: string
  currentPhaseId?: string
}