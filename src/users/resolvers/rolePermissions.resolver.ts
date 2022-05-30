import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Permission } from '../entities/permissions.entity';
import { RolePermission } from '../entities/rolePermissions.entity';
import { PermissionsService } from '../services/permissions.service';
import { RolesService } from '../services/roles.service';

@Resolver(() => RolePermission)
export class RolePermissionResolver {
  constructor(private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService) { }

  @ResolveField((returns) => [Permission])
  async permission(@Parent() rolePermission: RolePermission)  {
    return await this.permissionsService.findOne(rolePermission.permissionId)
  }

  @ResolveField((returns) => [Permission])
  async role(@Parent() rolePermission: RolePermission)  {
    return await this.rolesService.findOne(rolePermission.roleId)
  }
}
