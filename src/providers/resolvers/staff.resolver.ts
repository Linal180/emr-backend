import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//services
import { StaffService } from '../services/staff.service';
import { UsersService } from 'src/users/services/users.service';
import { PracticeService } from 'src/practice/practice.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
//entities
import { Staff } from '../entities/staff.entity';
import { User } from 'src/users/entities/user.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//payloads
import { StaffPayload } from '../dto/staff-payload.dto';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
// input
import StaffInput from '../dto/staff-input.dto';
import { CreateStaffInput } from '../dto/create-staff.input';
import { DisableStaff, GetStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(
    private readonly staffService: StaffService,
    private readonly usersService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly practiceService: PracticeService,
    private readonly attachmentsService: AttachmentsService,
  ) { }

  //mutations

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createStaff')
  async createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return {
      staff: await this.staffService.createStaff(createStaffInput),
      response: { status: 200, message: 'Staff created successfully' }
    };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateStaff')
  async updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return {
      staff: await this.staffService.updateStaff(updateStaffInput),
      response: { status: 200, message: 'Staff updated successfully' }
    };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeStaff')
  async removeStaff(@Args('removeStaff') removeStaff: RemoveStaff) {
    await this.staffService.removeStaff(removeStaff);
    return { response: { status: 200, message: 'Staff Deleted' } };
  }

  @Mutation(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'disableStaff')
  async disableStaff(@Args('disableStaff') disableStaff: DisableStaff) {
    await this.staffService.disableStaff(disableStaff);
    return { response: { status: 200, message: 'Staff Disabled' } };
  }

  // queries

  @Query(() => AllStaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllStaff')
  async findAllStaff(@Args('staffInput') staffInput: StaffInput): Promise<AllStaffPayload> {
    const staffs = await this.staffService.findAllStaff(staffInput)
    if (staffs) {
      return {
        ...staffs,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Facility not found',
    });
  }

  @Query(() => StaffPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getStaff')
  async getStaff(@Args('getStaff') getStaff: GetStaff): Promise<StaffPayload> {
    return {
      staff: await this.staffService.getStaff(getStaff.id),
      response: { status: 200, message: 'Staff fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Attachment])
  async attachments(@Parent() staff: Staff): Promise<Attachment[]> {
    if (staff) {
      return await this.attachmentsService.findAttachments(staff.id, AttachmentType.STAFF);
    }
  }

  @ResolveField(() => User)
  async user(@Parent() staff: Staff): Promise<User> {
    if (staff) {
      return await this.usersService.findUserByUserId(staff?.id);
    }
  }

  @ResolveField(() => Facility)
  async facility(@Parent() staff: Staff): Promise<Facility> {
    if (staff?.facilityId) {
      return await this.facilityService.findOne(staff?.facilityId);
    }
  }

  @ResolveField(() => Practice)
  async practice(@Parent() staff: Staff): Promise<Practice> {
    if (staff?.practiceId) {
      return await this.practiceService.findOne(staff?.practiceId);
    }
  }
}
