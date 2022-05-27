import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from '../auth/role.guard';
import RoleInput, { GetRole, RemoveRole, RoleItemInput, UpdateRoleItemInput } from '../dto/role-input.dto';
import RolesPayload, { RolePayload } from '../dto/roles-payload.dto';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/rolePermissions.entity';
import { User } from '../entities/user.entity';
import { PermissionsService } from '../services/permissions.service';
import { RolesService } from '../services/roles.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly rolesService: RolesService,private readonly permissionsService: PermissionsService) { }

  @Mutation(() => RolePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createRole')
  async createRole(@Args('roleItemInput') roleItemInput: RoleItemInput) {
    return {
      role: await this.rolesService.createRole(roleItemInput),
      response: { status: 200, message: 'Role created successfully' }
    };
  }
  
  @Mutation(() => RolePayload)
  @UseGuards(JwtAuthGraphQLGuard,PermissionGuard)
  async updateRole(@Args('updateRoleItemInput') updateRoleItemInput: UpdateRoleItemInput) {
    return {
      role: await this.rolesService.updateRole(updateRoleItemInput),
      response: { status: 200, message: 'Role updated successfully' }
    };
  }

  @Query(returns => RolesPayload)
  @UseGuards(JwtAuthGraphQLGuard,PermissionGuard)
  @SetMetadata('name', 'getAllRoles')
  async getAllRoles(@Args('roleInput') roleInput: RoleInput): Promise<RolesPayload> {
    const roles = await this.rolesService.findAllRole(roleInput)
    if (roles) {
      return {
        ...roles,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Roles not found',
    });
  }

  @Query(returns => RolePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getRole')
  async getRole(@Args('getRole') getRole: GetRole): Promise<RolePayload> {
    const role = await this.rolesService.getRole(getRole.id)
    return {
      ...role,
      response: { status: 200, message: 'Role fetched successfully' }
    };
  }

  @Mutation(() => RolePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeRole')
  async removeRole(@Args('removeRole') removeRole: RemoveRole) {
    await this.rolesService.removeRole(removeRole);
    return { response: { status: 200, message: 'Role Deleted' } };
  }

  @ResolveField((returns) => [RolePermission])
  async rolePermissions(@Parent() role: Role):  Promise<RolePermission[]>  {
    // console.log("role in resolveField", role)
    const rolePermissions=await this.permissionsService.findPermissionsByRoleId(role.id)
    // console.log('rolePermisssdsdsd', rolePermissions)
    return rolePermissions
  }
}
