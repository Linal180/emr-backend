import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities , inputs, dtos, services
import PermissionGuard from 'src/users/auth/role.guard';
import { Invoice } from 'src/payment/entity/invoice.entity';
import { AppointmentInput, LastVisitedAppointmentInput, UpComingAppointmentsInput } from '../dto/appointment-input.dto';
import { Appointment } from '../entities/appointment.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Service } from 'src/facilities/entities/services.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { AppointmentPayload, PatientPastUpcomingAppointmentPayload } from '../dto/appointment-payload.dto';
import { AppointmentService } from '../services/appointment.service';
import { InvoiceService } from 'src/payment/services/invoice.service';
import { AppointmentInsuranceStatus, AppointmentsPayload, UpcomingAppointmentsPayload } from '../dto/appointments-payload.dto';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PatientService } from 'src/patients/services/patient.service';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { CreateExternalAppointmentInput } from '../dto/create-external-appointment.input';
import {
  CancelAppointment, GetAppointment, GetAppointments, GetPatientAppointmentInput, RemoveAppointment,
  UpdateAppointmentInput, UpdateAppointmentStatusInput, UpdateAppointmentBillingStatusInput, GetAppointmentWithToken
} from '../dto/update-appointment.input';
import { AppointmentReminderInput } from '../dto/appointment-reminder-input.dto';
import { PolicyService } from 'src/insurance/services/policy.service';
import { Policy } from 'src/insurance/entities/policy.entity';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly invoiceService: InvoiceService,
    private readonly facilityService: FacilityService,
    private readonly policyService: PolicyService,
    private readonly servicesService: ServicesService) { }

  //mutations

  @Mutation(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createAppointment')
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return {
      appointment: await this.appointmentService.createAppointment(createAppointmentInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  async createExternalAppointment(@Args('createExternalAppointmentInput') createExternalAppointmentInput: CreateExternalAppointmentInput) {
    return {
      appointment: await this.appointmentService.createExternalAppointmentInput(createExternalAppointmentInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }


  @Mutation(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateAppointment')
  async updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return {
      appointment: await this.appointmentService.updateAppointment(updateAppointmentInput),
      response: { status: 200, message: 'Appointment updated successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateAppointmentBillingStatus')
  async updateAppointmentBillingStatus(@Args('updateAppointmentBillingStatusInput') updateAppointmentBillingStatusInput: UpdateAppointmentBillingStatusInput) {
    return {
      appointment: await this.appointmentService.updateAppointmentBillingStatus(updateAppointmentBillingStatusInput),
      response: { status: 200, message: 'Appointment billing status updated successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeAppointment')
  async removeAppointment(@Args('removeAppointment') removeAppointment: RemoveAppointment) {
    await this.appointmentService.removeAppointment(removeAppointment);
    return { response: { status: 200, message: 'Appointment Deleted' } };
  }

  @Mutation(() => AppointmentPayload)
  async cancelAppointment(@Args('cancelAppointment') cancelAppointment: CancelAppointment) {
    await this.appointmentService.cancelAppointment(cancelAppointment);
    return { response: { status: 200, message: 'Appointment cancelled successfully' } };
  }

  @Mutation(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateAppointmentStatus')
  async updateAppointmentStatus(@Args('appointmentStatusInput') appointmentStatusInput: UpdateAppointmentStatusInput) {
    return {
      appointment: await this.appointmentService.updateAppointmentStatus(appointmentStatusInput),
      response: { status: 200, message: 'Appointment created successfully' }
    };
  }

  @Mutation(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateAppointmentStatus')
  async sendAppointmentReminder(@Args('appointmentReminderInput') appointmentReminderInput: AppointmentReminderInput) {
    return {
      appointment: await this.appointmentService.sendAppointmentReminder(appointmentReminderInput),
      response: { status: 200, message: 'Appointment reminder sent successfully' }
    };
  }

  //queries

  @Query(() => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllAppointments')
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

  @Query(() => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllUpcomingAppointments')
  async findAllUpcomingAppointments(@Args('upComingAppointmentsInput') upComingAppointmentsInput: UpComingAppointmentsInput): Promise<UpcomingAppointmentsPayload> {
    const appointments = await this.appointmentService.findAllUpcomingAppointments(upComingAppointmentsInput)
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

  @Query(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findPatientLastAppointment')
  async findPatientLastAppointment(@Args('lastVisitedAppointmentInput') lastVisitedAppointmentInput: LastVisitedAppointmentInput): Promise<AppointmentPayload> {
    const appointment = await this.appointmentService.findPatientLastAppointment(lastVisitedAppointmentInput)
    if (appointment) {
      return {
        appointment,
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

  @Query(() => AppointmentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getAppointment')
  async getAppointment(@Args('getAppointment') getAppointment: GetAppointment): Promise<AppointmentPayload> {
    const appointment = await this.appointmentService.getAppointment(getAppointment.id)
    return {
      ...appointment,
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }


  @Query(() => AppointmentPayload)
  async getAppointmentWithToken(@Args('getAppointmentWithToken') getAppointmentWithToken: GetAppointmentWithToken): Promise<AppointmentPayload> {
    const appointment = await this.appointmentService.getAppointmentWithToken(getAppointmentWithToken)
    return {
      ...appointment,
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Query(() => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getAppointments')
  async getAppointments(@Args('getAppointments') getAppointments: GetAppointments): Promise<AppointmentsPayload> {
    return {
      appointments: await this.appointmentService.getAppointments(getAppointments),
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Query(() => AppointmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientAppointment')
  async getPatientAppointment(@Args('getPatientAppointmentInput') getPatientAppointmentInput: GetPatientAppointmentInput): Promise<AppointmentsPayload> {
    return {
      appointments: await this.appointmentService.getPatientAppointment(getPatientAppointmentInput),
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Query(() => PatientPastUpcomingAppointmentPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientPastUpcomingAppointment')
  async getPatientPastUpcomingAppointment(@Args('getPatientAppointmentInput') getPatientAppointmentInput: GetPatientAppointmentInput): Promise<PatientPastUpcomingAppointmentPayload> {
    const appointments = await this.appointmentService.getPatientPastUpcomingAppointment(getPatientAppointmentInput)
    return {
      appointments,
      response: { status: 200, message: 'Appointment fetched successfully' }
    };
  }

  @Query(() => AppointmentInsuranceStatus)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientPastUpcomingAppointment')
  async findAppointmentInsuranceStatus(@Args('appointmentId') appointmentId: string): Promise<AppointmentInsuranceStatus> {
    const appointment = await this.appointmentService.findAppointmentInsuranceStatus(appointmentId)
    return {
      ...appointment,
      response: { status: 200, message: "Appointment Insurance Status Fetched Successfully" }
    }
  }

  //resolve fields

  @ResolveField(() => [Patient])
  async patient(@Parent() appointment: Appointment): Promise<Patient> {
    if (appointment && appointment.patientId) {
      return await this.patientService.findOne(appointment.patientId);
    }
  }

  @ResolveField(() => [String])
  async primaryInsurance(@Parent() appointment: Appointment): Promise<string> {
    if (appointment && appointment.patientId) {
      const primaryInsurance = await this.policyService.getPrimaryInsurance(appointment.patientId);
      return primaryInsurance?.insurance?.payerName
    }
  }

  @ResolveField(() => [Doctor])
  async provider(@Parent() appointment: Appointment): Promise<Doctor> {
    if (appointment && appointment.providerId) {
      return await this.doctorService.findOne(appointment.providerId);
    }
  }

  @ResolveField(() => [Facility])
  async facility(@Parent() appointment: Appointment): Promise<Facility> {
    if (appointment && appointment.facilityId) {
      return await this.facilityService.findOne(appointment.facilityId);
    }
  }

  @ResolveField(() => [Service])
  async appointmentType(@Parent() appointment: Appointment): Promise<Service> {
    if (appointment && appointment.appointmentTypeId) {
      return await this.servicesService.findOne(appointment.appointmentTypeId);
    }
  }

  @ResolveField(() => [Invoice])
  async invoice(@Parent() appointment: Appointment): Promise<Invoice> {
    if (appointment) {
      return await this.invoiceService.findInvoiceByAppointmentId(appointment.id);
    }
  }

}
