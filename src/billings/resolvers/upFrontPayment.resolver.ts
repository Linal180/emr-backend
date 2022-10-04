import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { UpFrontPayment } from '../entities/upFrontPayment.entity';
import { UpFrontPaymentType } from '../entities/upFrontPaymentType.entity';
import { Patient } from 'src/patients/entities/patient.entity';
//services
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PatientService } from 'src/patients/services/patient.service';
import { UpFrontPaymentService } from '../services/upFrontPayment.service';
//inputs
import { UpFrontPaymentInput } from '../dto/upFrontPayment-input.dto';
//payloads
import { UpFrontPaymentPayload } from '../dto/upFrontPayment-payload';

@Resolver(() => UpFrontPayment)
export class UpFrontPaymentResolver {
  constructor(
    @InjectRepository(UpFrontPaymentType)
    private upFrontPaymentTypeRepo: Repository<UpFrontPaymentType>,
    private readonly patientService: PatientService,
    private readonly upFrontPaymentService: UpFrontPaymentService,
    private readonly appointmentService: AppointmentService,
  ) { }

  //mutations

  @Mutation(() => UpFrontPaymentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createUpFrontPayment')
  async createUpFrontPayment(@Args('createUpFrontPaymentInput') createUpFrontPaymentInput: UpFrontPaymentInput): Promise<UpFrontPaymentPayload> {
    return {
      upFrontPayment: await this.upFrontPaymentService.create(createUpFrontPaymentInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  //queries

  @Query(() => UpFrontPaymentPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchUpFrontPaymentDetailsByAppointmentId')
  async fetchUpFrontPaymentDetailsByAppointmentId(@Args('appointmentId') appointmentId: string): Promise<UpFrontPaymentPayload> {
    return {
      upFrontPayment: await this.upFrontPaymentService.fetchUpFrontPaymentByAppointmentId(appointmentId),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  //resolve fields

  @ResolveField(() => [UpFrontPaymentType])
  async UpFrontPaymentTypes(@Parent() upFrontPayment: UpFrontPayment): Promise<UpFrontPaymentType[]> {
    if (upFrontPayment) {
      return await this.upFrontPaymentTypeRepo.find({
        where: {
          upFrontPaymentId: upFrontPayment.id
        }
      })
    }
  }

  @ResolveField(() => Appointment)
  async appointment(@Parent() billing: UpFrontPayment): Promise<Appointment> {
    if (billing?.appointmentId) {
      return await this.appointmentService.findOne(billing?.appointmentId)
    }
  }

  @ResolveField(() => Patient)
  async patient(@Parent() billing: UpFrontPayment): Promise<Patient> {
    if (billing?.patientId) {
      const { patient } = await this.patientService.GetPatient(billing?.patientId);
      return patient;
    }
  }
}
