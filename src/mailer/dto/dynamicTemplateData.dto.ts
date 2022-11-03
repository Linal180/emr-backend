export class DynamicTemplateData {
  userEmail?: string
  fullName?: string
  phoneNo?: string
  zipCode?: string
  phase?: string
  adminPortalURL?: string
  userPortalURL?: string
  requestType?: string
}

export type RemainderEmailType = {
  email: string,
  fullName: string,
  facilityName: string,
  slotStartTime: string,
  facilityEmail: string,
  facilityPhone: string,
}

export type AppointmentConfirmationEmailType = {
  id: string;
  email: string;
  token: string;
  fullName: string;
  slotStartTime: string;
  facilityEmail: string;
  facilityPhone: string;
  patientPortal: boolean;
}

type EmailForgotInviteType = 'FORGOT_PASSWORD_TEMPLATE_ID' | 'PATIENT_PORTAL_INVITATION_TEMPLATE_ID' | 'INVITATION_TEMPLATE_ID'

export type SendEmailForgotPasswordType = {
  email: string,
  userId: string,
  fullName: string,
  providerName: string,
  isAdmin: boolean,
  token: string,
  isInvite: EmailForgotInviteType
}

export type TemplateSwitch = "requestInviteAdmin" | "newSignUp" | "requestInviteUser" | "requestInviteUserReject" | "caseAssigned" | "caseCreated" | "caseStatusUpdate" | "requestInitated" | "requestApproved" | "updateNeeded" | "updateDeclined" | "patientPortalInvitation";