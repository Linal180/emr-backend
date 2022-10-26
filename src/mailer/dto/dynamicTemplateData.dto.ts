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

export type TemplateSwitch = "requestInviteAdmin" | "newSignUp" | "requestInviteUser" | "requestInviteUserReject" | "caseAssigned" | "caseCreated" | "caseStatusUpdate" | "requestInitated" | "requestApproved" | "updateNeeded" | "updateDeclined" | "patientPortalInvitation";