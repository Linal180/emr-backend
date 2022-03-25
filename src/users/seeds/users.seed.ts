import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility } from "src/facilities/entities/facility.entity";
import { Connection, getRepository, In } from "typeorm";
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
      let superAdminRole = await getRepository(Role).findOne({where: {role: 'super-admin'}});
      let superAdminRolePermission = await getRepository(RolePermission).find({where: {role: superAdminRole.id}})
      if(!superAdminRolePermission.length){
      let superAdminPermissionList = await getRepository(Permission).find()
      let superAdminRolePermissions = await this.rolePermissionPayload(superAdminPermissionList, superAdminRole)
      let superAdminRolePermissionsRes = getRepository(RolePermission).create(superAdminRolePermissions)
      superAdminRolePermissionsRes = await queryRunner.manager.save(superAdminRolePermissionsRes);
      }

      //Add admin role Permissions
      let adminRole = await getRepository(Role).findOne({where: {role: 'admin'}});
      let adminRolePermission = await getRepository(RolePermission).find({where: {role: adminRole.id}})
      if(!adminRolePermission.length){
      let adminPermissionList = await getRepository(Permission).find({
          where: {
             name: In(['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
            'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','updatePatientProvider','findAllPatient','getPatient','createPractice',
            'updatePractice','getPractice','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
        console.log("adminPermissionList",adminPermissionList);
      let adminRolePermissions = await this.rolePermissionPayload(adminPermissionList, adminRole)
      let adminRolePermissionsRes = getRepository(RolePermission).create(adminRolePermissions)
      adminRolePermissionsRes = await queryRunner.manager.save(adminRolePermissionsRes);
      }

      //Add doctor role Permissions
      let doctorRole = await getRepository(Role).findOne({where: {role: 'doctor'}});
      let doctorRolePermission = await getRepository(RolePermission).find({where: {role: doctorRole.id}})
      if(!doctorRolePermission.length){
      let doctorPermissionList = await getRepository(Permission).find({
          where: {
             name: In(['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
            'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
      let doctorRolePermissions = await this.rolePermissionPayload(doctorPermissionList, doctorRole)
      let doctorRolePermissionsRes = getRepository(RolePermission).create(doctorRolePermissions)
      doctorRolePermissionsRes = await queryRunner.manager.save(doctorRolePermissionsRes);
      }

      //Add nurse role Permissions
      let nurseRole = await getRepository(Role).findOne({where: {role: 'nurse'}});
      let nurseRolePermission = await getRepository(RolePermission).find({where: {role: nurseRole.id}})
      if(!nurseRolePermission.length){
      let nursePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
      let nurseRolePermissions = await this.rolePermissionPayload(nursePermissionList, nurseRole)
      let nurseRolePermissionsRes = getRepository(RolePermission).create(nurseRolePermissions)
      nurseRolePermissionsRes = await queryRunner.manager.save(nurseRolePermissionsRes);
      }

      //Add patient role Permissions
      let patientRole = await getRepository(Role).findOne({where: {role: 'patient'}});
      let patientRolePermission = await getRepository(RolePermission).find({where: {role: patientRole.id}})
      if(!patientRolePermission.length){
      let patientRolePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
            'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
            'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
            'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
            'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
      let patientRolePermissions = await this.rolePermissionPayload(patientRolePermissionList, patientRole)
      let patientRolePermissionsRes = getRepository(RolePermission).create(patientRolePermissions)
      patientRolePermissionsRes = await queryRunner.manager.save(patientRolePermissionsRes);
      }

      //Add staff role Permissions
      let staffRole = await getRepository(Role).findOne({where: {role: 'staff'}});
      let staffRolePermission = await getRepository(RolePermission).find({where: {role: staffRole.id}})
      if(!staffRolePermission.length){
      let staffRolePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['createPatient','updatePatient','patientInfo','updatePatientProfile',
             'findAllPatient','getPatient','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule',
             'getDoctorSlots','findAllDoctor','getDoctor'])
         }
        })
      let staffRolePermissions = await this.rolePermissionPayload(staffRolePermissionList, staffRole)
      let staffRolePermissionsRes = getRepository(RolePermission).create(staffRolePermissions)
      staffRolePermissionsRes = await queryRunner.manager.save(staffRolePermissionsRes);
      }

      //Add nursePractitioner role Permissions
      let nursePractitionerRole = await getRepository(Role).findOne({where: {role: 'nurse_practitioner'}});
      let nursePractitionerRolePermission = await getRepository(RolePermission).find({where: {role: nursePractitionerRole.id}})
      if(!nursePractitionerRolePermission.length){
      let nursePractitionerRolePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
      let nursePractitionerRolePermissions = await this.rolePermissionPayload(nursePractitionerRolePermissionList, nursePractitionerRole)
      let nursePractitionerRolePermissionsRes = getRepository(RolePermission).create(nursePractitionerRolePermissions)
      nursePractitionerRolePermissionsRes = await queryRunner.manager.save(nursePractitionerRolePermissionsRes);
      }
      
      //Add office manager role Permissions
      let officeManagerRole = await getRepository(Role).findOne({where: {role: 'office_manager'}});
      let officeManagerRolePermission = await getRepository(RolePermission).find({where: {role: officeManagerRole.id}})
      if(!officeManagerRolePermission.length){
      let officeManagerRolePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff'])
         }
        })
      let officeManagerRolePermissions = await this.rolePermissionPayload(officeManagerRolePermissionList, officeManagerRole)
      let officeManagerRolePermissionsRes = getRepository(RolePermission).create(officeManagerRolePermissions)
      officeManagerRolePermissionsRes = await queryRunner.manager.save(officeManagerRolePermissionsRes);
      }

      //Add office doctor assistant Permissions
      let doctorAssistantRole = await getRepository(Role).findOne({where: {role: 'doctor_assistant'}});
      let doctorAssistantRolePermission = await getRepository(RolePermission).find({where: {role: doctorAssistantRole.id}})
      if(!doctorAssistantRolePermission.length){
      let doctorAssistantRolePermissionList = await getRepository(Permission).find({
          where: {
             name: In(['fetchAllUsers','fetchUser','getUser','searchUser','forgotPassword','deactivateUser','updateUser','updateRole','createRole',
             'updateRole','getAllRoles','getRole','createAppointment','createExternalAppointment','updateAppointment','updateAppointmentBillingStatus',
             'findAllAppointments','getAppointment','getDoctorAppointment','cancelAppointment','removeAppointment','getPatientAppointment','createFacility','updateFacility',
             'updateFacilityTimeZone','findAllFacility','getFacility','createService','updateService','findAllServices','getService','createPatient',
             'updatePatient','patientInfo','updatePatientProfile','sendInviteToPatient','findAllPatient','getPatient','createDoctor','updateDoctor','findAllDoctor','getDoctor','removeDoctor','disableDoctor','createStaff','updateStaff',
             'findAllStaff','getStaff','removeStaff','disableStaff','createSchedule','updateSchedule','findAllSchedules','getDoctorSchedule','getDoctorSlots','removeSchedule'])
         }
        })
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