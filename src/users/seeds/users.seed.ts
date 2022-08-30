import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility } from "src/facilities/entities/facility.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//entities
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Permission } from "../entities/permissions.entity";
import { RolePermission } from "../entities/rolePermissions.entity";
//helper
import { createPasswordHash } from '../../lib/helper';
//seed data
import {
  doctorAssistantPermissionsList, doctorPermissionsList, emergencyAccessPermissionsList, facilityAdminPermissionsList,
  FacilityData, frontDeskPermissionsList, nursePermissionsList, officeManagerPermissionsList as officeManagerPermissionsList1,
  patientPermissionsList, PermissionData, practiceAdminPermissionsList, practitionerNursePermissionsList,
  RolesData, staffPermissionsList, UsersData
} from './seed-data';


@Injectable()
export class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
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

      await queryRunner.commitTransaction();
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