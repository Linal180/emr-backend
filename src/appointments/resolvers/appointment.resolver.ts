import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { FacilitiesPayload } from '../dto/facilities-payload.dto';
import FacilityInput from '../dto/facility-input.dto';
import { AppointmentPayload } from '../dto/appointment-payload.dto';
import { UpdateFacilityInput } from '../dto/update-facility.input';
import { GetFacility, RemoveFacility } from '../dto/update-facilityItem.input';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentService } from '../services/appointment.service';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return {
      appointment: await this.appointmentService.createAppointment(createAppointmentInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }

  // @Mutation(() => FacilityPayload)
  // @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  // async updateAppointment(@Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput) {
  //   return {
  //     facility: await this.appointmentService.updateFacility(updateFacilityInput),
  //     response: { status: 200, message: 'Facility updated successfully' }
  //   };
  // }

  // @Query(returns => FacilitiesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin'])
  // async findAllAppointments(@Args('facilityInput') facilityInput: FacilityInput): Promise<FacilitiesPayload> {
  //   const facilities = await this.appointmentService.findAllFacilities(facilityInput)
  //   if (facilities) {
  //     return {
  //       ...facilities,
  //       response: {
  //         message: "OK", status: 200,
  //       }
  //     }
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'Facility not found',
  //   });
  // }

  // @Query(returns => FacilityPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  // async getAppointment(@Args('getFacility') getFacility: GetFacility): Promise<FacilityPayload> {
  //   const facilitity = await this.appointmentService.GetFacility(getFacility.id)
  //   return {
  //     ...facilitity,
  //     response: { status: 200, message: 'Facility fetched successfully' }
  //   };
  // }

  // @Mutation(() => FacilityPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin'])
  // async removeAppointment(@Args('removeFacility') removeFacility: RemoveFacility) {
  //   await this.appointmentService.removeFacility(removeFacility);
  //   return { response: { status: 200, message: 'Facility Deleted' } };
  // }
}
