import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { AppointmentStatus, BillingStatus } from '../entities/appointment.entity';
import { CreateAppointmentInput } from './create-appointment.input';

@InputType()
export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  paymentStatus?: string;

  @Field({ nullable: true })
  selfCheckIn?: boolean;

  @Field({ nullable: true })
  checkedInAt?: string;

  @Field(() => AppointmentStatus, { nullable: true })
  status?: AppointmentStatus

  @Field({ nullable: true })
  checkInActiveStep?: string;

  @Field({ nullable: true })
  checkedOutAt?: string;
}

@InputType()
export class UpdateAppointmentStatusInput {
  @Field()
  id: string;

  @Field(() => AppointmentStatus, { nullable: false })
  status: AppointmentStatus
}

@InputType()
export class UpdateAppointmentBillingStatusInput {
  @Field()
  id: string;

  @Field({ nullable: false })
  billingStatus: BillingStatus
}


@InputType()
export class GetAppointment extends PickType(UpdateAppointmentInput, ['id'] as const) { }

@InputType()
export class GetAppointments {
  @Field({ nullable: true })
  doctorId: string

  @Field({ nullable: true })
  facilityId: string
}

@InputType()
export class GetPatientAppointmentInput {
  @Field()
  patientId: string
}

@InputType()
export class GetFacilityAppointmentsInput {
  @Field()
  facilityId: string
}

@InputType()
export class RemoveAppointment extends PickType(UpdateAppointmentInput, ['id'] as const) { }

@InputType()
export class CancelAppointment {
  @Field()
  token: string

  @Field()
  reason: string
}
