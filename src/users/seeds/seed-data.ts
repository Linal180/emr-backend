import { PracticeType, ServiceCode } from '../../facilities/entities/facility.entity';
import { UserStatus } from '../entities/user.entity';

export const FacilityData = [
    { name: "Private Facility", practiceType: PracticeType.HOSPITAL, code: "+02923", mammographyCertificationNumber: "232232", cliaIdNumber: "023292", federalTaxId: "232232322", isPrivate: true, revenueCode: "323343433", npi: "232332", tamxonomyCode: "2322332", serviceCode: ServiceCode.EMERGENCY_ROOM_23 }];

export const RolesData = [
    { role: 'super-admin' },
    { role: 'admin' },
    { role: 'doctor' },
    { role: 'nurse' },
    { role: 'patient' },
    { role: 'patient' },
    { role: 'staff' },
    { role: 'nurse_practitioner' },
    { role: 'office_manager' },
    { role: 'doctor_assistant' }
];
export const UsersData = [
    { firstName: "Khalid", lastName: "Rasool", password: "super123", email: "khalid.rasool@kwanso.com", status: UserStatus.ACTIVE, phone: "+923426851938", userType: 'super-admin', roleType: 'super-admin', zipCode: "54000", emailVerified: true },
];
