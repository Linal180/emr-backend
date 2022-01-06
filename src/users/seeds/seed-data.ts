import { UserRole } from '../../users/entities/role.entity'
import { UserStatus } from '../entities/user.entity';


import { Facility, PracticeType, ServiceCode } from '../../facilities/entities/facility.entity'

export const FacilityData = [
    { name: "Private Facility", practiceType: PracticeType.HOSPITAL, code: "+02923", mammographyCertificationNumber: "232232", cliaIdNumber: "023292", federalTaxId: "232232322", isPrivate: true, revenueCode: "323343433", npi: "232332", tamxonomyCode: "2322332", serviceCode: ServiceCode.EMERGENCY_ROOM_23 }];

export const RolesData = [
    { role: UserRole.SUPER_ADMIN },
    { role: UserRole.ADMIN },
    { role: UserRole.DOCTOR },
    { role: UserRole.NURSE },
    { role: UserRole.PATIENT },
    { role: UserRole.BILLING },
    { role: UserRole.STAFF }
];

export const UsersData = [
    { firstName: "Khalid", lastName: "Rasool", password: "super123", email: "khalid.rasool@kwanso.com", status: UserStatus.ACTIVE, phone: "+923426851938", userType: UserRole.SUPER_ADMIN, roleType: UserRole.SUPER_ADMIN, zipCode: "54000", emailVerified: true },
];
