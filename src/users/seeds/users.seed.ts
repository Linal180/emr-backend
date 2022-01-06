import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Role } from '../entities/role.entity'
import { User } from '../entities/user.entity'
import { RolesData, UsersData, FacilityData } from './seed-data'
import { createPasswordHash } from '../../lib/helper';
import { Facility } from "src/facilities/entities/facility.entity";

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