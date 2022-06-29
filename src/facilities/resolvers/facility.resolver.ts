import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//user imports
import FacilityInput from '../dto/facility-input.dto';
import { Facility } from '../entities/facility.entity';
import { FacilityPayload } from '../dto/facility-payload.dto';
import { FacilityService } from '../services/facility.service';
import { Contact } from 'src/providers/entities/contact.entity';
import { PracticeService } from 'src/practice/practice.service';
import { Practice } from 'src/practice/entities/practice.entity';
import { FacilitiesPayload } from '../dto/facilities-payload.dto';
import { CreateFacilityInput } from '../dto/create-facility.input';
import { UpdateFacilityInput } from '../dto/update-facility.input';
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { ContactService } from 'src/providers/services/contact.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { GetFacility, RemoveFacility } from '../dto/update-facilityItem.input';
import { BillingAddress } from 'src/providers/entities/billing-address.entity';
import { UpdateFacilityTimeZoneInput } from '../dto/update-facilityTimeZone.input';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Resolver(() => Facility)
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService,
    private readonly contactService: ContactService,
    private readonly billingAddressService: BillingAddressService,
    private readonly practiceService: PracticeService,
    private readonly appointmentService: AppointmentService,
  ) { }

  //mutations

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createFacility')
  async createFacility(@Args('createFacilityInput') createFacilityInput: CreateFacilityInput) {
    return {
      facility: await this.facilityService.createFacility(createFacilityInput),
      response: { status: 200, message: 'Facility created successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateFacility')
  async updateFacility(@Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput) {
    return {
      facility: await this.facilityService.updateFacility(updateFacilityInput),
      response: { status: 200, message: 'Facility updated successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateFacilityTimeZone')
  async updateFacilityTimeZone(@Args('updateFacilityTimeZoneInput') updateFacilityTimeZoneInput: UpdateFacilityTimeZoneInput) {
    return {
      facility: await this.facilityService.updateFacilityTimeZone(updateFacilityTimeZoneInput),
      response: { status: 200, message: 'Facility TimeZone updated successfully' }
    };
  }

  @Mutation(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeFacility')
  async removeFacility(@Args('removeFacility') removeFacility: RemoveFacility) {
    await this.facilityService.removeFacility(removeFacility);
    return { response: { status: 200, message: 'Facility Deleted' } };
  }

  //queries fields  

  @Query(() => FacilitiesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllFacility')
  async findAllPublicFacility(@Args('facilityInput') facilityInput: FacilityInput): Promise<FacilitiesPayload> {
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

  @Query(() => FacilitiesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllFacility')
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

  @Query(() => FacilityPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getFacility')
  async getFacility(@Args('getFacility') getFacility: GetFacility): Promise<FacilityPayload> {
    const facility = await this.facilityService.GetFacility(getFacility.id)
    return {
      ...facility,
      response: { status: 200, message: 'Facility fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Contact])
  async contacts(@Parent() facility: Facility): Promise<Contact[]> {
    if (facility) {
      return await this.contactService.findContactsByFacilityId(facility.id);
    }
  }

  @ResolveField(() => [Practice])
  async practice(@Parent() facility: Facility): Promise<Practice> {
    if (facility && facility.practiceId) {
      return await this.practiceService.findOne(facility.practiceId);
    }
  }

  @ResolveField(() => [BillingAddress])
  async billingAddress(@Parent() facility: Facility): Promise<BillingAddress[]> {
    if (facility) {
      return await this.billingAddressService.findBillingAddressByFacilityId(facility.id);
    }
  }

  @ResolveField(() => [Contact])
  async appointments(@Parent() facility: Facility): Promise<Appointment[]> {
    if (facility) {
      return await this.appointmentService.getFacilityAppointments({ facilityId: facility.id });
    }
  }
  
}
