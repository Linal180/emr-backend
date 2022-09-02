import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import {
  ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException
} from '@nestjs/common';
//entities
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';
import { Permission } from '../entities/permissions.entity';
import { RolePermission } from '../entities/rolePermissions.entity';
//services
import { UtilsService } from 'src/util/utils.service';
import { PaginationService } from 'src/pagination/pagination.service';
//inputs, dto's
import { RolePermissionItemInput } from '../dto/rolepermission-input.dto';
import PermissionsPayload, { PermissionPayload } from '../dto/permissions-payload.dto';
import {
  PermissionInput, PermissionItemInput, RemovePermission, UpdatePermissionItemInput
} from '../dto/permission-input.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly rolesService: RolesService,
  ) { }

  /**
   * Creates permission
   * @param permissionItemInput 
   * @returns permission 
   */
  async createPermission(permissionItemInput: PermissionItemInput): Promise<Permission> {
    try {
      //check name of permission for existing one
      const permission = await this.permissionsRepository.findOne({ name: permissionItemInput.name.trim().toLowerCase() })
      if (permission) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'Permission already exists with this name',
        });
      }
      // creating permission
      const permissionInstance = this.permissionsRepository.create({ ...permissionItemInput, name: permissionItemInput.name.trim().toLowerCase() })
      //saving permission
      return await this.permissionsRepository.save(permissionInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Assigns permission to role
   * @param rolePermissionItemInput 
   */
  async assignPermissionToRole(rolePermissionItemInput: RolePermissionItemInput) {
    try {
      await this.deleteExistingMutablePermission(rolePermissionItemInput.roleId)
      //check name of permission for existing one
      const permissions = await this.findPermissions(rolePermissionItemInput.permissionsId)
      //check name of role for existing one
      const role = await this.rolesService.findOne(rolePermissionItemInput.roleId)
      if (!role) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Role not found',
        });
      }
      const rolePermissionPayload = await this.rolePermissionPayload(permissions, role)
      //creating role permission
      const rolePermissionInstance = await this.rolePermissionRepository.create(rolePermissionPayload)
      await this.rolePermissionRepository.save(rolePermissionInstance)
      return
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deletes existing mutable permission
   * @param roleId 
   * @returns  
   */
  async deleteExistingMutablePermission(roleId: string) {
    return await getConnection().createQueryBuilder()
      .delete().from(RolePermission)
      .where("roleId = :roleId", { roleId: roleId })
      // .andWhere("isMutable = :isMutable", { isMutable: true })
      .execute();
  }

  /**
   * Finds permissions
   * @param ids 
   * @returns  
   */
  async findPermissions(ids: string[]) {
    return await this.permissionsRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  /**
   * find role permissions
   * @param roleId
   * @returns  permissions
   */
  async findPermissionsByRoleId(id: string) {
    try {
      return await this.rolePermissionRepository.find({
        where: {
          role: {
            id
          }
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Roles permission payload
   * @param permissions 
   * @param role 
   * @returns  
   */
  async rolePermissionPayload(permissions: Permission[], role: Role) {
    return permissions.map((item) => {
      return {
        permission: item,
        permissionId: item.id,
        role: role,
        roleId: role.id
      }
    })
  }

  /**
   * Updates permission
   * @param updatePermissionItemInput 
   * @returns permission 
   */
  async updatePermission(updatePermissionItemInput: UpdatePermissionItemInput): Promise<Permission> {
    try {
      //check name of role for existing one
      const permission = await this.permissionsRepository.findOne({ name: updatePermissionItemInput.name.trim().toLowerCase() })
      if (permission && permission.id != updatePermissionItemInput.id) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'Permission already exists with this name',
        });
      }
      return await this.utilsService.updateEntityManager(Permission, updatePermissionItemInput.id, updatePermissionItemInput, this.permissionsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all permissions
   * @param permissionInput 
   * @returns all permissions 
   */
  async findAllPermissions(permissionInput: PermissionInput): Promise<PermissionsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Permission>(this.permissionsRepository, permissionInput)
      return {
        pagination: {
          ...paginationResponse
        },
        permissions: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Permission> {
    return await this.permissionsRepository.findOne(id);
  }

  /**
   * Gets permission
   * @param id 
   * @returns permission 
   */
  async GetPermission(id: string): Promise<PermissionPayload> {
    const permission = await this.findOne(id);
    if (permission) {
      return { permission }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Permission not found',
    });
  }

  /**
   * Removes permission
   * @param { id } 
   */
  async removePermission({ id }: RemovePermission) {
    try {
      await this.permissionsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
