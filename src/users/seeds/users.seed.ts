import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility } from "src/facilities/entities/facility.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { createPasswordHash } from '../../lib/helper';
import { Permission } from "../entities/permissions.entity";
import { Role } from '../entities/role.entity';
import { RolePermission } from "../entities/rolePermissions.entity";
import { User } from '../entities/user.entity';
import { doctorAssistantPermissionsList, doctorPermissionsList, emergencyAccessPermissionsList, facilityAdminPermissionsList, FacilityData, frontDeskPermissionsList, nursePermissionsList, officeManagerPermissionsList, patientPermissionsList, PermissionData, permissionDataNew, practiceAdminPermissionsList, practitionerNursePermissionsList, RolesData, staffPermissionsList, UsersData } from './seed-data';

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
        facility = getRepository(Facility).create(FacilityData)
        facility = await queryRunner.manager.save(facility);
      }
      //Add Roles
      let roles = await getRepository(Role).find();
      if (!roles.length) {
        roles = getRepository(Role).create(RolesData)
        roles = await queryRunner.manager.save(roles);
      }
        //Add Permissions
       let permissions = await getRepository(Permission).find();
       if (!permissions.length) {
         permissions = getRepository(Permission).create(PermissionData)
         permissions = await queryRunner.manager.save(permissions);
       }
       //---------
        //Add Permissions
        let permissionsNew = getRepository(Permission).create(permissionDataNew)
        permissionsNew = await queryRunner.manager.save(permissionsNew);
       //--------
       
      //Add superAdmin role Permissions
      let superAdminRole = roles.find((item)=> item.role === 'super-admin')
      let superAdminRolePermission = await getRepository(RolePermission).find({where: {role: superAdminRole.id}})
      if(!superAdminRolePermission.length){
      let superAdminPermissionList = permissions
      let superAdminRolePermissions = await this.rolePermissionPayload(superAdminPermissionList, superAdminRole)
      let superAdminRolePermissionsRes = getRepository(RolePermission).create(superAdminRolePermissions)
      superAdminRolePermissionsRes = await queryRunner.manager.save(superAdminRolePermissionsRes);
      }
      //-------------
      // let superAdminPermissionListNew = permissionsNew
      // let superAdminRolePermissionsNew = await this.rolePermissionPayload(superAdminPermissionListNew, superAdminRole)
      // let superAdminRolePermissionsResNew = getRepository(RolePermission).create(superAdminRolePermissionsNew)
      // superAdminRolePermissionsResNew = await queryRunner.manager.save(superAdminRolePermissionsResNew);
      //----------
      

      //Add practice admin role Permissions
      let practiceAdminRole = roles.find((item)=> item.role === 'practice-admin')
      let practiceAdminRolePermission =  await getRepository(RolePermission).find({where: {role: practiceAdminRole.id}});
      if(!practiceAdminRolePermission.length){
      let adminPermissionList = permissions.filter(x => practiceAdminPermissionsList.find(y => (y === x.name)));
      let adminRolePermissions = await this.rolePermissionPayload(adminPermissionList, practiceAdminRole)
      let adminRolePermissionsRes = getRepository(RolePermission).create(adminRolePermissions)
       adminRolePermissionsRes = await queryRunner.manager.save(adminRolePermissionsRes);
      }

      //-------------
      // let adminPermissionListNew = permissionsNew
      // let adminRolePermissionsNew = await this.rolePermissionPayload(adminPermissionListNew, practiceAdminRole)
      // let adminRolePermissionsResNew = getRepository(RolePermission).create(adminRolePermissionsNew)
      // adminRolePermissionsResNew = await queryRunner.manager.save(adminRolePermissionsResNew);
      //-------------


      //Add facility admin role Permissions 
      let facilityAdminRole = roles.find((item)=> item.role === 'facility-admin')
      let facilityAdminRolePermission =  await getRepository(RolePermission).find({where: {role: facilityAdminRole.id}});
      if(!facilityAdminRolePermission.length){
      let adminPermissionList = permissions.filter(x => facilityAdminPermissionsList.find(y => (y === x.name)));
      let adminRolePermissions = await this.rolePermissionPayload(adminPermissionList, facilityAdminRole)
      let adminRolePermissionsRes = getRepository(RolePermission).create(adminRolePermissions)
      adminRolePermissionsRes = await queryRunner.manager.save(adminRolePermissionsRes);
      }

      //----------------------
      // let facilityAdminPermissionList = permissionsNew
      // let facilityAdminRolePermissionsNew = await this.rolePermissionPayload(facilityAdminPermissionList, facilityAdminRole)
      // let facilityAdminRolePermissionsResNew = getRepository(RolePermission).create(facilityAdminRolePermissionsNew)
      // facilityAdminRolePermissionsResNew = await queryRunner.manager.save(facilityAdminRolePermissionsResNew);
      //----------------------

      //Add emergency access role Permissions
      let emergencyAccessRole = roles.find((item)=> item.role === 'emergency-access')
      let emergencyAccessRolePermission =  await getRepository(RolePermission).find({where: {role: emergencyAccessRole.id}});
      if(!emergencyAccessRolePermission.length){
      let emergencyAccessPermissionList = permissions.filter(x => emergencyAccessPermissionsList.find(y => (y === x.name)));
      let emergencyAccessRolePermissions = await this.rolePermissionPayload(emergencyAccessPermissionList, emergencyAccessRole)
      let emergencyAccessRolePermissionsRes = getRepository(RolePermission).create(emergencyAccessRolePermissions)
      emergencyAccessRolePermissionsRes = await queryRunner.manager.save(emergencyAccessRolePermissionsRes);
      }

      //--------------------
      // let emergencyAccessPermissionListNew = permissionsNew;
      // let emergencyAccessRolePermissionsNew = await this.rolePermissionPayload(emergencyAccessPermissionListNew, emergencyAccessRole)
      // let emergencyAccessRolePermissionsResNew = getRepository(RolePermission).create(emergencyAccessRolePermissionsNew)
      // emergencyAccessRolePermissionsResNew = await queryRunner.manager.save(emergencyAccessRolePermissionsResNew);
      //--------------------

      //Add doctor role Permissions
      let doctorRole = roles.find((item)=> item.role === 'doctor')
      let doctorRolePermission = await getRepository(RolePermission).find({where: {role: doctorRole.id}})
      if(!doctorRolePermission.length){
      let doctorPermissionList = permissions.filter(x => doctorPermissionsList.find(y => (y === x.name)));
      let doctorRolePermissions = await this.rolePermissionPayload(doctorPermissionList, doctorRole)
      let doctorRolePermissionsRes = getRepository(RolePermission).create(doctorRolePermissions)
      doctorRolePermissionsRes = await queryRunner.manager.save(doctorRolePermissionsRes);
      }

      //----------------------
      // let doctorPermissionListNew = permissionsNew
      // let doctorRolePermissionsNew = await this.rolePermissionPayload(doctorPermissionListNew, doctorRole)
      // let doctorRolePermissionsResNew = getRepository(RolePermission).create(doctorRolePermissionsNew)
      // doctorRolePermissionsResNew = await queryRunner.manager.save(doctorRolePermissionsResNew);
      //----------------------


      //Add nurse role Permissions
      let nurseRole = roles.find((item)=> item.role === 'nurse')
      let nurseRolePermission = await getRepository(RolePermission).find({where: {role: nurseRole.id}})
      if(!nurseRolePermission.length){
      let nursePermissionList = permissions.filter(x => nursePermissionsList.find(y => (y === x.name)));
      let nurseRolePermissions = await this.rolePermissionPayload(nursePermissionList, nurseRole)
      let nurseRolePermissionsRes = getRepository(RolePermission).create(nurseRolePermissions)
      nurseRolePermissionsRes = await queryRunner.manager.save(nurseRolePermissionsRes);
      }

      //Add patient role Permissions
      let patientRole = roles.find((item)=> item.role === 'patient')
      let patientRolePermission = await getRepository(RolePermission).find({where: {role: patientRole.id}})
      if(!patientRolePermission.length){
      let patientRolePermissionList = permissions.filter(x => patientPermissionsList.find(y => (y === x.name)));
      let patientRolePermissions = await this.rolePermissionPayload(patientRolePermissionList, patientRole)
      let patientRolePermissionsRes = getRepository(RolePermission).create(patientRolePermissions)
      patientRolePermissionsRes = await queryRunner.manager.save(patientRolePermissionsRes);
      }

      //Add staff role Permissions
      let staffRole = roles.find((item)=> item.role === 'staff')
      let staffRolePermission = await getRepository(RolePermission).find({where: {role: staffRole.id}})
      if(!staffRolePermission.length){
      let staffRolePermissionList = permissions.filter(x => staffPermissionsList.find(y => (y === x.name)));  
      let staffRolePermissions = await this.rolePermissionPayload(staffRolePermissionList, staffRole)
      let staffRolePermissionsRes = getRepository(RolePermission).create(staffRolePermissions)
      staffRolePermissionsRes = await queryRunner.manager.save(staffRolePermissionsRes);
      }

      //Add nursePractitioner role Permissions
      let nursePractitionerRole = roles.find((item)=> item.role === 'nurse-practitioner')
      let nursePractitionerRolePermission = await getRepository(RolePermission).find({where: {role: nursePractitionerRole.id}})
      if(!nursePractitionerRolePermission.length){
      let nursePractitionerRolePermissionList = permissions.filter(x => practitionerNursePermissionsList.find(y => (y === x.name)));  
      let nursePractitionerRolePermissions = await this.rolePermissionPayload(nursePractitionerRolePermissionList, nursePractitionerRole)
      let nursePractitionerRolePermissionsRes = getRepository(RolePermission).create(nursePractitionerRolePermissions)
      nursePractitionerRolePermissionsRes = await queryRunner.manager.save(nursePractitionerRolePermissionsRes);
      }

      //------------------------
      // let nursePractitionerRolePermissionListNew = permissionsNew  
      // let nursePractitionerRolePermissionsNew = await this.rolePermissionPayload(nursePractitionerRolePermissionListNew, nursePractitionerRole)
      // let nursePractitionerRolePermissionsResNew = getRepository(RolePermission).create(nursePractitionerRolePermissionsNew)
      // nursePractitionerRolePermissionsResNew = await queryRunner.manager.save(nursePractitionerRolePermissionsResNew);
      //------------------------
      
      //Add office manager role Permissions
      let officeManagerRole = roles.find((item)=> item.role === 'office-manager')
      let officeManagerRolePermission = await getRepository(RolePermission).find({where: {role: officeManagerRole.id}})
      if(!officeManagerRolePermission.length){
      let officeManagerRolePermissionList =  permissions.filter(x => officeManagerPermissionsList.find(y => (y === x.name)));    
      let officeManagerRolePermissions = await this.rolePermissionPayload(officeManagerRolePermissionList, officeManagerRole)
      let officeManagerRolePermissionsRes = getRepository(RolePermission).create(officeManagerRolePermissions)
      officeManagerRolePermissionsRes = await queryRunner.manager.save(officeManagerRolePermissionsRes);
      }

      //----------------------
      // let officeManagerRolePermissionListNew = permissionsNew   
      // let officeManagerRolePermissionsNew = await this.rolePermissionPayload(officeManagerRolePermissionListNew, officeManagerRole)
      // let officeManagerRolePermissionsResNew = getRepository(RolePermission).create(officeManagerRolePermissionsNew)
      // officeManagerRolePermissionsResNew = await queryRunner.manager.save(officeManagerRolePermissionsResNew);
      //----------------------


      //Add office doctor assistant Permissions
      let doctorAssistantRole = roles.find((item)=> item.role === 'doctor-assistant')
      let doctorAssistantRolePermission = await getRepository(RolePermission).find({where: {role: doctorAssistantRole.id}})
      if(!doctorAssistantRolePermission.length){
      let doctorAssistantRolePermissionList =  permissions.filter(x => doctorAssistantPermissionsList.find(y => (y === x.name)));  
      let doctorAssistantRolePermissions = await this.rolePermissionPayload(doctorAssistantRolePermissionList, doctorAssistantRole)
      let doctorAssistantRolePermissionsRes = getRepository(RolePermission).create(doctorAssistantRolePermissions)
      doctorAssistantRolePermissionsRes = await queryRunner.manager.save(doctorAssistantRolePermissionsRes);
      }

      //--------------------
      // let doctorAssistantRolePermissionListNew = permissionsNew  
      // let doctorAssistantRolePermissionsNew = await this.rolePermissionPayload(doctorAssistantRolePermissionListNew, doctorAssistantRole)
      // let doctorAssistantRolePermissionsResNew = getRepository(RolePermission).create(doctorAssistantRolePermissionsNew)
      // doctorAssistantRolePermissionsResNew = await queryRunner.manager.save(doctorAssistantRolePermissionsResNew);
      //--------------------
      
      //Add front-desk assistant Permissions 
      let frontDeskRole = roles.find((item)=> item.role === 'front-desk')
      let frontDeskRolePermission = await getRepository(RolePermission).find({where: {role: frontDeskRole.id}})
      if(!frontDeskRolePermission.length){
      let frontDeskRolePermissionList =  permissions.filter(x => frontDeskPermissionsList.find(y => (y === x.name)));  
      let frontDeskRolePermissions = await this.rolePermissionPayload(frontDeskRolePermissionList, frontDeskRole)
      let frontDeskRolePermissionsPermissionsRes = getRepository(RolePermission).create(frontDeskRolePermissions)
      frontDeskRolePermissionsPermissionsRes = await queryRunner.manager.save(frontDeskRolePermissionsPermissionsRes);
      }

      //--------------------
      // let frontDeskRolePermissionListNew = permissionsNew
      // let frontDeskRolePermissionsNew = await this.rolePermissionPayload(frontDeskRolePermissionListNew, frontDeskRole)
      // let frontDeskRolePermissionsPermissionsResNew = getRepository(RolePermission).create(frontDeskRolePermissionsNew)
      // frontDeskRolePermissionsPermissionsResNew = await queryRunner.manager.save(frontDeskRolePermissionsPermissionsResNew);
      //--------------------
      
      //Add Users
      const users = await getRepository(User).find();
      if (!users.length) {
        for (let index = 0; index < UsersData.length; index++) {
          const user = UsersData[index];
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
  async rolePermissionPayload(permissions: Permission[], role: Role){
    return permissions.map((item)=>{
      return {
        permission:item,
        permissionId: item.id,
        role: role,
        roleId: role.id,
        isMutable: false
      }
    })
   }
}