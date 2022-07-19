import { InputType } from "@nestjs/graphql";
import { AppointmentStatus } from "src/appointments/entities/appointment.entity";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { FormType } from "src/formbuilder/entities/form.entity";
import { Speciality } from "src/providers/entities/doctor.entity";
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
  appointmentStatus?: AppointmentStatus
  dueToday?: boolean
  facilityId?: string
  singleFacilityId?:string
  doctorId?: string
  role?: string
  phychType?: string
  allergyType?: string
  reactionName?: string
  allergyName?: string
  ageGroupId?: string
  primaryContact?: boolean
  categoryId?: string
  category?: { id: string }
  associatedToField?: { id?: string, columnValue?: string, columnValue2?: string, columnValue3?: string, columnName?: string, columnName2?: string, columnName3?:string, filterType: string }
  paginationOptions: PaginationInput
  associatedTo?: string
  relationField?: string
  requestType?: string
  requestStatus?: string
  facilityName?:string
  practiceName?:string
  labTestStatus?:string
  serviceName?:string
  searchString?:string
  isPrivate?: boolean
  MembershipPlan?: string
  patientRecord?: string
  username?: string
  currentPhaseId?: string
  FormId?: string
  isSystemForm?: boolean
  doctorFirstName?: string
  roleName?: string
  customRole?: boolean
  typeId?: string
  AttachmentModuleType?: AttachmentType
  formType?: FormType
  loincNum?: string
  component?: string
  specimenTypeName?: string
  orderNumber?: string
  payerName?: string
  documentPracticeId?: string
  agreementFacilityId?: string
  agreementPracticeId?: string
  documentTypeName?: string
  providerId?: string
  speciality?: Speciality;
  moduleType?: string;
  logUserId?: string;
  logStartDate?: string;
  logEndDate?: string;
  code?: string;
}