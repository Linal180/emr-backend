import {
  CanActivate,
  ExecutionContext, Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@Injectable()
export default class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const apiName = this.reflector.get<string>('name', context.getHandler());
    if (!apiName) {
      return true;
    }
    const user = ctx.user;
    return this.matchRoles(apiName, user.roles);
  }

  matchRoles(apiName: string, userRoles: Role[]): boolean {
    const permissions =  userRoles.map((role) => role?.rolePermissions.map((item)=> item?.permission))
    const permissionsFlat = permissions.flat()
    const flag =  permissionsFlat.find((item)=> item.name === apiName)
    return flag ? true : false
  }
}
