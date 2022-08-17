import { SystemBillingStatuses } from "src/lib/constants";

export const systemClaimStatus = [
  {
    statusName: "Ready to Claim",
    system: true,
    statusId: SystemBillingStatuses.READY_TO_CLAIM
  },
  {
    statusName: "Rejected",
    system: true,
    statusId: SystemBillingStatuses.REJECTED
  },
  {
    statusName: "Acknowledged",
    system: true,
    statusId: SystemBillingStatuses.ACKNOWLEDGED
  }
]