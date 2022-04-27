import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import RoleInput, { RemoveRole, RoleItemInput, UpdateRoleItemInput } from '../dto/role-input.dto';
import RolesPayload, { RolePayload } from '../dto/roles-payload.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates role
   * @param roleItemInput 
   * @returns role 
   */
  async createRole(roleItemInput: RoleItemInput): Promise<Role> {
    try {
      //check name of role for existing one
      const role = await this.roleRepository.findOne({role: roleItemInput.role.trim().toLowerCase()})
      if(role){
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'Role already exists with this name',
        });
      }
      // creating role
      const roleInstance = this.roleRepository.create({...roleItemInput, role: roleItemInput.role.trim().toLowerCase()})
      //saving role
      return await this.roleRepository.save(roleInstance);
      return 
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates role
   * @param updateRoleItemInput 
   * @returns role 
   */
  async updateRole(updateRoleItemInput: UpdateRoleItemInput): Promise<Role> {
    try {
       //check name of role for existing one
     const role = await this.roleRepository.findOne({role: updateRoleItemInput.role.trim().toLowerCase()})
     if(role && role.id !=updateRoleItemInput.id){
       throw new ForbiddenException({
         status: HttpStatus.FORBIDDEN,
         error: 'Role already exists with this name',
       });
     }
      return await this.utilsService.updateEntityManager(Role, updateRoleItemInput.id, updateRoleItemInput, this.roleRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all role
   * @param roleInput 
   * @returns all role 
   */
  async findAllRole(roleInput: RoleInput): Promise<RolesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Role>(this.roleRepository, {...roleInput, role: 'super-admin'})
      return {
        pagination: {
          ...paginationResponse
        },
        roles: paginationResponse.data,
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
  async findOne(id: string): Promise<Role> {
    return await this.roleRepository.findOne(id);
  }

  /**
   * Gets role
   * @param id 
   * @returns service 
   */
  async getRole(id: string): Promise<RolePayload> {
    const role = await this.findOne(id);
    if (role) {
      return { role }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Role not found',
    });
  }

  /**
   * Removes role
   * @param { id } 
   */
  async removeRole({ id }: RemoveRole) {
    try {
      await this.roleRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findRolesByUserId() {
    try {
     return await this.roleRepository.find({relations:['users']})
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
