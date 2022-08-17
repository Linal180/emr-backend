import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility, PracticeType } from "src/facilities/entities/facility.entity";
import { Connection, getRepository, QueryRunner } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { createPasswordHash, createToken } from '../../lib/helper';
import { Permission } from "../entities/permissions.entity";
import { Role } from '../entities/role.entity';
import { RolePermission } from "../entities/rolePermissions.entity";
import { User } from '../entities/user.entity';
import { Practice } from "src/practice/entities/practice.entity";
import { Contact } from "src/providers/entities/contact.entity";
import { Staff } from "src/providers/entities/staff.entity";
import { Doctor } from "src/providers/entities/doctor.entity";
import { doctorAssistantPermissionsList, doctorPermissionsList, emergencyAccessPermissionsList, facilityAdminPermissionsList, FacilityData, frontDeskPermissionsList, nursePermissionsList, officeManagerPermissionsList as officeManagerPermissionsList1, patientPermissionsList, PermissionData, permissionDataNew, practiceAdminPermissionsList, practitionerNursePermissionsList, RolesData, staffPermissionsList, UsersData } from './seed-data';
import { PracticeInfo, FacilitiesData, PracticeAdminInfo, PracticeUsersData } from './practiceSeed-data'

@Injectable()
export class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Facility 
      let facility = await getRepository(Facility).find();
      if (!facility.length) {
        let createdFacility = getRepository(Facility).create(FacilityData)
        facility = await queryRunner.manager.save(createdFacility);
      }
      //Add Roles

      const createdRoles = await Promise.all(await RolesData.map(async (rolesData) => {
        const getRole = await getRepository(Role).findOne({ role: rolesData.role })
        if (!getRole) {
          const createdRole = getRepository(Role).create(rolesData)
          const savedRole = await queryRunner.manager.save(createdRole);
          return savedRole
        } else {
          return getRole
        }
      }))

      let mergedRoles = [...await getRepository(Role).find(), ...createdRoles];
      let roles = mergedRoles.filter((role, index, arrayRoles) => index === arrayRoles.findIndex((t) => (
        t.id === role.id
      )))

      //Add Permissions
      const createdPermissions = await Promise.all(await PermissionData.map(async (permissionData) => {
        const getPermission = await getRepository(Permission).findOne({ name: permissionData.name })
        if (!getPermission) {
          const createdPermission = getRepository(Permission).create(permissionData)
          return await queryRunner.manager.save(createdPermission);
        } else {
          return getPermission
        }
      }))
      let mergedPermissions = [...await getRepository(Permission).find(), ...createdPermissions]
      let permissions = mergedPermissions.filter((permission, index, arrayPermissions) => index === arrayPermissions.findIndex((t) => (
        t.id === permission.id
      )))

      //Add superAdmin role Permissions
      let superAdminRole = roles.find((item) => item.role === 'super-admin')
      let superAdminPermissionList = permissions
      let superAdminRolePermissions = await this.rolePermissionPayload(superAdminPermissionList, superAdminRole)
      await Promise.all(await superAdminRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add practice admin role Permissions
      let practiceAdminRole = roles.find((item) => item.role === 'practice-admin')
      let adminPermissionList = permissions.filter(x => practiceAdminPermissionsList.find(y => (y === x.name)));
      let adminRolePermissions = await this.rolePermissionPayload(adminPermissionList, practiceAdminRole)
      await Promise.all(await adminRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add facility admin role Permissions
      let facilityAdminRole = roles.find((item) => item.role === 'facility-admin')
      let facilityAdminPermissionList = permissions.filter(x => facilityAdminPermissionsList.find(y => (y === x.name)));
      let facilityAdminRolePermissions = await this.rolePermissionPayload(facilityAdminPermissionList, facilityAdminRole)
      await Promise.all(await facilityAdminRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add emergency access role Permissions
      let emergencyAccessRole = roles.find((item) => item.role === 'emergency-access')
      let emergencyAccessPermissionList = permissions.filter(x => emergencyAccessPermissionsList.find(y => (y === x.name)));
      let emergencyAccessRolePermissions = await this.rolePermissionPayload(emergencyAccessPermissionList, emergencyAccessRole)
      await Promise.all(await emergencyAccessRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add doctor role Permissions
      let doctorRole = roles.find((item) => item.role === 'doctor')
      let doctorPermissionList = permissions.filter(x => doctorPermissionsList.find(y => (y === x.name)));
      let doctorRolePermissions = await this.rolePermissionPayload(doctorPermissionList, doctorRole)
      await Promise.all(await doctorRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add nurse role Permissions
      let nurseRole = roles.find((item) => item.role === 'nurse')
      let nursePermissionList = permissions.filter(x => nursePermissionsList.find(y => (y === x.name)));
      let nurseRolePermissions = await this.rolePermissionPayload(nursePermissionList, nurseRole)
      await Promise.all(await nurseRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add patient role Permissions
      let patientRole = roles.find((item) => item.role === 'patient')
      let patientPermissionList = permissions.filter(x => patientPermissionsList.find(y => (y === x.name)));
      let patientRolePermissions = await this.rolePermissionPayload(patientPermissionList, patientRole)
      await Promise.all(await patientRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add staff role Permissions
      let staffRole = roles.find((item) => item.role === 'staff')
      let staffPermissionList = permissions.filter(x => staffPermissionsList.find(y => (y === x.name)));
      let staffRolePermissions = await this.rolePermissionPayload(staffPermissionList, staffRole)
      await Promise.all(await staffRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add nursePractitioner role Permissions
      let nursePractitionerRole = roles.find((item) => item.role === 'nurse-practitioner')
      let nursePractitionerPermissionList = permissions.filter(x => practitionerNursePermissionsList.find(y => (y === x.name)));
      let nursePractitionerRolePermissions = await this.rolePermissionPayload(nursePractitionerPermissionList, nursePractitionerRole)
      await Promise.all(await nursePractitionerRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add office manager role Permissions
      let officeManagerRole = roles.find((item) => item.role === 'office-manager')
      let officeManagerPermissionList = permissions.filter(x => officeManagerPermissionsList1.find(y => (y === x.name)));
      let officeManagerRolePermissions = await this.rolePermissionPayload(officeManagerPermissionList, officeManagerRole)
      await Promise.all(await officeManagerRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add office doctor assistant Permissions
      let doctorAssistantRole = roles.find((item) => item.role === 'doctor-assistant')
      let doctorAssistantPermissionList = permissions.filter(x => doctorAssistantPermissionsList.find(y => (y === x.name)));
      let doctorAssistantRolePermissions = await this.rolePermissionPayload(doctorAssistantPermissionList, doctorAssistantRole)
      await Promise.all(await doctorAssistantRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      let frontDeskRole = roles.find((item) => item.role === 'front-desk')
      let frontDeskPermissionList = permissions.filter(x => frontDeskPermissionsList.find(y => (y === x.name)));
      let frontDeskRolePermissions = await this.rolePermissionPayload(frontDeskPermissionList, frontDeskRole)
      await Promise.all(await frontDeskRolePermissions.map(async (rolePermissionsData) => {
        const getRolePermission = await getRepository(RolePermission).findOne({ roleId: rolePermissionsData.roleId, permissionId: rolePermissionsData.permissionId })
        if (!getRolePermission) {
          const createdRolePermissions = await getRepository(RolePermission).create(rolePermissionsData)
          return await queryRunner.manager.save(createdRolePermissions);
        }
      }))

      //Add Users
      for (let index = 0; index < UsersData.length; index++) {
        const user = UsersData[index];
        const ifUserExist = await getRepository(User).findOne({ email: user.email })
        if (!ifUserExist) {
          user.password = await createPasswordHash(user.password);
          const UserObj = getRepository(User).create(user)
          const role = roles.filter(obj => obj.role === user.roleType);

          UserObj.roles = role;
          UserObj.facility = facility[0]
          const newUserObj = await queryRunner.manager.save(UserObj);
          UserObj.userId = newUserObj.id
          await queryRunner.manager.save(UserObj);
        }
      }

      const practiceAdminRole1 = roles.find((role) => role.role === 'practice-admin')
      let savedPractice: Practice
      savedPractice = await getRepository(Practice).findOne({ name: PracticeInfo.name })
      
      if (!savedPractice) {
        const practiceInstance = await getRepository(Practice).create(PracticeInfo)
        savedPractice = await queryRunner.manager.save(practiceInstance);
      }

      const savedFacilities = await Promise.all(FacilitiesData.map(async (facilityData) => {
        const { name, practiceType, address1, ...facilityContactInfo } = facilityData
        const facilityExist = await getRepository(Facility).findOne({ name })
        if (facilityExist) {
          return facilityExist
        }
        const facilityInstance = getRepository(Facility).create({ name })
        facilityInstance.practice = savedPractice
        facilityInstance.practiceId = savedPractice.id

        const facilityContact = await getRepository(Contact).create({ ...facilityContactInfo, address: address1, primaryContact: true })
        const contact = await queryRunner.manager.save(facilityContact);
        facilityInstance.contacts = [contact]

        return await queryRunner.manager.save(facilityInstance);
      }))

      let savedAdminUser: User
      savedAdminUser = await getRepository(User).findOne({ email: PracticeAdminInfo.email })
      if (!savedAdminUser) {
        const adminUserInstance = await getRepository(User).create({ email: PracticeAdminInfo.email, facility: savedFacilities[0] })
        adminUserInstance.password = await createPasswordHash('admin123');
        adminUserInstance.userType = 'practice-admin'
        savedAdminUser = await queryRunner.manager.save(adminUserInstance)
        const practiceAdminInstance = await getRepository(Staff).create({ ...PracticeAdminInfo })
        practiceAdminInstance.user = savedAdminUser
        practiceAdminInstance.facility = savedFacilities[0]
        practiceAdminInstance.practice = savedPractice
        const savedPracticeAdmin = await queryRunner.manager.save(practiceAdminInstance)
        savedAdminUser.userId = savedPracticeAdmin.id
        savedAdminUser.roles = [practiceAdminRole1]
        await queryRunner.manager.save(savedAdminUser)
      }

      const createdUsers = await Promise.all(await PracticeUsersData.map(async (userData) => {
        const { email, facility, name, phone, role: userRole, suffix } = userData
        const [firstName, lastName] = name.split(' ')
        const existingUser = await getRepository(User).findOne({ email: email })
        if (existingUser) {
          return existingUser
        }

        const userInstance = await getRepository(User).create({ email, phone })
        const roleInfo = roles.find((role) => role.role === userRole)
        userInstance.roles = [roleInfo]
        const token = createToken()
        userInstance.token = token
        const facilityInfo = savedFacilities.find((savedFacility) => savedFacility.name === facility)
        userInstance.facility = facilityInfo
        userInstance.userType = userRole
        userInstance.password = await createPasswordHash('admin123');
        const savedUser = await queryRunner.manager.save(userInstance)

        return queryRunner.manager.save(savedUser)
      }))

      await queryRunner.commitTransaction();

      await Promise.all(await createdUsers.map(async (createdUser) => {
        const { email, facility, name, phone, role: userRole, suffix } = PracticeUsersData.find((userData) => userData.email === createdUser.email)
        const [firstName, lastName] = name.split(' ')

        const facilityInfo = savedFacilities.find((savedFacility) => savedFacility.name === facility)

        if (userRole === 'doctor') {
          const doctorExist = await getRepository(Doctor).findOne({ email })
          if (!doctorExist) {
            const doctorInstance = await getRepository(Doctor).create({ email, firstName, lastName, suffix })
            const doctorContact = await getRepository(Contact).create({ email, phone, primaryContact: true })
            const contact = await queryRunner.manager.save(doctorContact);
            doctorInstance.contacts = [contact]
            doctorInstance.facility = facilityInfo
            doctorInstance.practiceId = savedPractice.id
            const savedDoctor = await getRepository(Doctor).save(doctorInstance)
            createdUser.userId = savedDoctor.id
          }
        } else {
          const staffExist = await getRepository(Staff).findOne({ email })
          if (!staffExist) {
            const staffInstance = await getRepository(Staff).create({ firstName, lastName, email, phone })
            staffInstance.user = createdUser
            staffInstance.facility = facilityInfo
            const savedStaff = await getRepository(Staff).save(staffInstance)
            createdUser.userId = savedStaff.id
          }
        }
      }))

      // await queryRunner.commitTransaction();
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }


  async rolePermissionPayload(permissions: Permission[], role: Role) {
    return permissions.map((item) => {
      return {
        permission: item,
        permissionId: item.id,
        role: role,
        roleId: role.id,
        isMutable: false
      }
    })
  }
  
}