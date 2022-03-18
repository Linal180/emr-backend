import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Facility } from "src/facilities/entities/facility.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { createPasswordHash } from '../../lib/helper';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { FacilityData, RolesData, UsersData } from './seed-data';

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

      // let officeManager = await getRepository(Role).findOne({role: UserRole.OFFICE_MANAGER})
      // if(!officeManager){
      //   const officeManagerInstance = getRepository(Role).create({role: UserRole.OFFICE_MANAGER})
      //   await queryRunner.manager.save(officeManagerInstance);
      // }
      // let nursePractitioner = await getRepository(Role).findOne({role: UserRole.NURSE_PRACTITIONER})
      // if(!nursePractitioner){
      //   const nursePractitionerInstance = getRepository(Role).create({role: UserRole.NURSE_PRACTITIONER})
      //   await queryRunner.manager.save(nursePractitionerInstance);
      // }
      // let doctorAssistant = await getRepository(Role).findOne({role: UserRole.DOCTOR_ASSISTANT})
      // if(!doctorAssistant){
      //   const doctorAssistantInstance = getRepository(Role).create({role: UserRole.DOCTOR_ASSISTANT})
      //   await queryRunner.manager.save(doctorAssistantInstance);
      // }
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
}