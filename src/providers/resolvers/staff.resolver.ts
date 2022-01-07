import { ConflictException, HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
import { CreateStaffInput } from '../dto/create-staff.input';
import StaffInput from '../dto/staff-input.dto';
import { StaffPayload } from '../dto/staff-payload.dto';
import { DisableStaff, GetStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';
import { StaffService } from '../services/staff.service';

@Resolver('staff')
export class StaffResolver {
  constructor(private readonly staffService: StaffService) { }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    const username = await this.staffService.findOnebyUsername(createStaffInput.username.trim().toLowerCase())
    if (username) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'this username is already taken',
      });
    }
    return {
      staff: await this.staffService.createStaff(createStaffInput),
      response: { status: 200, message: 'Staff created successfully' }
    };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return {
      staff: await this.staffService.updateStaff(updateStaffInput),
      response: { status: 200, message: 'Staff updated successfully' }
    };
  }

  @Query(returns => AllStaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async findAllStaff(@Args('staffInput') staffInput: StaffInput): Promise<AllStaffPayload> {
    const allstaff = await this.staffService.findAllStaff(staffInput)
    if (allstaff) {
      return {
        ...allstaff,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Facilit not found',
    });
  }

  @Query(returns => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin', 'admin'])
  async getStaff(@Args('getStaff') getStaff: GetStaff): Promise<StaffPayload> {
    return {
      staff: await this.staffService.findOne(getStaff.id),
      response: { status: 200, message: 'Staff fetched successfully' }
    };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async removeStaff(@Args('removeStaff') removeStaff: RemoveStaff) {
    await this.staffService.removeStaff(removeStaff);
    return { response: { status: 200, message: 'Staff Deleted' } };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async disableStaff(@Args('disableStaff') disableStaff: DisableStaff) {
    await this.staffService.disableStaff(disableStaff);
    return { response: { status: 200, message: 'Staff Disabled' } };
  }
}
