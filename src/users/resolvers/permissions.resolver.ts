import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from '../auth/role.guard';
import PermissionInput, { GetPermission, PermissionItemInput, RemovePermission, UpdatePermissionItemInput } from '../dto/permission-input.dto';
import PermissionsPayload, { PermissionPayload } from '../dto/permissions-payload.dto';
import { RolePermissionItemInput } from '../dto/rolepermission-input.dto';
import { Permission } from '../entities/permissions.entity';
import { PermissionsService } from '../services/permissions.service';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Mutation(() => PermissionPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createPermission')
  async createPermission(@Args('permissionItemInput') permissionItemInput: PermissionItemInput) {
    return {
      permission: await this.permissionsService.createPermission(permissionItemInput),
      response: { status: 200, message: 'Permission created successfully' }
    };
  }

  @Mutation(() => PermissionPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'assignPermissionToRole')
  async assignPermissionToRole(@Args('rolePermissionItemInput') rolePermissionItemInput: RolePermissionItemInput) {
    return {
      permission: await this.permissionsService.assignPermissionToRole(rolePermissionItemInput),
      response: { status: 200, message: 'Permission has been assigned to role successfully' }
    };
  }
  
  @Mutation(() => PermissionPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePermission')
  async updatePermission(@Args('updatePermissionItemInput') updatePermissionItemInput: UpdatePermissionItemInput) {
    return {
      permission: await this.permissionsService.updatePermission(updatePermissionItemInput),
      response: { status: 200, message: 'Permission updated successfully' }
    };
  }

  @Query(returns => PermissionsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPermissions')
  async findAllPermissions(@Args('permissionInput') permissionInput: PermissionInput): Promise<PermissionsPayload> {
    const permissions = await this.permissionsService.findAllPermissions(permissionInput)
    if (permissions) {
      return {
        ...permissions,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Permissions not found',
    });
  }

  @Query(returns => PermissionPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'GetPermission')
  async GetPermission(@Args('getPermission') getPermission: GetPermission): Promise<PermissionPayload> {
    const permission = await this.permissionsService.GetPermission(getPermission.id)
    return {
      ...permission,
      response: { status: 200, message: 'Permission fetched successfully' }
    };
  }

  @Mutation(() => PermissionPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePermission')
  async removePermission(@Args('removePermission') removePermission: RemovePermission) {
    await this.permissionsService.removePermission(removePermission);
    return { response: { status: 200, message: 'Role Deleted' } };
  }
}
