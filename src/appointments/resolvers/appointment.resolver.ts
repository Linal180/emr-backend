import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import AppointmentInput from '../dto/appointment-input.dto';
import { AppointmentPayload } from '../dto/appointment-payload.dto';
import { AppointmentsPayload } from '../dto/appointments-payload.dto';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { CreateExternalAppointmentInput } from '../dto/create-external-appointment.input';
import { CancelAppointment, GetAppointment, GetDoctorAppointment, RemoveAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentService } from '../services/appointment.service';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly facilityService: FacilityService,
    private readonly servicesService: ServicesService) { }

  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return {
      appointment: await this.appointmentService.createAppointment(createAppointmentInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createExternalAppointment(@Args('createExternalAppointmentInput') createExternalAppointmentInput: CreateExternalAppointmentInput) {
    return {
      appointment: await this.appointmentService.createExternalAppointmentInput(createExternalAppointmentInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }

  
  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return {
      appointment: await this.appointmentService.updateAppointment(updateAppointmentInput),
      response: { status: 200, message: 'Appointment updated successfully' }
    };
  }

  @Query(returns => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin'])
  async findAllAppointments(@Args('appointmentInput') appointmentInput: AppointmentInput): Promise<AppointmentsPayload> {
    const appointments = await this.appointmentService.findAllAppointments(appointmentInput)
    if (appointments) {
      return {
        ...appointments,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointments not found',
    });
  }

  @ResolveField((returns) => [Patient])
  async patient(@Parent() appointment: Appointment):  Promise<Patient>  {
    if (appointment) {
      return await this.patientService.findOne(appointment.patientId);
    }
  }

  @ResolveField((returns) => [Doctor])
  async provider(@Parent() appointment: Appointment): Promise<Doctor> {
    if (appointment) {
     return await this.doctorService.findOne(appointment.providerId);
    }
  }

  @ResolveField((returns) => [Facility])
  async facility(@Parent() appointment: Appointment): Promise<Facility> {
    if (appointment) {
     return await this.facilityService.findOne(appointment.facilityId);
    }
  }

  @ResolveField((returns) => [Service])
  async appointmentType(@Parent() appointment: Appointment): Promise<Service> {
    if (appointment) {
     return await this.servicesService.findOne(appointment.appointmentTypeId);
    }
  }

  @Query(returns => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  async getAppointment(@Args('getAppointment') getAppointment: GetAppointment): Promise<AppointmentPayload> {
    const appointment = await this.appointmentService.getAppointment(getAppointment.id)
    return {
      ...appointment,
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Query(returns => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async getDoctorAppointment(@Args('getDoctorAppointment') getDoctorAppointment: GetDoctorAppointment): Promise<AppointmentsPayload> {
    return {
      appointments: await this.appointmentService.getDoctorAppointment(getDoctorAppointment),
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin','admin'])
  async removeAppointment(@Args('removeAppointment') removeAppointment: RemoveAppointment) {
    await this.appointmentService.removeAppointment(removeAppointment);
    return { response: { status: 200, message: 'Appointment Deleted' } };
  }

  @Mutation(() => AppointmentPayload)
  async cancelAppointment(@Args('cancelAppointment') cancelAppointment: CancelAppointment) {
    await this.appointmentService.cancelAppointment(cancelAppointment);
    return { response: { status: 200, message: 'Appointment cancelled successfully' } };
  }
}
