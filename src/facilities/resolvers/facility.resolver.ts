import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreateFacilityInput } from '../dto/create-facility.input';
import { FacilitiesPayload } from '../dto/facilities-payload.dto';
import FacilityInput from '../dto/facility-input.dto';
import { FacilityPayload } from '../dto/facility-payload.dto';
import { UpdateFacilityInput } from '../dto/update-facility.input';
import { GetFacility, RemoveFacility } from '../dto/update-facilityItem.input';
import { UpdateFacilityTimeZoneInput } from '../dto/update-facilityTimeZone.input';
import { Facility } from '../entities/facility.entity';
import { FacilityService } from '../services/facility.service';

@Resolver(() => Facility)
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) { }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin'])
  async createFacility(@Args('createFacilityInput') createFacilityInput: CreateFacilityInput) {
    return {
      facility: await this.facilityService.createFacility(createFacilityInput),
      response: { status: 200, message: 'Facility created successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateFacility(@Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput) {
    return {
      facility: await this.facilityService.updateFacility(updateFacilityInput),
      response: { status: 200, message: 'Facility updated successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateFacilityTimeZone(@Args('updateFacilityTimeZoneInput') updateFacilityTimeZoneInput: UpdateFacilityTimeZoneInput) {
    return {
      facility: await this.facilityService.updateFacilityTimeZone(updateFacilityTimeZoneInput),
      response: { status: 200, message: 'Facility TimeZone updated successfully' }
    };
  }

  @Query(returns => FacilitiesPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async findAllFacility(@Args('facilityInput') facilityInput: FacilityInput): Promise<FacilitiesPayload> {
    const facilities = await this.facilityService.findAllFacilities(facilityInput)
    if (facilities) {
      return {
        ...facilities,
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

  @Query(returns => FacilityPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async getFacility(@Args('getFacility') getFacility: GetFacility): Promise<FacilityPayload> {
    const facility = await this.facilityService.GetFacility(getFacility.id)
    return {
      ...facility,
      response: { status: 200, message: 'Facility fetched successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin','admin'])
  async removeFacility(@Args('removeFacility') removeFacility: RemoveFacility) {
    await this.facilityService.removeFacility(removeFacility);
    return { response: { status: 200, message: 'Facility Deleted' } };
  }
}
