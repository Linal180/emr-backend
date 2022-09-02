import {
  CanActivate,
  ExecutionContext, Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/rolePermissions.entity';

@Injectable()
export default class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const apiName = this.reflector.get<string>('name', context.getHandler());
    if (!apiName) {
      return true;
    }
    const user = ctx.user;
    const { roles } = user || {}
    const transformedRoles = await Promise.all(roles.map(async (role) => {
      const rolePermissions = await getRepository(RolePermission).find({ where: { roleId: role?.id } });
      return {
        ...role,
        rolePermissions
      }
    }))
    return this.matchRoles(apiName, transformedRoles);
  }

  matchRoles(apiName: string, userRoles: Role[]): boolean {
    const permissions = userRoles.map((role) => role?.rolePermissions.map((item) => item?.permission))
    const permissionsFlat = permissions.flat()
    const flag = permissionsFlat.find((item) => item.name === apiName)
    return flag ? true : false
  }
}
