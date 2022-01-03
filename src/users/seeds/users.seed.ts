import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Role } from '../entities/role.entity'
import { User } from '../entities/user.entity'
import { RolesData, UsersData } from './seed-data'
import { createPasswordHash } from '../../lib/helper';
import { UserToRole } from "../entities/user-role.entity";

@Injectable()
export class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
          let UserObj = getRepository(User).create(user)
          const role = roles.filter(obj => obj.role === user.roleType);
          UserObj.userType = role[0].role
          UserObj = await getRepository(User).save(UserObj)
          //add userRole 
          const userRoleObj = {
            user: UserObj,
            role: role[0],
            AssignedById: UserObj
          }
          let userRole = getRepository(UserToRole).create(userRoleObj)
          await queryRunner.manager.save(userRole);
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