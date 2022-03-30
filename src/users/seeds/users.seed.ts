import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility } from "src/facilities/entities/facility.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { createPasswordHash } from '../../lib/helper';
import { Permission } from "../entities/permissions.entity";
import { Role } from '../entities/role.entity';
import { RolePermission } from "../entities/rolePermissions.entity";
import { User } from '../entities/user.entity';
import { FacilityData, PermissionData, RolesData, UsersData } from './seed-data';

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
      //Add superAdmin role Permissions
      let superAdminRole = roles.find((item)=> item.role === 'super-admin')
      let superAdminRolePermission = await getRepository(RolePermission).find({where: {role: superAdminRole.id}})
      if(!superAdminRolePermission.length){
      let superAdminPermissionList = permissions
      let superAdminRolePermissions = await this.rolePermissionPayload(superAdminPermissionList, superAdminRole)
      let superAdminRolePermissionsRes = getRepository(RolePermission).create(superAdminRolePermissions)
      superAdminRolePermissionsRes = await queryRunner.manager.save(superAdminRolePermissionsRes);
      }

      //Add admin role Permissions
      let adminRole = roles.find((item)=> item.role === 'admin')
      let adminRolePermission =  await getRepository(RolePermission).find({where: {role: adminRole.id}});
      if(!adminRolePermission.length){
      let adminPermissionSet =  ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
      'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
      'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
      'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
      'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','updatePatientProvider','findAllPatient','getPatient','createPractice',
      'updatePractice','getPractice','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
      'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let adminPermissionList = permissions.filter(x => adminPermissionSet.find(y => (y === x.name)));
      let adminRolePermissions = await this.rolePermissionPayload(adminPermissionList, adminRole)
      let adminRolePermissionsRes = getRepository(RolePermission).create(adminRolePermissions)
      adminRolePermissionsRes = await queryRunner.manager.save(adminRolePermissionsRes);
      }
      //Add doctor role Permissions
      let doctorRole = roles.find((item)=> item.role === 'doctor')
      let doctorRolePermission = await getRepository(RolePermission).find({where: {role: doctorRole.id}})
      if(!doctorRolePermission.length){
      let doctorPermissionSet = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
            'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let doctorPermissionList = permissions.filter(x => doctorPermissionSet.find(y => (y === x.name)));
      let doctorRolePermissions = await this.rolePermissionPayload(doctorPermissionList, doctorRole)
      let doctorRolePermissionsRes = getRepository(RolePermission).create(doctorRolePermissions)
      doctorRolePermissionsRes = await queryRunner.manager.save(doctorRolePermissionsRes);
      }

      //Add nurse role Permissions
      let nurseRole = roles.find((item)=> item.role === 'nurse')
      let nurseRolePermission = await getRepository(RolePermission).find({where: {role: nurseRole.id}})
      if(!nurseRolePermission.length){
      let nursePermissionSet = ['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let nursePermissionList = permissions.filter(x => nursePermissionSet.find(y => (y === x.name)));
      let nurseRolePermissions = await this.rolePermissionPayload(nursePermissionList, nurseRole)
      let nurseRolePermissionsRes = getRepository(RolePermission).create(nurseRolePermissions)
      nurseRolePermissionsRes = await queryRunner.manager.save(nurseRolePermissionsRes);
      }

      //Add patient role Permissions
      let patientRole = roles.find((item)=> item.role === 'patient')
      let patientRolePermission = await getRepository(RolePermission).find({where: {role: patientRole.id}})
      if(!patientRolePermission.length){
      let patientRolePermissionSet = ['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let patientRolePermissionList = permissions.filter(x => patientRolePermissionSet.find(y => (y === x.name)));
      let patientRolePermissions = await this.rolePermissionPayload(patientRolePermissionList, patientRole)
      let patientRolePermissionsRes = getRepository(RolePermission).create(patientRolePermissions)
      patientRolePermissionsRes = await queryRunner.manager.save(patientRolePermissionsRes);
      }

      //Add staff role Permissions
      let staffRole = roles.find((item)=> item.role === 'staff')
      let staffRolePermission = await getRepository(RolePermission).find({where: {role: staffRole.id}})
      if(!staffRolePermission.length){
      let staffRolePermissionSet = ['createPatient','updatePatient','patientInfo','updatePatientProfile',
             'findAllPatient','getPatient','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule',
             'getDoctorSlots','findAllDoctor','getDoctor']
      let staffRolePermissionList = permissions.filter(x => staffRolePermissionSet.find(y => (y === x.name)));  
      console.log("staffRolePermissionList",staffRolePermissionList);
      let staffRolePermissions = await this.rolePermissionPayload(staffRolePermissionList, staffRole)
      let staffRolePermissionsRes = getRepository(RolePermission).create(staffRolePermissions)
      staffRolePermissionsRes = await queryRunner.manager.save(staffRolePermissionsRes);
      }

      //Add nursePractitioner role Permissions
      let nursePractitionerRole = roles.find((item)=> item.role === 'nurse_practitioner')
      let nursePractitionerRolePermission = await getRepository(RolePermission).find({where: {role: nursePractitionerRole.id}})
      if(!nursePractitionerRolePermission.length){
      let nursePractitionerRolePermissionSet = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let nursePractitionerRolePermissionList = permissions.filter(x => nursePractitionerRolePermissionSet.find(y => (y === x.name)));  
      let nursePractitionerRolePermissions = await this.rolePermissionPayload(nursePractitionerRolePermissionList, nursePractitionerRole)
      let nursePractitionerRolePermissionsRes = getRepository(RolePermission).create(nursePractitionerRolePermissions)
      nursePractitionerRolePermissionsRes = await queryRunner.manager.save(nursePractitionerRolePermissionsRes);
      }
      
      //Add office manager role Permissions
      let officeManagerRole = roles.find((item)=> item.role === 'office_manager')
      let officeManagerRolePermission = await getRepository(RolePermission).find({where: {role: officeManagerRole.id}})
      if(!officeManagerRolePermission.length){
      let officeManagerRolePermissionSet = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff']
      let officeManagerRolePermissionList =  permissions.filter(x => officeManagerRolePermissionSet.find(y => (y === x.name)));    
      let officeManagerRolePermissions = await this.rolePermissionPayload(officeManagerRolePermissionList, officeManagerRole)
      let officeManagerRolePermissionsRes = getRepository(RolePermission).create(officeManagerRolePermissions)
      officeManagerRolePermissionsRes = await queryRunner.manager.save(officeManagerRolePermissionsRes);
      }

      //Add office doctor assistant Permissions
      let doctorAssistantRole = roles.find((item)=> item.role === 'doctor_assistant')
      let doctorAssistantRolePermission = await getRepository(RolePermission).find({where: {role: doctorAssistantRole.id}})
      if(!doctorAssistantRolePermission.length){
      let doctorAssistantRolePermissionSet = ['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule']
      let doctorAssistantRolePermissionList =  permissions.filter(x => doctorAssistantRolePermissionSet.find(y => (y === x.name)));  
      let doctorAssistantRolePermissions = await this.rolePermissionPayload(doctorAssistantRolePermissionList, doctorAssistantRole)
      let doctorAssistantRolePermissionsRes = getRepository(RolePermission).create(doctorAssistantRolePermissions)
      doctorAssistantRolePermissionsRes = await queryRunner.manager.save(doctorAssistantRolePermissionsRes);
      }
      
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
          const newuserObj = await queryRunner.manager.save(UserObj);
          UserObj.userId = newuserObj.id
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