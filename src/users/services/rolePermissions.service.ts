import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
//entities
import { RolePermission } from "../entities/rolePermissions.entity";
import { CreateRolePermissionInput } from "../dto/rolepermission-input.dto";
import { RolePermissionRelationsType } from "src/lib/constants";

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) { }

  /**
   * Finds one by role id
   * @param roleId 
   * @param [relations] 
   * @returns one by role id 
   */
  async findOneByRoleId(roleId: string, relations?: [RolePermissionRelationsType]): Promise<RolePermission> {
    return await this.rolePermissionRepository.findOne({ roleId, ...(relations && { relations }) })
  }

  /**
   * Finds by role id
   * @param roleId 
   * @param [relations] 
   * @returns by role id 
   */
  async findByRoleId(roleId: string, relations?: [RolePermissionRelationsType]): Promise<RolePermission[]> {
    return await this.rolePermissionRepository.find({ roleId, ...(relations && { relations }) })
  }

  /**
   * Creates role permissions
   * @param params 
   * @returns role permissions 
   */
  async createRolePermissions(params: CreateRolePermissionInput[]): Promise<RolePermission[]> {
    try {
      const rolePermissions = this.rolePermissionRepository.create(params);
      return await this.rolePermissionRepository.save(rolePermissions)
    } catch (error) {
      throw new Error(error);
    }
  }

}