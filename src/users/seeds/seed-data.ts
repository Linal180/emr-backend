import { UserRole } from '../../users/entities/role.entity'
import { UserStatus } from '../entities/user.entity';


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
    { firstName: "Khalid", lastName: "Rasool", password: "super123", email: "khalid.rasool@kwanso.com", status: UserStatus.ACTIVE, phone: "+923426851938", roleType: UserRole.SUPER_ADMIN, zipCode: "54000", emailVerified: true },
    { firstName: "Shah", lastName: "Zaib", password: "super123", email: "shah.zaib@kwanso.com", status: UserStatus.ACTIVE, phone: "+923426851938", roleType: UserRole.ADMIN, zipCode: "54000", emailVerified: true }
];
